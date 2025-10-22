# Guía de Endpoints - Términos (Term)

Esta guía documenta todos los endpoints relacionados con los términos ("term"). Está basada en una lectura del código fuente del proyecto:
- `Controllers/TermController.cs` (rutas y respuestas)
- `Services/Term/TermService.cs` (reglas de negocio, moderación y permisos)
- DTOs en `Services/Term/Dtos` (`CreateTermDto`, `UpdateTermDto`, `UpdateOwnTermDto`, `TermDto`, `TermQueryDto`, `PagedResultDto`)

Resumen rápido de comportamiento observado:
- Los endpoints públicos permiten listar, paginar, obtener por id y obtener categorías.
- Las operaciones de creación/actualización/borrado requieren autenticación (`[Authorize]`).
- Solo el autor del término o un usuario con rol `admin` o `moderator` puede actualizar o borrar un término; campos de moderación solo pueden cambiarlos `admin`/`moderator`.
- Antes de crear o actualizar (por el autor) se ejecuta un servicio de moderación que puede: aprobar, pedir revisión humana o rechazar. Un rechazo automático da como resultado un error (400) con mensaje.

---

## Convenciones y notas útiles
- Base URL (ejemplo local): `http://localhost:7218` (ajusta según entorno)
- Axios debe configurarse con `withCredentials: true` para enviar cookies (refresh token). También es necesario enviar el header `X-CSRF-TOKEN` en endpoints mutantes si el backend usa double-submit CSRF.
- Esquemas de DTOs (validaciones extraídas del código):
  - `CreateTermDto`: Name (required, max 200), Definition (required, max 2000), Category (required, max 100), Example (required, max 1000), ImageId (opt, max 255), AudioId (opt, max 255)
  - `UpdateTermDto`: igual que Create + ModerationNotes (opt, max 1000), IsApproved (opt bool), ApprovedBy (opt bool), ApprovedAt (opt DateTime), RejectionReason (opt)
  - `UpdateOwnTermDto`: igual a CreateTermDto (sin campos de moderación)
  - `TermQueryDto` (para paged): Page (default 1), PageSize (default 20, max 100), Category, Search, OrderBy, OrderDirection, IsApproved, AuthorId

---

## Endpoints

Nota: todas las rutas van prefijadas con `/api/term`

### 1) GET /api/term
- Descripción: Obtiene una lista simple de términos (ordenados por creación desc). Soporta filtros por `category`, y paginación simplificada mediante `skip` y `take`.
- Query params:
  - `category` (opcional)
  - `skip` (int, opcional, default 0)
  - `take` (int, opcional, default 50)
- Autenticación: No requerida
- Response 200: `IEnumerable<TermDto>` (lista de términos)

Ejemplo con axios:

```javascript
// apiClient debe tener withCredentials: true
const res = await apiClient.get('/api/term', { params: { category: 'biology', skip: 0, take: 20 } });
console.log(res.data); // arreglo de TermDto
```

---

### 2) GET /api/term/paged
- Descripción: Obtiene términos paginados y filtrados usando `TermQueryDto`.
- Query params (ejemplo):
  - `page` (int, 1-based)
  - `pageSize` (int, máximo 100)
  - `category` (string)
  - `search` (string)
  - `orderBy` (Name, CreatedAt, UpdatedAt, Category)
  - `orderDirection` (asc|desc)
  - `isApproved` (true|false)
  - `authorId` (guid)
- Autenticación: No requerida
- Response 200: `PagedResultDto<TermDto>` con `Items`, `TotalCount`, `Page`, `PageSize`, etc.

Ejemplo:

```javascript
const res = await apiClient.get('/api/term/paged', {
  params: {
    page: 1,
    pageSize: 20,
    search: 'photosynthesis',
    orderBy: 'Name',
    orderDirection: 'asc'
  }
});
console.log(res.data.items, res.data.totalCount);
```

---

### 3) GET /api/term/categories
- Descripción: Devuelve la lista de categorías únicas (strings)
- Autenticación: No requerida
- Response 200: `IEnumerable<string>` (lista de categorías)

Ejemplo:

```javascript
const res = await apiClient.get('/api/term/categories');
console.log(res.data); // ['biology', 'math', ...]
```

---

### 4) GET /api/term/{id}
- Descripción: Obtiene un término por su `id` (GUID)
- Parámetros: `id` en la ruta (GUID)
- Autenticación: No requerida
- Responses:
  - 200: `TermDto`
  - 404: Not Found (si no existe)

Ejemplo:

```javascript
const res = await apiClient.get(`/api/term/${termId}`);
if (res.status === 200) console.log(res.data);
```

---

### 5) POST /api/term
- Descripción: Crea un nuevo término.
- Autenticación: Requerida (`[Authorize]`) — el usuario autenticado será el `AuthorId`.
- Body: `CreateTermDto` (JSON)
- Validación: Si ModelState inválido -> 400
- Moderación: Antes de crear se llama al servicio de moderación. Resultados:
  - Si `IsApproved`: el término queda aprobado automáticamente
  - Si `RequiresHumanReview`: el término se guarda como no aprobado y con `RejectionReason = 'Pending human review'`
  - Si rechazado automáticamente (no aprobado y no requiere revisión): lanza `InvalidOperationException` -> controlador atrapa y devuelve 400 con mensaje
- Responses:
  - 200: `TermDto` (creado)
  - 400: Error de validación o moderación
  - 401: Si no autenticado

Ejemplo (axios):

```javascript
const payload = {
  name: 'Photosynthesis',
  definition: 'Proceso mediante el cual las plantas... (max 2000 chars)',
  category: 'biology',
  example: 'Las plantas usan la fotosíntesis para... (max 1000 chars)',
  imageId: null,
  audioId: null
};

const res = await apiClient.post('/api/term', payload, {
  headers: {
    // Si el backend requiere CSRF header, envía X-CSRF-TOKEN con el valor de la cookie XSRF-TOKEN
    'X-CSRF-TOKEN': getCsrfToken() // función en frontend para leer cookie XSRF-TOKEN
  }
});
console.log(res.data); // TermDto
```

Notas: El servicio de moderación puede devolver `RequiresHumanReview`. En ese caso, el término será creado pero marcado como no aprobado y con notas de moderación.

---

### 6) PUT /api/term/{id}
- Descripción: Actualiza un término (campos y, si el usuario es `admin/moderator`, también campos de moderación).
- Autenticación: Requerida
- Permisos:
  - El autor puede actualizar (pero NO puede cambiar campos de moderación como `IsApproved`, `ApprovedBy`, `ApprovedAt`, `RejectionReason`).
  - `admin` o `moderator` pueden actualizar cualquier campo.
- Ruta: `{id}` GUID
- Body: `UpdateTermDto` (JSON)
- Responses:
  - 200: `TermDto` actualizado
  - 400: ModelState inválido o error
  - 401: No autenticado
  - 403: Authenticated but not authorized (Forbid)
  - 404: Not Found

Ejemplo (admin/moderator modificando moderación):

```javascript
const payload = {
  name: 'Photosynthesis',
  definition: 'Updated definition...',
  category: 'biology',
  example: 'Updated example',
  imageId: null,
  audioId: null,
  moderationNotes: 'Checked by moderator',
  isApproved: true,
  approvedBy: true,
  approvedAt: new Date().toISOString()
};

const res = await apiClient.put(`/api/term/${termId}`, payload, {
  headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Authorization': `Bearer ${accessToken}` }
});
console.log(res.data);
```

Ejemplo (autor intentando cambiar moderación): => devolverá 403 si intenta cambiar campos de moderación.

---

### 7) PUT /api/term/my/{id}
- Descripción: Endpoint pensado para que el autor actual actualice su propio término. Se aplica moderación automática al contenido actualizado: si es rechazado automáticamente, se devuelve 400; si requiere revisión humana, el término se marca como no aprobado y con `RejectionReason`.
- Autenticación: Requerida (debe ser el autor)
- Body: `UpdateOwnTermDto` (misma forma que `CreateTermDto`)
- Responses:
  - 200: `TermDto` actualizado
  - 400: ModelState inválido o moderación lo rechazó automáticamente (mensaje explicativo)
  - 401: No autenticado
  - 403: Forbid si no es el autor
  - 404: Not Found

Ejemplo:

```javascript
const payload = {
  name: 'Updated term name',
  definition: 'New definition...',
  category: 'biology',
  example: 'Updated example',
  imageId: null,
  audioId: null
};

const res = await apiClient.put(`/api/term/my/${termId}`, payload, { headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Authorization': `Bearer ${accessToken}` } });
```

---

### 8) DELETE /api/term/{id}
- Descripción: Elimina un término.
- Autenticación: Requerida
- Permisos: Solo el autor o `admin`/`moderator` pueden eliminar.
- Responses:
  - 200: OK
  - 401: No autenticado
  - 403: Authenticated but not authorized
  - 400: Error genérico

Ejemplo:

```javascript
await apiClient.delete(`/api/term/${termId}`, { headers: { 'X-CSRF-TOKEN': getCsrfToken(), 'Authorization': `Bearer ${accessToken}` } });
```

---

## Formatos de respuesta principales

### TermDto
```json
{
  "id": "guid",
  "name": "string",
  "definition": "string",
  "category": "string",
  "example": "string",
  "authorId": "guid",
  "isApproved": true,
  "approvedBy": false,
  "approvedAt": null,
  "rejectionReason": null,
  "imageId": null,
  "image": null,
  "audioId": null,
  "moderationNotes": "string",
  "createdAt": "2025-10-17T...Z",
  "updatedAt": "2025-10-17T...Z"
}
```

### PagedResultDto<TermDto>
```json
{
  "items": [ /* TermDto[] */ ],
  "totalCount": 123,
  "page": 1,
  "pageSize": 20,
  "totalPages": 7,
  "hasPreviousPage": false,
  "hasNextPage": true
}
```

---

## Errores comunes y cómo diagnosticarlos
- 400 Bad Request: Model validation (revisa longitudes y campos requeridos) o moderación rechazó el contenido. El cuerpo suele incluir `{ message: "Error creating term" }` o el mensaje de moderación.
- 401 Unauthorized: No estás autenticado. Asegúrate de enviar `Authorization` (Bearer) para endpoints que lo requieren y de tener `withCredentials: true` para cookies si el backend usa cookies para refresh tokens.
- 403 Forbidden: No tienes permisos para realizar la acción (ej.: intentar editar un término que no es tuyo o cambiar campos de moderación siendo un autor normal).
- 404 Not Found: El `id` del término no existe.

---

## Recomendaciones para el frontend
1. Configurar un `apiClient` con `withCredentials: true` y un interceptor que añada `Authorization: Bearer {accessToken}` y `X-CSRF-TOKEN` cuando corresponda.
2. Antes de enviar `Create` o `UpdateOwn`, validar localmente las longitudes máximas para evitar 400 por validación.
3. Mostrar al usuario el resultado de la moderación: si `RequiresHumanReview`, indicar que el contenido quedó pendiente de revisión; si fue rechazado, mostrar el `message` retornado.
4. Para administración, usar `PUT /api/term/{id}` con campos de moderación para aprobar/rechazar.
5. En procesos que podrían fallar por moderación, mostrar mensajes amigables y permitir edición.

---

## Ejemplo rápido de `apiClient` (recordatorio)

```javascript
import axios from 'axios';
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7218',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});
export default apiClient;

// getCsrfToken: leer cookie XSRF-TOKEN para enviarla en headers
```

---

## Ejemplos con curl

A continuación se añaden ejemplos `curl` para cada endpoint documentado. Estos son ejemplos útiles para probar rápidamente desde la terminal; recuerda adaptar `BASE_URL`, `ACCESS_TOKEN` y `XSRF_TOKEN` según tu entorno.

Variables de ejemplo (reemplaza según tu entorno):
- BASE_URL: `http://localhost:7218`
- ACCESS_TOKEN: `eyJ...` (si es necesario)
- XSRF_TOKEN: valor de la cookie `XSRF-TOKEN` (para peticiones mutantes)

1) GET /api/term (lista)

curl -X GET "${BASE_URL}/api/term?category=biology&skip=0&take=20" -H "Accept: application/json"

2) GET /api/term/paged

curl -G "${BASE_URL}/api/term/paged" --data-urlencode "page=1" --data-urlencode "pageSize=20" --data-urlencode "search=photosynthesis" -H "Accept: application/json"

3) GET /api/term/categories

curl -X GET "${BASE_URL}/api/term/categories" -H "Accept: application/json"

4) GET /api/term/{id}

curl -X GET "${BASE_URL}/api/term/<TERM_ID>" -H "Accept: application/json"

5) POST /api/term (crear, requiere autenticación)

curl -X POST "${BASE_URL}/api/term" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-CSRF-TOKEN: ${XSRF_TOKEN}" \
  -d '{"name":"Photosynthesis","definition":"Def...","category":"biology","example":"Ex...","imageId":null,"audioId":null}'

6) PUT /api/term/{id} (actualizar, requiere autenticación)

curl -X PUT "${BASE_URL}/api/term/<TERM_ID>" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-CSRF-TOKEN: ${XSRF_TOKEN}" \
  -d '{"name":"Updated","definition":"Updated","category":"biology","example":"Updated","imageId":null,"audioId":null}'

7) PUT /api/term/my/{id} (autor actual actualiza su término)

curl -X PUT "${BASE_URL}/api/term/my/<TERM_ID>" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-CSRF-TOKEN: ${XSRF_TOKEN}" \
  -d '{"name":"Updated by owner","definition":"...","category":"biology","example":"...","imageId":null,"audioId":null}'

8) DELETE /api/term/{id}

curl -X DELETE "${BASE_URL}/api/term/<TERM_ID>" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "X-CSRF-TOKEN: ${XSRF_TOKEN}"

---

He añadido estos ejemplos al final de `TERM_ENDPOINTS_GUIDE.md`.

# 📋 Guía de Implementación - Página de Perfil

## 🎯 Resumen de Implementación

Se ha creado una página de perfil completamente modularizada siguiendo arquitectura de features y mejores prácticas de UX/UI.

### ✅ Características Implementadas

- **Autenticación requerida**: Redirección automática a `/auth/sign-in` si no está autenticado
- **Carga de datos**: Integración con `authStore` y endpoint `GET /api/auth/me`
- **Componentes modulares**: Separación en componentes reutilizables y escalables
- **Estados visuales**: Loading skeleton, error handling, estados de carga
- **Diseño responsivo**: Mobile-first, adapta a todos los tamaños de pantalla
- **Dark mode**: Tema oscuro completamente soportado
- **Estilos profesionales**: Usando shadcn/ui + Tailwind CSS 4

## 📁 Estructura Creada

```
app/features/profile/
├── hooks/
│   ├── useProfile.ts       # Hook personalizado para gestionar datos del perfil
│   └── index.ts            # Exporta useProfile
├── components/
│   ├── ProfileHeader.tsx        # Avatar + Nombre + Username + Badges
│   ├── ProfileContactInfo.tsx   # Email + Username + Fecha de registro
│   ├── ProfileActions.tsx       # Botones de Refresh, Edit, Logout
│   ├── ProfileStates.tsx        # Loading skeleton, loader, error
│   └── index.ts                 # Exporta todos los componentes
└── README.md                     # Documentación del módulo
```

## 🏗️ Componentes Principales

### 1. **ProfileHeader** 
Encabezado visual del perfil con:
- Avatar circular (imagen del usuario o icono por defecto)
- Nombre completo
- Username
- Badges (estado de email, member status)

### 2. **ProfileContactInfo**
Información de contacto estructurada:
- Email con icono
- Username con icono
- Fecha de registro con icono
- Diseño en cards con colores diferenciados

### 3. **ProfileActions**
Botones de interacción:
- 🔄 **Refresh Profile**: Recarga los datos desde el servidor
- ✏️ **Edit Profile**: Botón para edición futura
- 🚪 **Sign Out**: Cierra sesión y redirige a sign-in

### 4. **ProfileStates**
Estados visuales:
- `ProfileLoadingSkeleton`: Animación de carga tipo skeleton
- `ProfileLoading`: Loader con spinner
- `ProfileError`: Card de error con mensaje

## 🪝 Hook: useProfile

Hook personalizado que maneja toda la lógica del perfil:

```typescript
const { profileData, isLoading, error, refetchProfileData } = useProfile();
```

**Funcionalidades:**
- Obtiene datos de `authStore` (user info)
- Llama a `getUserData()` para sincronizar con backend
- Maneja estados de carga y errores
- Proporciona método para refrescar datos

## 🔌 Integración con Auth Store

Se agregó `getUserData` al hook `useAuth` para:
- Sincronización de datos desde `/api/auth/me`
- Manejo centralizado de autenticación
- Reutilización en otros componentes si es necesario

### Cambio en `useAuthStore`:
```typescript
// Ahora exporta getUserData
export function useAuth() {
  const { 
    // ... otros métodos
    getUserData 
  } = useAuthStore();
  
  return {
    // ... otros retornos
    getUserData
  };
}
```

## 🎨 Estilos y Diseño

### Paleta de Colores
- **Primary**: Azul (blue-600)
- **Secondary**: Púrpura (purple-600)
- **Success**: Verde (green-600)
- **Warning**: Amarillo (yellow-600)
- **Error**: Rojo (red-600)

### Componentes UI Utilizados
- `Card`: Contenedores principales
- `Button`: Botones con variantes (default, outline, destructive)
- `Badge`: Badges para estados
- `Icons` (lucide-react): Iconografía coherente

## 🔐 Seguridad

✅ **Protección de ruta**: Solo usuarios autenticados pueden ver la página
✅ **Redirección automática**: Si pierde autenticación, redirige a login
✅ **Tokens CSRF**: Integración con sistema de CSRF del backend
✅ **Credenciales**: Uso correcto de cookies HttpOnly

## 📱 Responsividad

- **Mobile** (< 640px): Stack vertical, padding reducido
- **Tablet** (640px - 1024px): Layout flexible
- **Desktop** (> 1024px): Layout optimizado con max-width: 2xl

## 🚀 Cómo Usar

### Acceder a la página
```
http://localhost:5173/profile
```

### Si no está autenticado
Será redirigido automáticamente a:
```
http://localhost:5173/auth/sign-in
```

### Estructura en el componente
```tsx
import { useProfile } from "~/features/profile/hooks";
import { ProfileHeader } from "~/features/profile/components";

function MyComponent() {
  const { profileData, isLoading, error } = useProfile();
  
  return (
    {profileData && <ProfileHeader profileData={profileData} />}
  );
}
```

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────┐
│  useProfile Hook                        │
├─────────────────────────────────────────┤
│  1. Obtiene user de authStore           │
│  2. Llama getUserData() en mount        │
│  3. Maneja loading y errores            │
│  4. Proporciona refetch method          │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Profile.tsx (Página)                   │
├─────────────────────────────────────────┤
│  1. Valida autenticación                │
│  2. Renderiza según estado              │
│  3. Compone componentes                 │
│  4. Maneja logout                       │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  Componentes (ProfileHeader, etc)       │
├─────────────────────────────────────────┤
│  Reciben datos y los presentan          │
│  Estilo y disposición visual            │
└─────────────────────────────────────────┘
```

## 📊 Estados de la Página

### 1️⃣ **Loading**
```
┌─────────────────────────────┐
│  Skeleton animado           │
│  (Placeholder de avatar)    │
│  (Líneas de placeholder)    │
└─────────────────────────────┘
```

### 2️⃣ **Success**
```
┌─────────────────────────────┐
│  [Avatar] John Doe          │
│           @johndoe          │
│  Email: john@example.com    │
│  Username: @johndoe         │
│  Member since: Oct 17, 2025 │
│  [Refresh] [Edit] [Logout]  │
└─────────────────────────────┘
```

### 3️⃣ **Error**
```
┌─────────────────────────────┐
│  ⚠️ Error loading profile   │
│  [Mensaje de error]         │
└─────────────────────────────┘
```

### 4️⃣ **No Autenticado**
```
Redirige automáticamente a /auth/sign-in
```

## 🔮 Extensiones Futuras

- 📝 **Edit Profile Form**: Formulario para editar datos
- 🔐 **Change Password**: Cambio de contraseña
- ⚙️ **Settings**: Ajustes de privacidad
- 📈 **Statistics**: Estadísticas del usuario
- 🗂️ **Historial**: Historial de actividad

## ✨ Mejores Prácticas Implementadas

✅ **Single Responsibility**: Cada componente tiene una única responsabilidad
✅ **Composition**: Componentes se componen sin acoplamiento
✅ **Type Safety**: TypeScript con tipos exportados
✅ **Error Handling**: Manejo robusto de errores
✅ **Loading States**: Estados visuales claros
✅ **Accessibility**: Semántica HTML correcta
✅ **Performance**: Code splitting automático
✅ **Dark Mode**: Soporte completo
✅ **Responsive**: Mobile-first design
✅ **Modularization**: Fácil de mantener y escalar

## 🐛 Debugging

Para debugging durante desarrollo:

```typescript
// En useProfile.ts o ProfileHeader.tsx
console.log("Profile Data:", profileData);
console.log("Is Loading:", isLoading);
console.log("Error:", error);
```

## 📦 Dependencias Usadas

- **react**: Framework
- **react-router**: Routing y navegación
- **zustand**: State management (authStore)
- **lucide-react**: Iconografía
- **tailwind-css**: Estilos
- **shadcn/ui**: Componentes base

Todas las dependencias ya están instaladas en `package.json`.

---

**Última actualización**: October 17, 2025

# Profile Feature

Módulo modularizado para gestionar la visualización del perfil del usuario.

## Estructura

```
features/profile/
├── hooks/
│   ├── index.ts              # Exporta useProfile
│   └── useProfile.ts         # Hook principal que gestiona los datos del perfil
├── components/
│   ├── index.ts              # Exporta todos los componentes
│   ├── ProfileHeader.tsx      # Encabezado con avatar y datos básicos
│   ├── ProfileContactInfo.tsx # Información de contacto y detalles
│   ├── ProfileActions.tsx     # Botones de acciones (refresh, edit, logout)
│   └── ProfileStates.tsx      # Estados de carga, error y esqueleto
└── README.md                  # Este archivo
```

## Componentes

### ProfileHeader
Muestra el encabezado del perfil con:
- Avatar del usuario (o icono por defecto)
- Nombre completo
- Username
- Badges (email confirmado/no confirmado, member status)

**Props:**
```typescript
interface ProfileHeaderProps {
  profileData: ProfileData;
  isLoading?: boolean;
}
```

### ProfileContactInfo
Muestra la información de contacto:
- Email
- Username
- Fecha de registro

**Props:**
```typescript
interface ProfileContactInfoProps {
  profileData: ProfileData;
}
```

### ProfileActions
Botones de acciones disponibles:
- Refresh Profile: Recarga los datos del perfil
- Edit Profile: Abre el formulario de edición (futuro)
- Sign Out: Cierra la sesión

**Props:**
```typescript
interface ProfileActionsProps {
  profileData: ProfileData;
  onRefresh: () => Promise<void>;
  onLogout: () => Promise<void>;
  isLoading?: boolean;
}
```

### ProfileStates
Estados visuales:
- `ProfileLoading`: Muestra un loader
- `ProfileLoadingSkeleton`: Esqueleto con animaciones
- `ProfileError`: Muestra mensaje de error

## Hook: useProfile

Hook personalizado que:
1. Obtiene datos del usuario desde `authStore`
2. Sincroniza con el endpoint `/api/auth/me` (getUserData)
3. Maneja estados de carga y errores
4. Proporciona función para refrescar datos

**Return:**
```typescript
interface UseProfileReturn {
  profileData: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetchProfileData: () => Promise<void>;
}
```

## Página Principal

La página `/profile` implementa:
1. **Redirección**: Si no está autenticado, redirige a `/auth/sign-in`
2. **Carga de datos**: Llama a `useProfile()` para obtener datos
3. **Renderizado condicional**: Muestra loading, error o contenido
4. **Logout**: Integración con `useAuth()` para cerrar sesión

## Estilos

- Utiliza componentes de shadcn/ui
- Tailwind CSS 4 para estilos utilitarios
- Soporte dark mode integrado
- Responsive design (mobile first)
- Gradientes y animaciones suaves

## Mejores Prácticas

✅ **Modularización**: Cada componente tiene una responsabilidad única
✅ **Composición**: Los componentes se componen entre sí sin acoplamiento
✅ **Type Safety**: Types exportados para reutilización
✅ **Error Handling**: Manejo robusto de errores
✅ **Loading States**: Estados visuales claros durante la carga
✅ **Accesibilidad**: Iconos con contexto semántico
✅ **Responsive**: Adapta a todos los tamaños de pantalla
✅ **Dark Mode**: Tema oscuro completamente soportado

## Uso

```tsx
import { Profile } from "~/routes/profile";

// La página se protege automáticamente
// Si no hay usuario autenticado, redirige a sign-in
```

## Extensiones Futuras

- Formulario de edición de perfil
- Cambio de contraseña
- Ajustes de privacidad
- Historial de actividad
- Estadísticas del usuario

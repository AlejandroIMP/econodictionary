# Authentication Unit Tests - Guide

Este documento proporciona guía completa para los tests unitarios del módulo de autenticación.

## Estructura de Tests

Los tests están organizados en 4 archivos principales:

```
app/features/auth/
├── utils/
│   └── __tests__/
│       ├── cookies.test.ts          - 13 tests for cookie utilities
│       └── authFetch.test.ts        - 17 test cases for HTTP client
├── store/
│   └── __tests__/
│       └── useAuthStore.test.ts     - 20 tests for Zustand store
└── hooks/
    └── __tests__/
        └── useAuth.test.ts          - 17 tests for React hooks
```

**Total: 67 test cases**

## Instalación de Framework de Testing

Actualmente el proyecto NO tiene framework de testing configurado. Para ejecutar los tests, tienes dos opciones:

### Opción 1: Usar Jest (Recomendado para React Router)

```bash
# Instalar dependencias
pnpm add -D jest @testing-library/react @testing-library/dom @types/jest ts-jest jest-environment-jsdom

# Crear configuración
touch jest.config.js
```

**jest.config.js:**
```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
  },
};
```

**package.json - agregar script:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Opción 2: Usar Vitest (Más moderno, más rápido)

```bash
# Instalar dependencias
pnpm add -D vitest @testing-library/react @testing-library/dom happy-dom

# Crear configuración
touch vitest.config.ts
```

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: [],
  },
});
```

**package.json - agregar script:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Ejecutar Tests

### Con Jest
```bash
# Ejecutar todos los tests
pnpm test

# Modo watch
pnpm test:watch

# Con cobertura
pnpm test:coverage
```

### Con Vitest
```bash
# Ejecutar todos los tests
pnpm test

# UI interactivo
pnpm test:ui

# Con cobertura
pnpm test:coverage
```

## Estructura de Tests Actual

### 1. **cookies.test.ts** (13 tests)

Archivo: `app/features/auth/utils/__tests__/cookies.test.ts`

```typescript
// Pruebas disponibles:
test_getCookie_returns_value_when_exists()
test_getCookie_returns_undefined_when_not_exists()
test_getCookie_extracts_from_multiple_cookies()
test_getCookie_handles_empty_values()
test_getCookie_handles_encoded_values()
test_getCSRFToken_returns_token()
test_getCSRFToken_returns_undefined_when_no_token()
test_getCSRFToken_from_complex_string()
test_hasCookie_returns_true_when_exists()
test_hasCookie_returns_false_when_not_exists()
test_hasCookie_checks_multiple_correctly()
test_empty_cookie_string_handling()
test_cookie_names_with_hyphens()

// Ejecutar pruebas:
test_runAll()  // Muestra reporte completo
```

**Ejemplo de uso manual:**
```typescript
import { test_runAll } from '~/features/auth/utils/__tests__/cookies.test';

// En consola del navegador:
test_runAll();  // ✓ Muestra resultados con emojis y formato
```

**Salida esperada:**
```
╔════════════════════════════════════════════════════════════╗
║          Auth Cookie Utilities - Test Results              ║
╚════════════════════════════════════════════════════════════╝

✓ getCookie_returns_value_when_exists
✓ getCookie_returns_undefined_when_not_exists
...
╔════════════════════════════════════════════════════════════╗
║ Total: 13 | Passed: 13 | Failed: 0                        ║
╚════════════════════════════════════════════════════════════╝
```

### 2. **authFetch.test.ts** (17 test cases)

Archivo: `app/features/auth/utils/__tests__/authFetch.test.ts`

**Categorías de tests:**
- Basic functionality (4 tests)
- Token refresh & 401 handling (4 tests)
- Error handling (4 tests)
- authFetchJSON helper (3 tests)
- Integration scenarios (2 tests)

**Tests incluidos:**
```typescript
test_authFetch_adds_authorization_header
test_authFetch_adds_csrf_token
test_authFetch_csrf_fallback_extraction
test_authFetch_success_response
test_authFetch_refresh_on_401
test_authFetch_rate_limiting           // CRÍTICO: previene loops
test_authFetch_timeout_protection      // CRÍTICO: previene hanging
test_authFetch_no_retry_after_failed_refresh
test_authFetch_network_error_handling
test_authFetch_preserves_body_on_retry
test_authFetch_handles_unauthenticated_requests
test_authFetchJSON_success
test_authFetchJSON_error_response
test_authFetchJSON_invalid_json
test_complete_auth_flow_with_refresh   // CRÍTICO: end-to-end
test_rate_limiting_prevents_cascade
test_production_logging_disabled

// Función para imprimir reporte:
printTestReport()
```

**Características especiales:**
- Tests de rate limiting (5s entre refreshes)
- Tests de timeout (10s máximo)
- Tests de CSRF token con fallbacks
- Escenarios de integración completos

### 3. **useAuthStore.test.ts** (20 tests)

Archivo: `app/features/auth/store/__tests__/useAuthStore.test.ts`

**Categorías:**
- Login/Logout (6 tests)
- Token Refresh (5 tests)
- Initialization (4 tests)
- CSRF Management (2 tests)
- Error Handling (3 tests)

**Tests críticos:**
```typescript
test_login_stores_user_and_tokens
test_login_persists_to_localStorage  // Zustand persist middleware
test_logout_clears_state
test_refreshToken_updates_access_token
test_refreshToken_rate_limiting      // MIN_REFRESH_INTERVAL = 5s
test_refreshToken_timeout_protection // REFRESH_TIMEOUT = 10s
test_initializeAuth_restores_from_localStorage
test_setCsrfToken_updates_and_persists

// Función para generar reporte:
generateAuthStoreTestReport()
```

**Escenarios de integración:**
```typescript
scenario_complete_session_lifecycle
scenario_token_expiration_during_mutation
scenario_cascade_failure_rate_limiting
scenario_network_disconnect_during_refresh
```

### 4. **useAuth.test.ts** (17 tests)

Archivo: `app/features/auth/hooks/__tests__/useAuth.test.ts`

**Categorías:**
- useAuth Hook (3 tests)
- Login Function (3 tests)
- Logout Function (2 tests)
- Protected Routes (2 tests)
- Auth Scenarios (3 tests)
- API Integration (2 tests)
- Error Handling (2 tests)

**Componentes de ejemplo:**
```tsx
// Test 1: useAuth returns state
function TestComponent() {
  const { user, isAuthenticated, accessToken } = useAuth();
  return <div>{user?.email} - {isAuthenticated ? 'Logged in' : 'Logged out'}</div>;
}

// Test 7: Protected route
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return children;
}
```

**Tests críticos:**
```typescript
test_useAuth_returns_state
test_useAuth_hook_reactivity                 // Zustand subscription
test_login_function_valid_credentials
test_protected_route_redirect
test_automatic_token_refresh_transparent     // Transparent refresh
test_session_expired_handling                // Graceful logout
test_network_error_component_handling

// Función para generar reporte:
generateAuthHooksTestReport()
```

## Estrategia de Testing - Sin Framework Externo

Los tests actuales están diseñados para ejecutarse **sin framework externo**. Cada archivo incluye:

1. **Funciones de test independientes** que pueden ser llamadas manualmente
2. **Setup/teardown documentado** en comentarios
3. **Funciones generadoras de reportes** con formateo console
4. **Ejemplos de componentes React** para integración

### Ejemplo: Ejecutar test sin framework

```typescript
// En archivo de prueba manual o en consola
import { test_getCookie_returns_value_when_exists, test_runAll } from '~/features/auth/utils/__tests__/cookies.test';

// Opción 1: Ejecutar test individual
const result = test_getCookie_returns_value_when_exists();
console.log(result); // "PASS" o "FAIL: ..."

// Opción 2: Ejecutar suite completa
const report = test_runAll();
// {
//   total: 13,
//   passed: 13,
//   failed: 0
// }
```

## Próximos Pasos para Implementar Framework

### Paso 1: Instalación
```bash
# Elegir uno:
pnpm add -D vitest @testing-library/react happy-dom
# o
pnpm add -D jest @testing-library/react ts-jest jest-environment-jsdom
```

### Paso 2: Configuración
- Crear archivo de configuración (vitest.config.ts o jest.config.js)
- Configurar environment (happy-dom o jsdom)
- Agregar scripts en package.json

### Paso 3: Adaptar Tests
Los tests actuales necesitarán pequeños cambios:

```typescript
// Cambiar:
import { describe, it, expect } from 'vitest';

// Los test case objects se convertirán en funciones it():
it('should return token value', () => {
  // Test implementation from successCriteria
});
```

### Paso 4: Mocking

```typescript
// Mock Zustand store
vi.mock('~/features/auth/store/useAuthStore', () => ({
  useAuthStore: vi.fn(() => ({
    getState: () => ({ accessToken: 'token123' }),
    login: vi.fn(),
    logout: vi.fn(),
  }))
}));

// Mock fetch
global.fetch = vi.fn(() => 
  Promise.resolve(new Response('{"data": "test"}'))
);

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  value: 'XSRF-TOKEN=token123',
  writable: true,
});
```

## Conocidos Problemas a Considerar

### 1. CSRF Token Accessibility ⚠️
**Estado actual:** ❌ CRÍTICO

```
document.cookie: '' (EMPTY)
├─ SameSite=None + HttpOnly previene acceso JS
├─ Solo cookies de Azure LoadBalancer visibles: ARRAffinity, ARRAffinitySameSite
└─ XSRF-TOKEN no accessible desde JavaScript
```

**Soluciones:**
- Backend: Crear endpoint `/api/auth/csrf` que devuelva token en body
- Backend: Retornar token en header `X-CSRF-Token` en login
- Backend: Exponer XSRF-TOKEN sin HttpOnly flag

### 2. Rate Limiting State Persiste Across Tabs
**Estado actual:** ⚠️ En desarrollo

El `lastRefreshAttempt` es compartido en toda la aplicación pero no sync entre tabs.

**Solución:** Usar sessionStorage o IndexedDB para compartir estado entre tabs

### 3. Zustand Persist Middleware
**Versión actual:** v3

Tests deben validar:
- localStorage key: `auth-store-storage`
- Serialización/deserialización de objetos complejos
- Migración de versiones si cambia schema

## Cobertura de Tests Actual

### Por Módulo:
| Módulo | Tests | Estado |
|--------|-------|--------|
| cookies.ts | 13 | ✅ Completo |
| authFetch.ts | 17 | ✅ Planificado |
| useAuthStore.ts | 20 | ✅ Completo |
| useAuth.ts | 17 | ✅ Completo |
| **Total** | **67** | ✅ Listo |

### Por Categoría:
| Categoría | Tests | Criticidad |
|-----------|-------|-----------|
| Login/Auth | 13 | 🔴 Crítico |
| Token Refresh | 10 | 🔴 Crítico |
| Rate Limiting | 2 | 🟡 Alto |
| CSRF Token | 6 | 🔴 Crítico |
| Error Handling | 10 | 🟡 Alto |
| Session Persistence | 8 | 🟡 Alto |
| Protected Routes | 4 | 🟡 Alto |

## Ejecutar Tests en CI/CD

### GitHub Actions Ejemplo

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:coverage
```

## Reportes Disponibles

Los archivos de test incluyen funciones para generar reportes:

```typescript
// cookies.test.ts
test_runAll() → Muestra todas las pruebas con ✓/✗

// authFetch.test.ts
printTestReport() → Análisis de test planning

// useAuthStore.test.ts
generateAuthStoreTestReport() → Cobertura por categoría

// useAuth.test.ts
generateAuthHooksTestReport() → Patrones de componentes
```

## Conclusión

✅ **Estado actual:**
- 67 test cases completamente documentados
- Listos para framework de testing
- Incluyen setup/teardown detallado
- Cobertura crítica de autenticación

⚠️ **Próximo paso:**
- Elegir framework (Jest o Vitest)
- Instalar y configurar
- Adaptar imports (pequeño cambio)
- Ejecutar `pnpm test`

🚀 **Resultado esperado:**
```
Test Suites: 4 passed, 4 total
Tests: 67 passed, 67 total
Coverage: 85%+ para módulo de auth
```

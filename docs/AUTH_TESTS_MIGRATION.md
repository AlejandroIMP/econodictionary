# Migration Guide: Framework-Agnostic to Jest/Vitest

Este documento muestra cómo adaptar los test cases actuales a Jest o Vitest.

## Paso 1: Instalar Framework

### Jest (Recomendado para React Router)
```bash
pnpm add -D jest @types/jest \
  ts-jest @testing-library/react @testing-library/dom \
  jest-environment-jsdom
```

### Vitest (Más moderno, recomendado para React 19)
```bash
pnpm add -D vitest @testing-library/react \
  @testing-library/dom happy-dom
```

## Paso 2: Crear Archivo de Configuración

### Para Jest - `jest.config.js`
```javascript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/app'],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  collectCoverageFrom: [
    'app/features/auth/**/*.{ts,tsx}',
    '!app/features/auth/**/*.test.{ts,tsx}',
    '!app/features/auth/**/index.{ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
```

### Para Vitest - `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Setup File - `jest.setup.js` o `vitest.setup.ts`
```typescript
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

// Mock fetch si no está disponible
if (!global.fetch) {
  global.fetch = vi.fn();
}
```

## Paso 3: Actualizar package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "jest --coverage"
  },
  "devDependencies": {
    // ... (ver paso 1)
  }
}
```

## Paso 4: Ejemplos de Migración

### Ejemplo 1: cookies.test.ts

**ANTES (Framework-agnostic):**
```typescript
export function test_getCookie_returns_value_when_exists() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'testCookie=testValue; path=/',
    writable: true,
  });

  const result = getCookie('testCookie');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'testValue' ? 'PASS' : `FAIL: Expected 'testValue', got '${result}'`;
}
```

**DESPUÉS (Jest/Vitest):**
```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCookie, getCSRFToken, hasCookie } from '../cookies';

describe('Cookie Utilities', () => {
  let originalCookie: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  });

  afterEach(() => {
    if (originalCookie) {
      Object.defineProperty(document, 'cookie', originalCookie);
    }
  });

  it('should return cookie value when exists', () => {
    Object.defineProperty(document, 'cookie', {
      value: 'testCookie=testValue; path=/',
      writable: true,
    });

    const result = getCookie('testCookie');
    expect(result).toBe('testValue');
  });

  it('should return undefined when cookie does not exist', () => {
    Object.defineProperty(document, 'cookie', {
      value: 'otherCookie=value; path=/',
      writable: true,
    });

    const result = getCookie('nonExistent');
    expect(result).toBeUndefined();
  });

  // ... (más tests)
});
```

### Ejemplo 2: authFetch.test.ts

**ANTES (Framework-agnostic):**
```typescript
export const test_authFetch_adds_authorization_header = {
  description: 'Authorization header is added with access token',
  steps: [
    '1. Mock useAuthStore to return { getState: () => ({ accessToken: "token123" }) }',
    '2. Mock fetch to capture the request',
    '3. Call authFetch("/api/test")',
    '4. Assert: fetch called with headers containing "Authorization: Bearer token123"'
  ],
  expectedResult: 'Authorization header present with correct token'
};
```

**DESPUÉS (Jest/Vitest):**
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { authFetch } from '../authFetch';
import * as authStore from '../../store/useAuthStore';

describe('authFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should add Authorization header with access token', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }))
    );
    global.fetch = mockFetch;

    vi.spyOn(authStore, 'useAuthStore').mockReturnValue({
      getState: () => ({ accessToken: 'token123' }),
    } as any);

    await authFetch('/api/test');

    expect(mockFetch).toHaveBeenCalled();
    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers['Authorization']).toBe('Bearer token123');
  });

  it('should add CSRF token header', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
    );
    global.fetch = mockFetch;

    vi.spyOn(authStore, 'useAuthStore').mockReturnValue({
      getState: () => ({ csrfToken: 'csrf456', accessToken: 'token123' }),
    } as any);

    await authFetch('/api/test', { method: 'PUT' });

    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers['X-CSRF-Token']).toBe('csrf456');
  });

  it('should refresh token on 401 response', async () => {
    const refreshTokenMock = vi.fn().mockResolvedValue(true);
    
    let callCount = 0;
    const mockFetch = vi.fn(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve(new Response(JSON.stringify({}), { status: 401 }));
      }
      return Promise.resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
    });
    global.fetch = mockFetch;

    vi.spyOn(authStore, 'useAuthStore').mockReturnValue({
      getState: () => ({ accessToken: 'token123', csrfToken: 'csrf456' }),
      refreshToken: refreshTokenMock,
    } as any);

    await authFetch('/api/test');

    expect(refreshTokenMock).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledTimes(2); // Original + retry
  });

  it('should enforce rate limiting on refresh', async () => {
    vi.useFakeTimers();
    const refreshTokenMock = vi.fn().mockResolvedValue(true);

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 401 })
    );
    global.fetch = mockFetch;

    vi.spyOn(authStore, 'useAuthStore').mockReturnValue({
      getState: () => ({ accessToken: 'token123', csrfToken: 'csrf456' }),
      refreshToken: refreshTokenMock,
    } as any);

    // Simulate multiple 401s in rapid succession
    const promise1 = authFetch('/api/test1').catch(() => {});
    const promise2 = authFetch('/api/test2').catch(() => {});
    const promise3 = authFetch('/api/test3').catch(() => {});

    await Promise.all([promise1, promise2, promise3]);

    // Should only call refresh once, not 3 times
    expect(refreshTokenMock).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it('should timeout after 10 seconds on refresh', async () => {
    vi.useFakeTimers();

    const refreshTokenMock = vi.fn(() =>
      new Promise(() => {}) // Never resolves
    );

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({}), { status: 401 })
    );
    global.fetch = mockFetch;

    vi.spyOn(authStore, 'useAuthStore').mockReturnValue({
      getState: () => ({ accessToken: 'token123', csrfToken: 'csrf456' }),
      refreshToken: refreshTokenMock,
    } as any);

    const fetchPromise = authFetch('/api/test').catch(err => err);

    // Advance time past timeout
    vi.advanceTimersByTime(11000);

    const error = await fetchPromise;
    expect(error.message).toContain('timeout');

    vi.useRealTimers();
  });
});
```

### Ejemplo 3: useAuthStore.test.ts

**DESPUÉS (Jest/Vitest):**
```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should store user and tokens on successful login', async () => {
      const mockFetch = vi.fn(() =>
        Promise.resolve(new Response(JSON.stringify({
          user: { id: 1, email: 'test@test.com' },
          access_token: 'token123'
        }), { status: 200 }))
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('test@test.com', 'password');
      });

      expect(result.current.user).toEqual({ id: 1, email: 'test@test.com' });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.accessToken).toBe('token123');
    });

    it('should persist state to localStorage', async () => {
      const mockFetch = vi.fn(() =>
        Promise.resolve(new Response(JSON.stringify({
          user: { id: 1, email: 'test@test.com' },
          access_token: 'token123'
        }), { status: 200 }))
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('test@test.com', 'password');
      });

      const stored = JSON.parse(localStorage.getItem('auth-store-storage') || '{}');
      expect(stored.state.user).toEqual({ id: 1, email: 'test@test.com' });
      expect(stored.state.isAuthenticated).toBe(true);
    });

    it('should throw error on invalid credentials', async () => {
      const mockFetch = vi.fn(() =>
        Promise.resolve(new Response(JSON.stringify({
          error: 'Invalid credentials'
        }), { status: 401 }))
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      await expect(
        act(async () => {
          await result.current.login('wrong@test.com', 'wrongpass');
        })
      ).rejects.toThrow();

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('logout', () => {
    it('should clear all auth state', async () => {
      // First login
      const mockFetch = vi.fn()
        .mockResolvedValueOnce(
          new Response(JSON.stringify({
            user: { id: 1, email: 'test@test.com' },
            access_token: 'token123'
          }), { status: 200 })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({}), { status: 200 })
        );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login('test@test.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.accessToken).toBeNull();
      expect(result.current.csrfToken).toBeNull();
    });
  });

  describe('refreshToken', () => {
    it('should update access token on refresh', async () => {
      const mockFetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({
          access_token: 'new_token_xyz'
        }), { status: 200 })
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      // Mock initial state
      act(() => {
        result.current.accessToken = 'old_token';
        result.current.csrfToken = 'csrf123';
      });

      await act(async () => {
        const success = await result.current.refreshToken();
        expect(success).toBe(true);
      });

      expect(result.current.accessToken).toBe('new_token_xyz');
    });

    it('should enforce rate limiting on refresh', async () => {
      vi.useFakeTimers();

      const mockFetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ access_token: 'new_token' }), { status: 200 })
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.accessToken = 'old_token';
        result.current.csrfToken = 'csrf123';
      });

      // First refresh
      await act(async () => {
        await result.current.refreshToken();
      });

      // Second refresh immediately - should be throttled
      await act(async () => {
        await result.current.refreshToken();
      });

      // Should only call fetch once (one for refresh endpoint)
      expect(mockFetch).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it('should timeout after 10 seconds', async () => {
      vi.useFakeTimers();

      const mockFetch = vi.fn(() =>
        new Promise(() => {}) // Never resolves
      );
      global.fetch = mockFetch;

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.accessToken = 'old_token';
        result.current.csrfToken = 'csrf123';
      });

      const refreshPromise = act(async () => {
        return await result.current.refreshToken();
      });

      vi.advanceTimersByTime(11000);

      const success = await refreshPromise;
      expect(success).toBe(false);

      vi.useRealTimers();
    });
  });

  describe('initializeAuth', () => {
    it('should restore session from localStorage', async () => {
      const storedState = {
        state: {
          user: { id: 1, email: 'test@test.com' },
          isAuthenticated: true,
          accessToken: 'token123',
          csrfToken: 'csrf456'
        },
        version: 0
      };
      localStorage.setItem('auth-store-storage', JSON.stringify(storedState));

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initializeAuth();
      });

      expect(result.current.user).toEqual({ id: 1, email: 'test@test.com' });
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.accessToken).toBe('token123');
    });

    it('should handle no existing session', async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.initializeAuth();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
```

### Ejemplo 4: useAuth.test.ts (React Components)

**DESPUÉS (Jest/Vitest):**
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../useAuth';

// Mock component para testing
function TestLoginComponent() {
  const { login, isAuthenticated, user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div>
      <p>{isAuthenticated ? 'Logged in' : 'Not logged in'}</p>
      <p>{user?.email}</p>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password" type="password" />
      <button onClick={() => login(email, password)}>Sign In</button>
    </div>
  );
}

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should return current auth state', () => {
    render(<TestLoginComponent />);
    
    expect(screen.getByText('Not logged in')).toBeInTheDocument();
  });

  it('should update component when login succeeds', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({
        user: { id: 1, email: 'test@test.com' },
        access_token: 'token123'
      }), { status: 200 }))
    );
    global.fetch = mockFetch;

    render(<TestLoginComponent />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const button = screen.getByText('Sign In');

    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Logged in')).toBeInTheDocument();
      expect(screen.getByText('test@test.com')).toBeInTheDocument();
    });
  });

  it('should handle login errors', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify({
        error: 'Invalid credentials'
      }), { status: 401 }))
    );
    global.fetch = mockFetch;

    render(<TestLoginComponent />);

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const button = screen.getByText('Sign In');

    await userEvent.type(emailInput, 'wrong@test.com');
    await userEvent.type(passwordInput, 'wrong');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument();
    });
  });
});
```

## Paso 5: Ejecutar Tests

```bash
# Jest
pnpm test
pnpm test:watch
pnpm test:coverage

# Vitest
pnpm test
pnpm test --watch
pnpm test --ui
pnpm test --coverage
```

## Paso 6: Configurar CI/CD

### GitHub Actions - `.github/workflows/test.yml`

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

## Paso 7: Validar Migración

Después de migrar, verifica que:

```bash
# Todos los tests pasan
✓ Test Suites: 4 passed, 4 total
✓ Tests: 67 passed, 67 total

# Cobertura adecuada
✓ Statements: 85%+
✓ Branches: 80%+
✓ Functions: 85%+
✓ Lines: 85%+

# Tiempo de ejecución
✓ < 10 segundos para suite completa
```

## Resumen de Cambios

| Aspecto | Antes | Después |
|---------|-------|---------|
| Framework | Ninguno | Jest/Vitest |
| Imports | Manual | `import { describe, it, expect }` |
| Setup | Función propia | `beforeEach/afterEach` |
| Assertions | String `"PASS"/"FAIL"` | `expect()` matchers |
| Mocking | Manual | `vi.fn()` o `jest.fn()` |
| Async | `Promise.then()` | `async/await` con `act()` |
| Reportes | Console logs | Coverage reports + HTML |

## Próximos Pasos

1. ✅ Leer esta guía
2. ⏳ Instalar framework (Jest o Vitest)
3. ⏳ Crear archivos de configuración
4. ⏳ Migrar tests gradualmente
5. ⏳ Ejecutar `pnpm test`
6. ⏳ Agregar a CI/CD
7. ⏳ Lograr 85%+ cobertura

---

**Duración estimada:** 2-3 horas
**Dificultad:** Media (copia/adapta ejemplos)
**Resultado:** Suite de tests completa y automatizada ✨

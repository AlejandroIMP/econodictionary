# 🔐 Guía de Autenticación Frontend - ProductManagement API

## 📋 Índice
1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Endpoints de Autenticación](#endpoints-de-autenticación)
4. [Implementación en JavaScript/TypeScript](#implementación-en-javascripttypescript)
5. [Manejo de Cookies](#manejo-de-cookies)
6. [Protección CSRF](#protección-csrf)
7. [Refresh Token Automático](#refresh-token-automático)
8. [Ejemplos de Código](#ejemplos-de-código)
9. [Verificación y Debugging](#verificación-y-debugging)
10. [Troubleshooting](#troubleshooting)

---

## 📚 Introducción

Esta API utiliza un sistema de autenticación híbrido:
- **Access Token (JWT)**: Enviado en el header `Authorization` para autenticar cada petición
- **Refresh Token**: Almacenado en cookie `HttpOnly` para renovar el access token
- **CSRF Token**: Cookie legible por JavaScript para protección contra ataques CSRF

### ✅ Ventajas de este sistema
- 🔒 Refresh token seguro (no accesible desde JavaScript)
- 🛡️ Protección contra XSS y CSRF
- 🔄 Renovación automática de tokens
- 📱 Soporte para múltiples subdominios en producción

---

## ⚙️ Configuración Inicial

### Backend (Ya configurado)

**Desarrollo (localhost):**
```json
{
  "RefreshTokenCookieSecure": false,
  "RefreshTokenCookieSameSite": "Lax",
  "RefreshTokenCookieDomain": null,
  "RefreshTokenCookieHttpOnly": true
}
```

**Producción (HTTPS):**
```json
{
  "RefreshTokenCookieSecure": true,
  "RefreshTokenCookieSameSite": "None",
  "RefreshTokenCookieDomain": ".alejandroimp.me",
  "RefreshTokenCookieHttpOnly": true
}
```

### Frontend

**Axios con credenciales:**
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7218';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ⚠️ CRÍTICO: Permite enviar/recibir cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
```

---

## 🔌 Endpoints de Autenticación

### 1. **POST** `/api/auth/register` - Registro de usuario

**Request Body:**
```json
{
  "name": "Juan",
  "surname": "Pérez",
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "MySecurePass123!",
  "confirmPassword": "MySecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "juan@example.com",
  "username": "juanperez",
  "requiresEmailConfirmation": true,
  "message": "Usuario registrado exitosamente. Por favor, confirma tu email."
}
```

**Response (400) - Error:**
```json
{
  "success": false,
  "errorCode": "EmailAlreadyExists",
  "message": "El email ya está registrado",
  "errors": null
}
```

---

### 2. **POST** `/api/auth/login` - Iniciar sesión

**Request Body:**
```json
{
  "emailOrUsername": "juan@example.com",
  "password": "MySecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-10-17T15:30:00Z",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "juan@example.com",
  "username": "juanperez",
  "roles": ["user"]
}
```

**Cookies establecidas:**
- `refreshToken` (HttpOnly, 7 días) - No accesible desde JavaScript
- `XSRF-TOKEN` (legible, 7 días) - Token CSRF para validación

**Response (401) - Credenciales inválidas:**
```json
{
  "success": false,
  "errorCode": "InvalidPassword",
  "message": "Contraseña incorrecta",
  "remainingAttempts": 4
}
```

**Response (423) - Cuenta bloqueada:**
```json
{
  "success": false,
  "errorCode": "AccountLocked",
  "message": "Cuenta bloqueada hasta 2025-10-17T16:00:00Z por múltiples intentos fallidos",
  "lockedUntil": "2025-10-17T16:00:00Z"
}
```

---

### 3. **POST** `/api/auth/refresh-token` - Renovar access token

**Request:** (No requiere body, usa cookie `refreshToken`)

**Headers requeridos:**
```
X-CSRF-TOKEN: {valor de la cookie XSRF-TOKEN}
```

**Response (200):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresAt": "2025-10-17T15:30:00Z",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "juan@example.com",
  "username": "juanperez",
  "roles": ["user"]
}
```

**Response (401) - Token inválido:**
```json
{
  "success": false,
  "errorCode": "InvalidRefreshToken",
  "message": "Refresh token inválido o no encontrado"
}
```

---

### 4. **POST** `/api/auth/logout` - Cerrar sesión

**Request:** (No requiere body)

**Headers requeridos:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### 5. **GET** `/api/auth/me` - Obtener usuario actual

**Headers requeridos:**
```
Authorization: Bearer {accessToken}
```

**Response (200):**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "juan@example.com",
  "username": "juanperez",
  "fullName": "Juan Pérez",
  "roles": ["user"],
  "emailConfirmed": true,
  "isActive": true
}
```

---

### 6. **POST** `/api/auth/confirm-email` - Confirmar email

**Request Body:**
```json
{
  "token": "abc123def456..."
}
```

**Response (200):**
```json
{
  "message": "Email confirmado exitosamente. Ya puedes iniciar sesión."
}
```

---

### 7. **POST** `/api/auth/forgot-password` - Solicitar reset de contraseña

**Request Body:**
```json
{
  "email": "juan@example.com"
}
```

**Response (200):**
```json
{
  "message": "Si el email existe, se ha enviado un enlace para restablecer la contraseña."
}
```

---

### 8. **POST** `/api/auth/reset-password` - Restablecer contraseña

**Request Body:**
```json
{
  "token": "xyz789...",
  "newPassword": "NewSecurePass123!",
  "confirmPassword": "NewSecurePass123!"
}
```

**Response (200):**
```json
{
  "message": "Contraseña restablecida exitosamente."
}
```

---

## 💻 Implementación en JavaScript/TypeScript

### Servicio de Autenticación (authService.js)

```javascript
import apiClient from './apiClient';

const TOKEN_KEY = 'accessToken';
const TOKEN_EXPIRY_KEY = 'tokenExpiresAt';

// ==================== HELPER FUNCTIONS ====================

/**
 * Obtiene el token CSRF de las cookies
 */
function getCsrfToken() {
  const cookies = document.cookie.split(';');
  const csrfCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
}

/**
 * Guarda el access token en localStorage
 */
function saveAccessToken(token, expiresAt) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiresAt);
}

/**
 * Obtiene el access token de localStorage
 */
function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Verifica si el token ha expirado
 */
function isTokenExpired() {
  const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryTime) return true;
  
  // Renovar 5 minutos antes de expirar
  const bufferTime = 5 * 60 * 1000; // 5 minutos en ms
  return new Date(expiryTime).getTime() - bufferTime < Date.now();
}

/**
 * Limpia todos los tokens y cookies
 */
function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  // Las cookies se limpian automáticamente al hacer logout
}

// ==================== API FUNCTIONS ====================

/**
 * Registra un nuevo usuario
 */
export async function register(userData) {
  try {
    const response = await apiClient.post('/api/auth/register', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al registrar usuario'
    };
  }
}

/**
 * Inicia sesión
 */
export async function login(credentials) {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    
    if (response.data.success) {
      // Guardar access token
      saveAccessToken(response.data.accessToken, response.data.expiresAt);
      
      // Verificar que las cookies se hayan establecido
      console.log('✅ Login successful, checking cookies...');
      console.log('📋 Cookies available:', document.cookie);
      console.log('🛡️ CSRF Token:', getCsrfToken());
      
      return { success: true, data: response.data };
    }
    
    return { success: false, error: response.data.message };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al iniciar sesión'
    };
  }
}

/**
 * Renueva el access token usando el refresh token (cookie)
 */
export async function refreshAccessToken() {
  try {
    const csrfToken = getCsrfToken();
    
    if (!csrfToken) {
      console.error('❌ CSRF token not found in cookies');
      return { success: false, error: 'CSRF token no encontrado' };
    }
    
    const response = await apiClient.post(
      '/api/auth/refresh-token',
      {}, // No body needed
      {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        }
      }
    );
    
    if (response.data.success) {
      saveAccessToken(response.data.accessToken, response.data.expiresAt);
      console.log('✅ Token refreshed successfully');
      return { success: true, data: response.data };
    }
    
    return { success: false, error: response.data.message };
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    clearTokens();
    return {
      success: false,
      error: error.response?.data?.message || 'Error al renovar token'
    };
  }
}

/**
 * Cierra sesión
 */
export async function logout() {
  try {
    const token = getAccessToken();
    
    if (token) {
      await apiClient.post('/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    
    clearTokens();
    console.log('✅ Logged out successfully');
    return { success: true };
  } catch (error) {
    // Limpiar tokens locales incluso si falla la petición
    clearTokens();
    return { success: true }; // Consideramos exitoso el logout local
  }
}

/**
 * Obtiene la información del usuario actual
 */
export async function getCurrentUser() {
  try {
    const token = getAccessToken();
    
    if (!token) {
      return { success: false, error: 'No hay sesión activa' };
    }
    
    const response = await apiClient.get('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al obtener usuario'
    };
  }
}

/**
 * Solicita reset de contraseña
 */
export async function forgotPassword(email) {
  try {
    const response = await apiClient.post('/api/auth/forgot-password', { email });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al solicitar reset'
    };
  }
}

/**
 * Restablece la contraseña
 */
export async function resetPassword(token, newPassword, confirmPassword) {
  try {
    const response = await apiClient.post('/api/auth/reset-password', {
      token,
      newPassword,
      confirmPassword
    });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al restablecer contraseña'
    };
  }
}

/**
 * Confirma el email del usuario
 */
export async function confirmEmail(token) {
  try {
    const response = await apiClient.post('/api/auth/confirm-email', { token });
    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Error al confirmar email'
    };
  }
}

// ==================== EXPORT HELPERS ====================

export {
  getAccessToken,
  isTokenExpired,
  getCsrfToken,
  clearTokens
};
```

---

## 🍪 Manejo de Cookies

### Cookies establecidas por el backend

| Cookie | Descripción | HttpOnly | Secure (Dev) | Secure (Prod) | SameSite (Dev) | SameSite (Prod) | Duración |
|--------|-------------|----------|--------------|---------------|----------------|-----------------|----------|
| `refreshToken` | Token para renovar access token | ✅ Sí | ❌ No | ✅ Sí | Lax | None | 7 días |
| `XSRF-TOKEN` | Token CSRF para validación | ❌ No | ❌ No | ✅ Sí | Lax | None | 7 días |

### ⚠️ Importante sobre cookies

1. **`refreshToken` es HttpOnly**: No puedes leerlo desde JavaScript (esto es intencional por seguridad)
2. **`XSRF-TOKEN` es legible**: Debes leerlo y enviarlo en el header `X-CSRF-TOKEN`
3. **El navegador envía automáticamente** el `refreshToken` en cada petición si `withCredentials: true` está configurado

### Verificar cookies en el navegador

```javascript
// En la consola del navegador después del login:
console.log('Cookies:', document.cookie);
// Output esperado: "XSRF-TOKEN=abc123def456..."
// (refreshToken NO aparecerá porque es HttpOnly)
```

---

## 🛡️ Protección CSRF

### ¿Qué es CSRF?

Cross-Site Request Forgery es un ataque donde un sitio malicioso hace peticiones a tu API usando las cookies del usuario.

### Cómo protegerse (Implementado en esta API)

1. **Backend**: Establece cookie `XSRF-TOKEN` (legible por JS)
2. **Frontend**: Lee la cookie y envíala en el header `X-CSRF-TOKEN`
3. **Backend**: Valida que el header coincida con la cookie

### Implementación en interceptor de Axios

```javascript
// Agregar a apiClient.js

import axios from 'axios';
import { getCsrfToken, getAccessToken, isTokenExpired, refreshAccessToken } from './authService';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:7218',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==================== REQUEST INTERCEPTOR ====================

apiClient.interceptors.request.use(
  async (config) => {
    // 1. Agregar access token si existe
    const token = getAccessToken();
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 2. Agregar CSRF token para peticiones mutantes (POST, PUT, DELETE, PATCH)
    const mutatingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
    if (mutatingMethods.includes(config.method?.toUpperCase())) {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRF-TOKEN'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==================== RESPONSE INTERCEPTOR ====================

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si recibimos 401 y no hemos intentado renovar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Intentar renovar el token
      const result = await refreshAccessToken();
      
      if (result.success) {
        // Actualizar el header con el nuevo token
        originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        // Reintentar la petición original
        return apiClient(originalRequest);
      } else {
        // Si falla el refresh, redirigir al login
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 🔄 Refresh Token Automático

### Estrategia de renovación

Existen dos enfoques:

#### 1. **Renovación proactiva** (Recomendado)

Renovar el token antes de que expire:

```javascript
// Verificar cada 5 minutos si el token necesita renovarse
setInterval(async () => {
  const token = getAccessToken();
  
  if (token && isTokenExpired()) {
    console.log('🔄 Token about to expire, refreshing...');
    await refreshAccessToken();
  }
}, 5 * 60 * 1000); // Cada 5 minutos
```

#### 2. **Renovación reactiva** (Ya implementado en interceptor)

Esperar a recibir un 401 y entonces renovar:

```javascript
// Ya implementado en el interceptor de respuesta de apiClient
// Automáticamente intenta renovar el token cuando recibe 401
```

### Implementación completa (React)

```javascript
// hooks/useAuth.js
import { useEffect } from 'react';
import { isTokenExpired, refreshAccessToken, getAccessToken } from '../services/authService';

export function useAuth() {
  useEffect(() => {
    // Renovar token proactivamente
    const interval = setInterval(async () => {
      const token = getAccessToken();
      
      if (token && isTokenExpired()) {
        console.log('🔄 Refreshing token...');
        await refreshAccessToken();
      }
    }, 5 * 60 * 1000); // Cada 5 minutos
    
    return () => clearInterval(interval);
  }, []);
}
```

---

## 📝 Ejemplos de Código

### Página de Login (React)

```jsx
import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(formData);
    
    if (result.success) {
      console.log('✅ Login successful:', result.data);
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email o Username:</label>
          <input
            type="text"
            value={formData.emailOrUsername}
            onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}
```

### Página de Registro (React)

```jsx
import React, { useState } from 'react';
import { register } from '../services/authService';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    const result = await register(formData);
    
    if (result.success) {
      setSuccess('¡Registro exitoso! Revisa tu email para confirmar tu cuenta.');
      setFormData({
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="register-container">
      <h1>Registro</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}
```

### Protección de Rutas (React Router)

```jsx
// components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getCurrentUser, refreshAccessToken, isTokenExpired } from '../services/authService';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [hasRequiredRole, setHasRequiredRole] = useState(true);
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    const token = getAccessToken();
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    
    // Si el token está por expirar, renovarlo
    if (isTokenExpired()) {
      const refreshResult = await refreshAccessToken();
      if (!refreshResult.success) {
        setIsAuthenticated(false);
        return;
      }
    }
    
    // Obtener información del usuario
    const userResult = await getCurrentUser();
    
    if (userResult.success) {
      setIsAuthenticated(true);
      
      // Verificar rol si es requerido
      if (requiredRole && !userResult.data.roles.includes(requiredRole)) {
        setHasRequiredRole(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };
  
  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
}
```

---

## 🔍 Verificación y Debugging

### 1. Verificar cookies después del login

```javascript
// En la consola del navegador:
console.log('Cookies:', document.cookie);
// Esperado: "XSRF-TOKEN=abc123..."

console.log('Access Token:', localStorage.getItem('accessToken'));
// Esperado: "eyJhbGciOiJIUzI1NiIs..."
```

### 2. Verificar headers en peticiones

Abre DevTools → Network → Selecciona una petición → Headers:

**Request Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-CSRF-TOKEN: abc123def456
Cookie: refreshToken=xyz789...; XSRF-TOKEN=abc123...
```

### 3. Verificar respuesta del login

```javascript
// Después de hacer login, verifica la respuesta
const result = await login({ emailOrUsername: 'test@test.com', password: 'pass' });
console.log('Login result:', result);
console.log('Cookies after login:', document.cookie);
```

### 4. Probar renovación de token

```javascript
import { refreshAccessToken } from './authService';

// Probar manualmente la renovación
const result = await refreshAccessToken();
console.log('Refresh result:', result);
```

---

## 🐛 Troubleshooting

### ❌ Problema: Cookies no se guardan

**Síntoma:** `document.cookie` está vacío después del login

**Causas posibles:**
1. `withCredentials: true` no está configurado en axios
2. Configuración de cookies incorrecta (Secure: true en HTTP localhost)
3. CORS mal configurado

**Solución:**
```javascript
// 1. Verificar axios client
const apiClient = axios.create({
  baseURL: 'http://localhost:7218',
  withCredentials: true  // ⚠️ CRUCIAL
});

// 2. Verificar que el backend esté en modo Development
// (debe usar Secure: false, SameSite: Lax)

// 3. Limpiar cookies antiguas
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
```

---

### ❌ Problema: Error 401 al renovar token

**Síntoma:** `refreshAccessToken()` devuelve 401

**Causas posibles:**
1. Refresh token expirado (> 7 días)
2. CSRF token no se envía en el header
3. Cookie `refreshToken` no se envía

**Solución:**
```javascript
// Verificar que CSRF token existe
const csrfToken = getCsrfToken();
console.log('CSRF Token:', csrfToken);

// Verificar que se envía en el header
await apiClient.post('/api/auth/refresh-token', {}, {
  headers: {
    'X-CSRF-TOKEN': csrfToken
  }
});

// Verificar que refreshToken cookie está presente
// (No puedes verlo en document.cookie porque es HttpOnly,
// pero deberías verlo en DevTools → Application → Cookies)
```

---

### ❌ Problema: CORS error

**Síntoma:** `Access-Control-Allow-Origin` error en consola

**Causas posibles:**
1. Backend CORS no permite el origen del frontend
2. `AllowCredentials()` falta en CORS
3. Frontend usa origen incorrecto

**Solución (Backend ya configurado):**
```csharp
// Verificar en Program.cs que incluye:
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // Tu frontend
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();  // ⚠️ CRUCIAL para cookies
    });
});
```

---

### ❌ Problema: Token expirado inmediatamente

**Síntoma:** Access token expira muy rápido

**Causa:** Configuración de `JwtLifespanMinutes` incorrecta

**Solución:**
```json
// Verificar en appsettings.json
{
  "AuthOptions": {
    "JwtLifespanMinutes": 60  // 1 hora (ajustar según necesidad)
  }
}
```

---

### ❌ Problema: No se puede leer `refreshToken` cookie

**Síntoma:** `document.cookie` no muestra `refreshToken`

**Causa:** Esta es la **conducta esperada** (HttpOnly cookie)

**Explicación:**
- El `refreshToken` es **HttpOnly**, no puedes leerlo desde JavaScript (esto es por seguridad)
- El navegador lo envía automáticamente en cada petición si `withCredentials: true`
- Puedes verificar su presencia en DevTools → Application → Cookies

---

## 📊 Resumen de Flujo Completo

```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │
       │ 1. POST /api/auth/login
       │    { email, password }
       ▼
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │
       │ 2. Valida credenciales
       │    Genera JWT + RefreshToken
       ▼
┌─────────────┐
│  Frontend   │ ◄── Response: { accessToken, ... }
└──────┬──────┘     Set-Cookie: refreshToken (HttpOnly)
       │             Set-Cookie: XSRF-TOKEN (legible)
       │
       │ 3. Guarda accessToken en localStorage
       │    Lee XSRF-TOKEN de cookie
       │
       ▼
┌─────────────┐
│  Frontend   │
│ (requests)  │
└──────┬──────┘
       │
       │ 4. Petición protegida
       │    Header: Authorization: Bearer {accessToken}
       │    Cookie: refreshToken (automático)
       ▼
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │
       │ 5. Valida JWT
       ▼
   [Si 401]
       │
       ▼
┌─────────────┐
│  Frontend   │
│ (interceptor)│
└──────┬──────┘
       │
       │ 6. POST /api/auth/refresh-token
       │    Header: X-CSRF-TOKEN: {csrfToken}
       │    Cookie: refreshToken (automático)
       ▼
┌─────────────┐
│   Backend   │
└──────┬──────┘
       │
       │ 7. Valida RefreshToken + CSRF
       │    Genera nuevo JWT
       ▼
┌─────────────┐
│  Frontend   │ ◄── Response: { accessToken, ... }
└──────┬──────┘
       │
       │ 8. Actualiza accessToken
       │    Reintenta petición original
       ▼
    [Success]
```

---

## 🔒 Mejores Prácticas de Seguridad

1. **✅ Siempre usar HTTPS en producción** - Requerido para cookies Secure
2. **✅ Nunca almacenar RefreshToken en localStorage** - Usa cookies HttpOnly
3. **✅ Implementar CSRF protection** - Usa double-submit cookie pattern
4. **✅ Renovar tokens antes de expirar** - Evita interrupciones de sesión
5. **✅ Limpiar tokens al cerrar sesión** - Previene acceso no autorizado
6. **✅ Validar entrada del usuario** - Previene inyección de código
7. **✅ Usar CORS restrictivo** - Solo orígenes confiables
8. **✅ Implementar rate limiting** - Previene ataques de fuerza bruta (ya implementado en backend: 5 intentos)
9. **✅ Logs de seguridad** - Monitorea intentos fallidos de login
10. **✅ Expiración de tokens corta** - Reduce ventana de ataque

---

## 📞 Soporte

Si tienes problemas con la autenticación:

1. **Verifica la consola del navegador** para errores de JavaScript
2. **Verifica la pestaña Network** en DevTools para ver las peticiones/respuestas
3. **Verifica Application → Cookies** para ver si las cookies se establecen correctamente
4. **Revisa los logs del backend** para ver errores del servidor

---

## 🎯 Checklist de Implementación

- [ ] Axios configurado con `withCredentials: true`
- [ ] Interceptor de request agrega `Authorization` header
- [ ] Interceptor de request agrega `X-CSRF-TOKEN` header en peticiones mutantes
- [ ] Interceptor de response maneja 401 y renueva token
- [ ] Servicio de autenticación implementado (login, logout, register, etc.)
- [ ] Access token guardado en localStorage
- [ ] Cookies verificadas en DevTools después del login
- [ ] Renovación automática de token implementada
- [ ] Rutas protegidas implementadas
- [ ] Manejo de errores implementado
- [ ] Probado en desarrollo (HTTP localhost)
- [ ] Probado en producción (HTTPS)

---

## 📚 Referencias

- [JWT.io](https://jwt.io/) - Decodificador de JWT
- [MDN - HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [OWASP - CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Axios Documentation](https://axios-http.com/docs/intro)

---

**Última actualización:** 2025-10-17  
**Versión API:** v1  
**Autor:** ProductManagement Team

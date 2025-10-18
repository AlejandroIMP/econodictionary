/**
 * Auth Cookie Utilities Tests
 * 
 * These tests validate the cookie utility functions used for authentication.
 * To run: Set NODE_ENV=test and execute with your test runner
 * 
 * Manual test cases documented below
 */

import { getCookie, getCSRFToken, hasCookie } from '../cookies';

// ============================================================================
// TEST SUITE: getCookie()
// ============================================================================

/**
 * Test Case 1: getCookie returns value when cookie exists
 * 
 * Setup: document.cookie = "testCookie=testValue; path=/"
 * Expected: getCookie('testCookie') returns 'testValue'
 * Status: PASS/FAIL
 */
export function test_getCookie_returns_value_when_exists() {
  // Mock document.cookie
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'testCookie=testValue; path=/',
    writable: true,
  });

  const result = getCookie('testCookie');
  
  // Restore
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'testValue' ? 'PASS' : `FAIL: Expected 'testValue', got '${result}'`;
}

/**
 * Test Case 2: getCookie returns undefined when cookie doesn't exist
 * 
 * Setup: document.cookie = "otherCookie=value; path=/"
 * Expected: getCookie('nonExistent') returns undefined
 * Status: PASS/FAIL
 */
export function test_getCookie_returns_undefined_when_not_exists() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'otherCookie=value; path=/',
    writable: true,
  });

  const result = getCookie('nonExistent');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === undefined ? 'PASS' : `FAIL: Expected undefined, got '${result}'`;
}

/**
 * Test Case 3: getCookie extracts value from multiple cookies
 * 
 * Setup: document.cookie = "cookie1=value1; cookie2=value2; cookie3=value3"
 * Expected: getCookie('cookie2') returns 'value2'
 * Status: PASS/FAIL
 */
export function test_getCookie_extracts_from_multiple_cookies() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'cookie1=value1; cookie2=value2; cookie3=value3',
    writable: true,
  });

  const result = getCookie('cookie2');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'value2' ? 'PASS' : `FAIL: Expected 'value2', got '${result}'`;
}

/**
 * Test Case 4: getCookie handles empty values
 * 
 * Setup: document.cookie = "emptyCookie=; path=/"
 * Expected: getCookie('emptyCookie') returns ''
 * Status: PASS/FAIL
 */
export function test_getCookie_handles_empty_values() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'emptyCookie=; path=/',
    writable: true,
  });

  const result = getCookie('emptyCookie');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === '' ? 'PASS' : `FAIL: Expected '', got '${result}'`;
}

/**
 * Test Case 5: getCookie handles URL-encoded values
 * 
 * Setup: document.cookie = "encodedCookie=hello%20world"
 * Expected: getCookie('encodedCookie') returns 'hello%20world'
 * Status: PASS/FAIL
 */
export function test_getCookie_handles_encoded_values() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'encodedCookie=hello%20world',
    writable: true,
  });

  const result = getCookie('encodedCookie');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'hello%20world' ? 'PASS' : `FAIL: Expected 'hello%20world', got '${result}'`;
}

// ============================================================================
// TEST SUITE: getCSRFToken()
// ============================================================================

/**
 * Test Case 6: getCSRFToken returns XSRF-TOKEN value
 * 
 * Setup: document.cookie = "XSRF-TOKEN=csrf123; path=/"
 * Expected: getCSRFToken() returns 'csrf123'
 * Status: PASS/FAIL
 */
export function test_getCSRFToken_returns_token() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'XSRF-TOKEN=csrf123; path=/',
    writable: true,
  });

  const result = getCSRFToken();
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'csrf123' ? 'PASS' : `FAIL: Expected 'csrf123', got '${result}'`;
}

/**
 * Test Case 7: getCSRFToken returns undefined when token not found
 * 
 * Setup: document.cookie = "otherCookie=value; path=/"
 * Expected: getCSRFToken() returns undefined
 * Status: PASS/FAIL
 * 
 * NOTE: This is the known issue in production!
 * XSRF-TOKEN cookie is not accessible due to SameSite=None
 */
export function test_getCSRFToken_returns_undefined_when_no_token() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'otherCookie=value; path=/',
    writable: true,
  });

  const result = getCSRFToken();
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === undefined ? 'PASS' : `FAIL: Expected undefined, got '${result}'`;
}

/**
 * Test Case 8: getCSRFToken extracts from complex cookie string
 * 
 * Setup: document.cookie = "AUTH=token; XSRF-TOKEN=xyz789; SESSION=abc123"
 * Expected: getCSRFToken() returns 'xyz789'
 * Status: PASS/FAIL
 */
export function test_getCSRFToken_from_complex_string() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'AUTH=token; XSRF-TOKEN=xyz789; SESSION=abc123',
    writable: true,
  });

  const result = getCSRFToken();
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'xyz789' ? 'PASS' : `FAIL: Expected 'xyz789', got '${result}'`;
}

// ============================================================================
// TEST SUITE: hasCookie()
// ============================================================================

/**
 * Test Case 9: hasCookie returns true when cookie exists
 * 
 * Setup: document.cookie = "testCookie=value; path=/"
 * Expected: hasCookie('testCookie') returns true
 * Status: PASS/FAIL
 */
export function test_hasCookie_returns_true_when_exists() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'testCookie=value; path=/',
    writable: true,
  });

  const result = hasCookie('testCookie');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === true ? 'PASS' : `FAIL: Expected true, got ${result}`;
}

/**
 * Test Case 10: hasCookie returns false when cookie doesn't exist
 * 
 * Setup: document.cookie = "otherCookie=value; path=/"
 * Expected: hasCookie('nonExistent') returns false
 * Status: PASS/FAIL
 */
export function test_hasCookie_returns_false_when_not_exists() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'otherCookie=value; path=/',
    writable: true,
  });

  const result = hasCookie('nonExistent');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === false ? 'PASS' : `FAIL: Expected false, got ${result}`;
}

/**
 * Test Case 11: hasCookie checks multiple cookies correctly
 * 
 * Setup: document.cookie = "cookie1=value1; cookie2=value2; cookie3=value3"
 * Expected: hasCookie('cookie2') returns true, hasCookie('missing') returns false
 * Status: PASS/FAIL
 */
export function test_hasCookie_checks_multiple_correctly() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'cookie1=value1; cookie2=value2; cookie3=value3',
    writable: true,
  });

  const hasExists = hasCookie('cookie2');
  const hasMissing = hasCookie('missing');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return (hasExists === true && hasMissing === false) 
    ? 'PASS' 
    : `FAIL: Expected (true, false), got (${hasExists}, ${hasMissing})`;
}

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

/**
 * Test Case 12: Empty document.cookie string handling
 * 
 * Setup: document.cookie = ""
 * Expected: getCookie('any'), getCSRFToken(), hasCookie('any') return undefined/false gracefully
 * Status: PASS/FAIL
 */
export function test_empty_cookie_string_handling() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: '',
    writable: true,
  });

  const getCookieResult = getCookie('test');
  const getCSRFResult = getCSRFToken();
  const hasCookieResult = hasCookie('test');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return (getCookieResult === undefined && getCSRFResult === undefined && hasCookieResult === false)
    ? 'PASS'
    : `FAIL: Expected (undefined, undefined, false), got (${getCookieResult}, ${getCSRFResult}, ${hasCookieResult})`;
}

/**
 * Test Case 13: Cookie names with special characters
 * 
 * Setup: document.cookie = "XSRF-TOKEN=token; path=/; secure"
 * Expected: getCookie('XSRF-TOKEN') returns correct value
 * Status: PASS/FAIL
 */
export function test_cookie_names_with_hyphens() {
  const originalCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
  Object.defineProperty(document, 'cookie', {
    value: 'XSRF-TOKEN=token123; path=/; secure',
    writable: true,
  });

  const result = getCookie('XSRF-TOKEN');
  
  if (originalCookie) {
    Object.defineProperty(document, 'cookie', originalCookie);
  }

  return result === 'token123' ? 'PASS' : `FAIL: Expected 'token123', got '${result}'`;
}

// ============================================================================
// MANUAL TEST RUNNER
// ============================================================================

/**
 * Run all tests and log results
 * Usage: test_runAll()
 */
export function test_runAll() {
  const tests = [
    { name: 'getCookie_returns_value_when_exists', fn: test_getCookie_returns_value_when_exists },
    { name: 'getCookie_returns_undefined_when_not_exists', fn: test_getCookie_returns_undefined_when_not_exists },
    { name: 'getCookie_extracts_from_multiple_cookies', fn: test_getCookie_extracts_from_multiple_cookies },
    { name: 'getCookie_handles_empty_values', fn: test_getCookie_handles_empty_values },
    { name: 'getCookie_handles_encoded_values', fn: test_getCookie_handles_encoded_values },
    { name: 'getCSRFToken_returns_token', fn: test_getCSRFToken_returns_token },
    { name: 'getCSRFToken_returns_undefined_when_no_token', fn: test_getCSRFToken_returns_undefined_when_no_token },
    { name: 'getCSRFToken_from_complex_string', fn: test_getCSRFToken_from_complex_string },
    { name: 'hasCookie_returns_true_when_exists', fn: test_hasCookie_returns_true_when_exists },
    { name: 'hasCookie_returns_false_when_not_exists', fn: test_hasCookie_returns_false_when_not_exists },
    { name: 'hasCookie_checks_multiple_correctly', fn: test_hasCookie_checks_multiple_correctly },
    { name: 'empty_cookie_string_handling', fn: test_empty_cookie_string_handling },
    { name: 'cookie_names_with_hyphens', fn: test_cookie_names_with_hyphens },
  ];

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          Auth Cookie Utilities - Test Results              ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  tests.forEach(({ name, fn }) => {
    const result = fn();
    const isPassed = result === 'PASS';
    
    console.log(`${isPassed ? '✓' : '✗'} ${name}`);
    if (!isPassed) {
      console.log(`  └─ ${result}`);
      failed++;
    } else {
      passed++;
    }
  });

  console.log(`\n╔════════════════════════════════════════════════════════════╗`);
  console.log(`║ Total: ${tests.length} | Passed: ${passed} | Failed: ${failed}${' '.repeat(17 - (tests.length + passed + failed).toString().length)}║`);
  console.log(`╚════════════════════════════════════════════════════════════╝\n`);

  return { total: tests.length, passed, failed };
}


# Problemas con las cookies que se eliminan 

Estos problemas ocurren tanto en desarrollo como en produccion.

Estas son las cookies que se guardan cuando se inicia sesion: ARRAffinity	b4a4b2794e5f902b523525488d514c793d9be6bf1025b99101f930560de537d9	.webapidictionary.azurewebsites.net	/	Session	75	✓	✓				Medium
ARRAffinitySameSite	b4a4b2794e5f902b523525488d514c793d9be6bf1025b99101f930560de537d9	.webapidictionary.azurewebsites.net	/	Session	83	✓	✓	None			Medium
refreshToken	45Fi6QdK6f4PBmEHM9BGsjiLOhUiCm8yIcg5sCBsZYXjFah3g7BlPGt1VqttVOF0KEGosQWT%2Bmf6EgYWJhhINA%3D%3D	webapidictionary.azurewebsites.net	/	2025-10-24T21:32:49.506Z	106	✓	✓	None			Medium
XSRF-TOKEN	25bde8551a3b465bba888a6b29118241	webapidictionary.azurewebsites.net	/	2025-10-24T21:32:49.506Z	42		✓	None			Medium

Pero al recargar la pagina parece que son los datos de zustand los que no persisten, ademas de que no se logra recuperar la informacion del usuario.

## Consola al iniciar sesion y realizar acciones
authFetch.ts:30 ⚠️ No access token available for authenticated request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:30
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
fetchCategories @ useTermsStore.ts:292
(anonymous) @ useTerms.ts:29
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18567
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
commitHookEffectListMount @ react-dom_client.js?v=decc19d6:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=decc19d6:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11066
flushPassiveEffects @ react-dom_client.js?v=decc19d6:13150
flushPendingEffects @ react-dom_client.js?v=decc19d6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
flushSpawnedWork @ react-dom_client.js?v=decc19d6:13067
commitRoot @ react-dom_client.js?v=decc19d6:12804
commitRootWhenReady @ react-dom_client.js?v=decc19d6:12016
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<TermOfTheDay>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
Home @ home.tsx:249
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<Home>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:794
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
createRouter @ chunk-SSCKU5DC.js?v=decc19d6:1334
createHydratedRouter @ react-router_dom.js?v=decc19d6:125
HydratedRouter @ react-router_dom.js?v=decc19d6:164
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooks @ react-dom_client.js?v=decc19d6:5654
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<HydratedRouter>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
(anonymous) @ entry.client.tsx:8
exports.startTransition @ chunk-KSRSB2NJ.js?v=decc19d6:877
(anonymous) @ entry.client.tsx:5
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:30 ⚠️ No access token available for authenticated request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:30
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
fetchTerms @ useTermsStore.ts:184
(anonymous) @ useTerms.ts:34
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18567
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
commitHookEffectListMount @ react-dom_client.js?v=decc19d6:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=decc19d6:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11066
flushPassiveEffects @ react-dom_client.js?v=decc19d6:13150
flushPendingEffects @ react-dom_client.js?v=decc19d6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
flushSpawnedWork @ react-dom_client.js?v=decc19d6:13067
commitRoot @ react-dom_client.js?v=decc19d6:12804
commitRootWhenReady @ react-dom_client.js?v=decc19d6:12016
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<TermOfTheDay>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
Home @ home.tsx:249
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<Home>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:794
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
createRouter @ chunk-SSCKU5DC.js?v=decc19d6:1334
createHydratedRouter @ react-router_dom.js?v=decc19d6:125
HydratedRouter @ react-router_dom.js?v=decc19d6:164
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooks @ react-dom_client.js?v=decc19d6:5654
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<HydratedRouter>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
(anonymous) @ entry.client.tsx:8
exports.startTransition @ chunk-KSRSB2NJ.js?v=decc19d6:877
(anonymous) @ entry.client.tsx:5
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
useAuthStore.ts:101 ✅ Login successful, checking cookies...
useAuthStore.ts:102 📋 Cookies available: 
useAuthStore.ts:103 🛡️ CSRF Token: undefined
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:42 ⚠️ No CSRF token available for mutation request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:42
authFetch @ authFetch.ts:61
removeTerm @ useTermsStore.ts:269
handleDelete @ term.tsx:44
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<button>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
_c @ button.tsx:45
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateForwardRef @ react-dom_client.js?v=decc19d6:7198
beginWork @ react-dom_client.js?v=decc19d6:8735
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<Button>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
TermDetail @ term.tsx:144
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<TermDetail>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:51 📡 DELETE https://webapidictionary.azurewebsites.net/api/term/dc2e5117-454e-4902-8728-6796aea7eb36
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:42 ⚠️ No CSRF token available for mutation request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:42
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
editTerm @ useTermsStore.ts:239
onSubmit @ edit-term.tsx:143
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
EditTerm @ edit-term.tsx:215
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<EditTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:4180
await in (anonymous)
loadLazyRouteProperty @ chunk-SSCKU5DC.js?v=decc19d6:4189
loadLazyRoute @ chunk-SSCKU5DC.js?v=decc19d6:4266
getDataStrategyMatchLazyPromises @ chunk-SSCKU5DC.js?v=decc19d6:4445
getDataStrategyMatch @ chunk-SSCKU5DC.js?v=decc19d6:4460
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:3898
getMatchesToLoad @ chunk-SSCKU5DC.js?v=decc19d6:3879
handleLoaders @ chunk-SSCKU5DC.js?v=decc19d6:2071
await in handleLoaders
startNavigation @ chunk-SSCKU5DC.js?v=decc19d6:1855
navigate @ chunk-SSCKU5DC.js?v=decc19d6:1719
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:5917
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:9901
handleClick @ chunk-SSCKU5DC.js?v=decc19d6:9674
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<a>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
LinkWithRef @ chunk-SSCKU5DC.js?v=decc19d6:9679
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateForwardRef @ react-dom_client.js?v=decc19d6:7198
beginWork @ react-dom_client.js?v=decc19d6:8735
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<Link>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
TermDetail @ term.tsx:138
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<TermDetail>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:51 📡 PUT https://webapidictionary.azurewebsites.net/api/term/my/ebfa2af3-28c8-48c6-a946-fd03ab758a45
authFetch.ts:53  PUT https://webapidictionary.azurewebsites.net/api/term/my/ebfa2af3-28c8-48c6-a946-fd03ab758a45 400 (Bad Request)
makeRequest @ authFetch.ts:53
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
editTerm @ useTermsStore.ts:239
onSubmit @ edit-term.tsx:143
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
EditTerm @ edit-term.tsx:215
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<EditTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:4180
await in (anonymous)
loadLazyRouteProperty @ chunk-SSCKU5DC.js?v=decc19d6:4189
loadLazyRoute @ chunk-SSCKU5DC.js?v=decc19d6:4266
getDataStrategyMatchLazyPromises @ chunk-SSCKU5DC.js?v=decc19d6:4445
getDataStrategyMatch @ chunk-SSCKU5DC.js?v=decc19d6:4460
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:3898
getMatchesToLoad @ chunk-SSCKU5DC.js?v=decc19d6:3879
handleLoaders @ chunk-SSCKU5DC.js?v=decc19d6:2071
await in handleLoaders
startNavigation @ chunk-SSCKU5DC.js?v=decc19d6:1855
navigate @ chunk-SSCKU5DC.js?v=decc19d6:1719
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:5917
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:9901
handleClick @ chunk-SSCKU5DC.js?v=decc19d6:9674
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<a>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
LinkWithRef @ chunk-SSCKU5DC.js?v=decc19d6:9679
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateForwardRef @ react-dom_client.js?v=decc19d6:7198
beginWork @ react-dom_client.js?v=decc19d6:8735
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<Link>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
TermDetail @ term.tsx:138
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<TermDetail>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:65 ✅ Request successful: 400
authFetch.ts:122 ❌ API Error: {url: '/api/term/my/ebfa2af3-28c8-48c6-a946-fd03ab758a45', status: 400, statusText: 'Bad Request', error: {…}}
overrideMethod @ hook.js:608
authFetchJSON @ authFetch.ts:122
await in authFetchJSON
editTerm @ useTermsStore.ts:239
onSubmit @ edit-term.tsx:143
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
EditTerm @ edit-term.tsx:215
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<EditTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:4180
await in (anonymous)
loadLazyRouteProperty @ chunk-SSCKU5DC.js?v=decc19d6:4189
loadLazyRoute @ chunk-SSCKU5DC.js?v=decc19d6:4266
getDataStrategyMatchLazyPromises @ chunk-SSCKU5DC.js?v=decc19d6:4445
getDataStrategyMatch @ chunk-SSCKU5DC.js?v=decc19d6:4460
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:3898
getMatchesToLoad @ chunk-SSCKU5DC.js?v=decc19d6:3879
handleLoaders @ chunk-SSCKU5DC.js?v=decc19d6:2071
await in handleLoaders
startNavigation @ chunk-SSCKU5DC.js?v=decc19d6:1855
navigate @ chunk-SSCKU5DC.js?v=decc19d6:1719
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:5917
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:9901
handleClick @ chunk-SSCKU5DC.js?v=decc19d6:9674
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<a>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
LinkWithRef @ chunk-SSCKU5DC.js?v=decc19d6:9679
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateForwardRef @ react-dom_client.js?v=decc19d6:7198
beginWork @ react-dom_client.js?v=decc19d6:8735
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<Link>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
TermDetail @ term.tsx:138
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<TermDetail>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
edit-term.tsx:148 Failed to edit term: null
overrideMethod @ hook.js:608
onSubmit @ edit-term.tsx:148
await in onSubmit
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
EditTerm @ edit-term.tsx:215
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<EditTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:4180
await in (anonymous)
loadLazyRouteProperty @ chunk-SSCKU5DC.js?v=decc19d6:4189
loadLazyRoute @ chunk-SSCKU5DC.js?v=decc19d6:4266
getDataStrategyMatchLazyPromises @ chunk-SSCKU5DC.js?v=decc19d6:4445
getDataStrategyMatch @ chunk-SSCKU5DC.js?v=decc19d6:4460
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:3898
getMatchesToLoad @ chunk-SSCKU5DC.js?v=decc19d6:3879
handleLoaders @ chunk-SSCKU5DC.js?v=decc19d6:2071
await in handleLoaders
startNavigation @ chunk-SSCKU5DC.js?v=decc19d6:1855
navigate @ chunk-SSCKU5DC.js?v=decc19d6:1719
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:5917
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:9901
handleClick @ chunk-SSCKU5DC.js?v=decc19d6:9674
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<a>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
LinkWithRef @ chunk-SSCKU5DC.js?v=decc19d6:9679
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateForwardRef @ react-dom_client.js?v=decc19d6:7198
beginWork @ react-dom_client.js?v=decc19d6:8735
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<Link>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
TermDetail @ term.tsx:138
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopSync @ react-dom_client.js?v=decc19d6:12424
renderRootSync @ react-dom_client.js?v=decc19d6:12408
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13517
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
processRootScheduleInMicrotask @ react-dom_client.js?v=decc19d6:13437
(anonymous) @ react-dom_client.js?v=decc19d6:13531
<TermDetail>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:28 🔑 Adding access token to request
authFetch.ts:42 ⚠️ No CSRF token available for mutation request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:42
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
createTerm @ useTermsStore.ts:210
onSubmit @ create-term.tsx:121
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
CreateTerm @ create-term.tsx:155
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<CreateTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:51 📡 POST https://webapidictionary.azurewebsites.net/api/term
authFetch.ts:53  POST https://webapidictionary.azurewebsites.net/api/term 400 (Bad Request)
makeRequest @ authFetch.ts:53
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
createTerm @ useTermsStore.ts:210
onSubmit @ create-term.tsx:121
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
CreateTerm @ create-term.tsx:155
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<CreateTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
authFetch.ts:65 ✅ Request successful: 400
authFetch.ts:122 ❌ API Error: {url: '/api/term', status: 400, statusText: 'Bad Request', error: {…}}error: {message: 'Error creating term'}status: 400statusText: "Bad Request"url: "/api/term"[[Prototype]]: Object
overrideMethod @ hook.js:608
authFetchJSON @ authFetch.ts:122
await in authFetchJSON
createTerm @ useTermsStore.ts:210
onSubmit @ create-term.tsx:121
(anonymous) @ chunk-UFTLKMAG.js?v=decc19d6:1531
await in (anonymous)
executeDispatch @ react-dom_client.js?v=decc19d6:13622
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
processDispatchQueue @ react-dom_client.js?v=decc19d6:13658
(anonymous) @ react-dom_client.js?v=decc19d6:14071
batchedUpdates$1 @ react-dom_client.js?v=decc19d6:2626
dispatchEventForPluginEventSystem @ react-dom_client.js?v=decc19d6:13763
dispatchEvent @ react-dom_client.js?v=decc19d6:16784
dispatchDiscreteEvent @ react-dom_client.js?v=decc19d6:16765
<form>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
CreateTerm @ create-term.tsx:155
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<CreateTerm>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36


## Consola cuando se recarga la pagina

authFetch.ts:30 ⚠️ No access token available for authenticated request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:30
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
fetchCategories @ useTermsStore.ts:292
(anonymous) @ useTerms.ts:29
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18567
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
commitHookEffectListMount @ react-dom_client.js?v=decc19d6:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=decc19d6:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11066
flushPassiveEffects @ react-dom_client.js?v=decc19d6:13150
flushPendingEffects @ react-dom_client.js?v=decc19d6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
flushSpawnedWork @ react-dom_client.js?v=decc19d6:13067
commitRoot @ react-dom_client.js?v=decc19d6:12804
commitRootWhenReady @ react-dom_client.js?v=decc19d6:12016
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<TermsPage>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:802
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
createRouter @ chunk-SSCKU5DC.js?v=decc19d6:1334
createHydratedRouter @ react-router_dom.js?v=decc19d6:125
HydratedRouter @ react-router_dom.js?v=decc19d6:164
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooks @ react-dom_client.js?v=decc19d6:5654
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<HydratedRouter>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
(anonymous) @ entry.client.tsx:8
exports.startTransition @ chunk-KSRSB2NJ.js?v=decc19d6:877
(anonymous) @ entry.client.tsx:5
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
authFetch.ts:30 ⚠️ No access token available for authenticated request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:30
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
fetchTerms @ useTermsStore.ts:184
(anonymous) @ useTerms.ts:34
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18567
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
commitHookEffectListMount @ react-dom_client.js?v=decc19d6:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=decc19d6:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11066
flushPassiveEffects @ react-dom_client.js?v=decc19d6:13150
flushPendingEffects @ react-dom_client.js?v=decc19d6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
flushSpawnedWork @ react-dom_client.js?v=decc19d6:13067
commitRoot @ react-dom_client.js?v=decc19d6:12804
commitRootWhenReady @ react-dom_client.js?v=decc19d6:12016
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<TermsPage>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:802
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
createRouter @ chunk-SSCKU5DC.js?v=decc19d6:1334
createHydratedRouter @ react-router_dom.js?v=decc19d6:125
HydratedRouter @ react-router_dom.js?v=decc19d6:164
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooks @ react-dom_client.js?v=decc19d6:5654
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<HydratedRouter>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
(anonymous) @ entry.client.tsx:8
exports.startTransition @ chunk-KSRSB2NJ.js?v=decc19d6:877
(anonymous) @ entry.client.tsx:5
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/paged?page=1&pageSize=9&orderBy=CreatedAt&orderDirection=desc&isApproved=true
authFetch.ts:30 ⚠️ No access token available for authenticated request
overrideMethod @ hook.js:608
makeRequest @ authFetch.ts:30
authFetch @ authFetch.ts:61
authFetchJSON @ authFetch.ts:110
fetchCategories @ useTermsStore.ts:292
(anonymous) @ useTerms.ts:122
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18567
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
commitHookEffectListMount @ react-dom_client.js?v=decc19d6:9411
commitHookPassiveMountEffects @ react-dom_client.js?v=decc19d6:9465
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11040
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11055
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11033
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11201
recursivelyTraversePassiveMountEffects @ react-dom_client.js?v=decc19d6:11010
commitPassiveMountOnFiber @ react-dom_client.js?v=decc19d6:11066
flushPassiveEffects @ react-dom_client.js?v=decc19d6:13150
flushPendingEffects @ react-dom_client.js?v=decc19d6:13088
performSyncWorkOnRoot @ react-dom_client.js?v=decc19d6:13514
flushSyncWorkAcrossRoots_impl @ react-dom_client.js?v=decc19d6:13414
flushSpawnedWork @ react-dom_client.js?v=decc19d6:13067
commitRoot @ react-dom_client.js?v=decc19d6:12804
commitRootWhenReady @ react-dom_client.js?v=decc19d6:12016
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11950
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<TermsPage>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
WithComponentProps2 @ chunk-SSCKU5DC.js?v=decc19d6:6657
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooksAgain @ react-dom_client.js?v=decc19d6:5729
renderWithHooks @ react-dom_client.js?v=decc19d6:5665
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<WithComponentProps2>
exports.createElement @ chunk-KSRSB2NJ.js?v=decc19d6:793
mapRouteProperties @ chunk-SSCKU5DC.js?v=decc19d6:5971
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:802
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
(anonymous) @ chunk-SSCKU5DC.js?v=decc19d6:808
convertRoutesToDataRoutes @ chunk-SSCKU5DC.js?v=decc19d6:780
createRouter @ chunk-SSCKU5DC.js?v=decc19d6:1334
createHydratedRouter @ react-router_dom.js?v=decc19d6:125
HydratedRouter @ react-router_dom.js?v=decc19d6:164
react_stack_bottom_frame @ react-dom_client.js?v=decc19d6:18509
renderWithHooks @ react-dom_client.js?v=decc19d6:5654
updateFunctionComponent @ react-dom_client.js?v=decc19d6:7475
beginWork @ react-dom_client.js?v=decc19d6:8525
runWithFiberInDEV @ react-dom_client.js?v=decc19d6:997
performUnitOfWork @ react-dom_client.js?v=decc19d6:12561
workLoopConcurrentByScheduler @ react-dom_client.js?v=decc19d6:12557
renderRootConcurrent @ react-dom_client.js?v=decc19d6:12539
performWorkOnRoot @ react-dom_client.js?v=decc19d6:11766
performWorkOnRootViaSchedulerTask @ react-dom_client.js?v=decc19d6:13505
performWorkUntilDeadline @ react-dom_client.js?v=decc19d6:36
<HydratedRouter>
exports.jsxDEV @ react_jsx-dev-runtime.js?v=decc19d6:247
(anonymous) @ entry.client.tsx:8
exports.startTransition @ chunk-KSRSB2NJ.js?v=decc19d6:877
(anonymous) @ entry.client.tsx:5
authFetch.ts:51 📡 GET https://webapidictionary.azurewebsites.net/api/term/categories
useAuthStore.ts:376 🔄 Attempting to restore session...
useAuthStore.ts:174 ❌ No CSRF token - cannot refresh
useAuthStore.ts:384 ⚠️ Session restore failed - user may need to login again
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200
authFetch.ts:65 ✅ Request successful: 200

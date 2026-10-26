# Insurance PAS Angular and Spring Boot - local run guide

## Cause and remedy
The Angular frontend originally called http://localhost:8080 directly. Cross-origin browser calls can fail with Angular HttpErrorResponse status 0 if the frontend origin does not match the Spring Boot CORS allowlist. The Angular dev-server now proxies `/api` to `http://localhost:8080` so both login and registration are same-origin from the browser.

## Running locally
1. Start MySQL and run backend `com.pas.PasApplication` using JDK 17 or later (Java 11 does not run Spring Boot 3.3.5).
2. Confirm console shows `Tomcat started on port 8080`.
3. Open CMD in this frontend directory, run `npm install`, then `npx ng serve` or `npm start`.
4. Open the exact localhost URL printed by Angular. It may be 4200 or a different port.
5. If Angular was already running, stop and restart it after changing angular.json (the proxy config is loaded at dev-server start).
6. Hard-refresh the browser (Ctrl+Shift+R), then test customer registration and login.

## Debug
- DevTools > Network should show `/api/v1/auth/login` (relative API URL), **not** `http://localhost:8080/api/v1/auth/login` directly.
- If `/api` produces 502 or ECONNREFUSED in Angular terminal, Spring Boot isn't reachable on 8080.
- If login gives 400 after this, backend is responding; verify credentials.
- In production the Angular dev-server proxy is not used: configure reverse proxy `/api` to backend or use an appropriate deployed API URL with secured CORS.

## Caveat
This fix addresses local browser-to-backend routing; end-to-end tests with a running MySQL + Angular + Spring Boot were not performed here.

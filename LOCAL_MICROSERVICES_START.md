# Insurance PAS Angular — Microservices Local Setup

## Prerequisites
- Node.js supported by Angular 18 (Node 18.19.1+ or 20.11.1+ or 22.x)
- MySQL running; backend modules compiled and running

## Start services in IntelliJ
1. service-registry (8761)
2. identity-service (8081)
3. kyc-service (8082)
4. product-service (8083)
5. quote-service (8084)
6. underwriting-service (8085)
7. policy-service (8086)
8. api-gateway (8080)

Verify the Eureka dashboard at http://localhost:8761 and ensure required instances are UP.

## Start Angular in VS Code
Open this folder (containing package.json and angular.json), then run:

```powershell
npm install
npm start
```

Open http://localhost:4200.

## How requests connect
The frontend makes same-origin requests to `/api/v1/...`.
`angular.json` loads `proxy.conf.json` while running `ng serve`.
The development server forwards `/api` requests to `http://localhost:8080` (API Gateway), which routes registration and login to identity-service via Eureka.

No MySQL username/password is needed in Angular.

## Registration troubleshooting
- `404`: verify Gateway route and Identity controller mapping.
- `502/503` or `ECONNREFUSED`: verify Gateway and Identity service registered UP in Eureka.
- `400`: review submitted values, fields and backend validation error.
- `409`: username/email may already exist.
- `401/403`: inspect backend security configuration and exact API response.
- Port `4200` busy: close other Angular processes rather than silently switching ports because Gateway CORS only permits localhost:4200.
- Restart `npm start` whenever editing the proxy settings.

Customer registration route: `POST /api/v1/auth/register`.

Note: this archive's Angular-to-Gateway wiring was checked statically, not end-to-end tested with your running environment.

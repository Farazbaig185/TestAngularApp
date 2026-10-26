# Insurance PAS — Customer & Admin Angular Portal

Angular 18 frontend designed for the **previously supplied** `insurance-pas-backend-imports-fixed.zip` Spring Boot API.

## What customers see

- Registration and login; dashboard appears after JWT login
- Customer profile
- KYC request and actual Aadhaar/PAN file selection and upload
- Insurance product cards
- Quote request, quote status and policy list/PDF

## What admins see

- Dashboard and customers
- KYC request list, document ID input, document download, verify/reject and final KYC approve/reject
- Product add, list and deactivate
- Quotes approve/reject, underwriting handoff, policy issue
- Underwriting review, policy status actions, user lock/unlock

All routes are invoked by UI buttons and forms; **there is no API Explorer in the app**.

## Run

1. Extract ZIP and open `insurance-pas-angular-frontend` folder.
2. In CMD or terminal: `npm install`, then `npm start`.
3. Visit http://localhost:4200.
4. Start the separately supplied Java/MySQL backend on port 8080.

> The project requires a running backend. Angular packages were unavailable in this execution environment, so `ng build` and end-to-end tests could not be completed here. The earlier frontend compiled on the user's machine, but this revised version has not been compiled there yet.

## Known integration blockers / unfinished functionality

1. **KYC document listing**: Existing backend does not expose `GET /api/v1/kyc/{id}/documents`. Admin must enter document IDs from upload confirmations. Uploaded IDs are stored in the customer's browser only. This is unsuitable for a real public website. Add a secured document-list endpoint server-side and fetch it in the admin review page.
2. **KYC status lookup for returning customers**: Backend has no `GET /api/v1/kyc/by-customer/{id}`. Frontend stores customer's KYC ID in the browser and also allows entering the ID. On another device, the customer needs the ID.
3. **Sensitive data isolation**: Existing backend may return all policy records in `GET /api/v1/policies`. The frontend filters what it displays but that **does not secure the underlying API**. Backend must enforce customer ownership for every customer record, quote, document and policy request before any public deployment.
4. **Payments, claim processing, OTP, real CKYC/Aadhaar/PAN verification, external services** are not implemented here. Review/verification is manual.
5. The backend has not been compiled or end-to-end tested in this environment. This is a functioning UI implementation *attempt*, **not a certified complete production website**.
6. Product coverage/riders and several extended BRD endpoints do not yet have full consumer-facing screens.
7. Underwriting rejection requires the reason input; underwriting case creation is available from the admin Quotes table.

## API mapping

- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`
- `GET /api/v1/customers`
- `POST /api/v1/kyc`, `GET /api/v1/kyc/{id}`
- `POST /api/v1/kyc/documents` with `multipart/form-data` (`kycId`, `documentType`, `documentNumber`, `file`)
- `GET /api/v1/kyc`, `GET /api/v1/kyc/documents/{id}/download`, `PUT .../verify`, `PUT .../reject`
- `PUT /api/v1/kyc/{id}/approve`, `PUT .../reject`, `PUT .../resubmit`
- `GET /api/v1/products`, `POST /api/v1/products`, `DELETE /api/v1/products/{id}`
- `POST /api/v1/quotes`, `GET /api/v1/quotes`, `PUT /api/v1/quotes/{id}/approve|reject|convert`
- `POST /api/v1/underwriting`, `GET /api/v1/underwriting`, `PUT /api/v1/underwriting/{id}/approve|reject`
- `GET /api/v1/policies`, `PUT /api/v1/policies/{id}/activate|suspend|cancel`, `GET /api/v1/policies/{id}/document`
- `GET /api/v1/users`, `PUT /api/v1/users/{id}/lock|unlock`

Do not enter real Aadhaar/PAN numbers or upload sensitive real files in an untested development deployment.

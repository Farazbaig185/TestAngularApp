# Repair package notes (2026-10-26)

These archives update the user-provided project; they are **not certified as end-to-end tested**. The supplied BRD was not present in this upload, so exact BRD alignment must still be checked against it.

## Changes
- KYC frontend only considers submission completed once both Aadhaar and PAN have active document records. It refreshes status from the server and clears selected files and numbers after upload.
- Admin/reviewer document action refreshes review and list. Customer listing now permits authenticated staff roles for display during review.
- Document verification/rejection now rejects attempts after the parent KYC is no longer under review; KYC rejection also checks its state.
- Quote actions are limited in the UI to pending quotes; underwriting initiation requires quote approval; policy conversion button requires underwriting approval.
- Underwriting assessment notes now have an editable UI, wired to existing medical/financial backend endpoints. Staff API load failures are shown instead of silently ignored.

## Setup
Backend: MySQL must be running with the credentials set using DB_URL, DB_USER, DB_PASSWORD. Use Java 17+ and Maven 3.9+ to run `mvn spring-boot:run` in `backend`. Defaults and JWT secrets in application.properties are **local development only**; override JWT_SECRET and ADMIN_PASSWORD. Keep `private-kyc-uploads` persistent and private, or set `-Dpas.kyc.upload.dir=/absolute/private/path`.

Frontend: Run `npm install` then `npm start` inside `insurance-pas-angular-frontend`; Angular 18 CLI/build packages are needed. Frontend proxy `/api` forwards to `http://localhost:8080`. Access `http://localhost:4200`. If you changed access control settings, sign out and log in again with a fresh token.

## Manual acceptance sequence
1. Register/login customer, open My KYC, Start KYC, select legitimate PDF/JPG/PNG Aadhaar and PAN (<=5 MB each), input 12-digit Aadhaar and PAN format `ABCDE1234F`, submit.
2. Log in as admin in another browser session; open KYC Review and verify both documents, then approve KYC. Rejecting a request requires an entered reason. Customer should see updated status on reload.
3. Customer selects active product and creates quote; admin approves quote and sends to underwriting. In Underwriting, save medical/financial notes and approve case, then return to Quotes and issue policy; verify policy on customer and admin screens.

## Verification limits
Automated compilation and full MySQL-backed/browser end-to-end execution were not possible in this execution environment: Maven is absent and npm offline cache lacked Angular packages. Treat above as required acceptance tests, not as passed tests.

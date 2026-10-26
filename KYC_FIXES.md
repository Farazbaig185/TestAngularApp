# KYC workflow changes
- Customer: auto IDs, submit both Aadhaar/PAN together once, then wait for review.
- Rejected: show Update & Resubmit Both Documents.
- Admin: select KYC to list documents with Download, Verify and Reject controls; no manual IDs.
- Existing Angular proxy retained. Run `npm install` and `npx ng serve --proxy-config proxy.conf.json`.
- Check browser Network tab if upload still returns 403; JWT warnings are now logged by backend.
- Live integration test not performed.

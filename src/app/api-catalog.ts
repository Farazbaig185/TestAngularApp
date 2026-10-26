export interface Endpoint { method: string; path: string; controller: string; bodyType: string; upload: boolean; download: boolean; }
export const ENDPOINTS: Endpoint[] = [
  {
    "method": "POST",
    "path": "/api/v1/roles",
    "controller": "AccessManagementController",
    "bodyType": "Role",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/roles",
    "controller": "AccessManagementController",
    "bodyType": "Permission",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/permissions",
    "controller": "AccessManagementController",
    "bodyType": "Permission",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/roles/{id}/permissions",
    "controller": "AccessManagementController",
    "bodyType": "List<Long>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/audit-logs",
    "controller": "AuditLogController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/audit-logs/{id}",
    "controller": "AuditLogController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/register",
    "controller": "AuthController",
    "bodyType": "Register",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/customers",
    "controller": "CustomerController",
    "bodyType": "Customer",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/customers",
    "controller": "CustomerController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/customers/search",
    "controller": "CustomerController",
    "bodyType": "Customer",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/customers/{id}",
    "controller": "CustomerController",
    "bodyType": "Customer",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/customers/{id}",
    "controller": "CustomerController",
    "bodyType": "Customer",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/customers/{id}",
    "controller": "CustomerController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/kyc",
    "controller": "KycController",
    "bodyType": "Kyc",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/kyc",
    "controller": "KycController",
    "bodyType": "Kyc",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/kyc/{id}",
    "controller": "KycController",
    "bodyType": "Kyc",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/{id}",
    "controller": "KycController",
    "bodyType": "Kyc",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/kyc/{id}",
    "controller": "KycController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/kyc/documents/{id}/download",
    "controller": "KycController",
    "bodyType": "",
    "upload": false,
    "download": true
  },
  {
    "method": "GET",
    "path": "/api/v1/kyc/documents/{id}",
    "controller": "KycController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/documents/{id}/verify",
    "controller": "KycController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/documents/{id}/reject",
    "controller": "KycController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/{id}/approve",
    "controller": "KycController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/{id}/reject",
    "controller": "KycController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/kyc/{id}/resubmit",
    "controller": "KycController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/kyc/documents",
    "controller": "KycController",
    "bodyType": "",
    "upload": true,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/masters",
    "controller": "MasterDataController",
    "bodyType": "Master",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/masters",
    "controller": "MasterDataController",
    "bodyType": "Master",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/masters/{id}",
    "controller": "MasterDataController",
    "bodyType": "Master",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/branches",
    "controller": "OrganisationController",
    "bodyType": "Branch",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/branches",
    "controller": "OrganisationController",
    "bodyType": "Department",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/departments",
    "controller": "OrganisationController",
    "bodyType": "Department",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/departments",
    "controller": "OrganisationController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/quotes/{id}/convert",
    "controller": "PolicyIssuanceController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/policies",
    "controller": "PolicyManagementController",
    "bodyType": "Policy",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies",
    "controller": "PolicyManagementController",
    "bodyType": "Policy",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}",
    "controller": "PolicyManagementController",
    "bodyType": "Policy",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/policies/{id}",
    "controller": "PolicyManagementController",
    "bodyType": "Policy",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/policies/{id}",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/policies/{id}/activate",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/policies/{id}/suspend",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/policies/{id}/cancel",
    "controller": "PolicyManagementController",
    "bodyType": "Endorsement",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/policies/{id}/expire",
    "controller": "PolicyManagementController",
    "bodyType": "Endorsement",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/policies/{id}/endorsements",
    "controller": "PolicyManagementController",
    "bodyType": "Endorsement",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}/endorsements",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/endorsements/{id}/approve",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/endorsements/{id}/reject",
    "controller": "PolicyManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}/history",
    "controller": "PolicyManagementController",
    "bodyType": "Coverage",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}/coverages",
    "controller": "PolicyManagementController",
    "bodyType": "Coverage",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/policies/{id}/coverages",
    "controller": "PolicyManagementController",
    "bodyType": "Coverage",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}/riders",
    "controller": "PolicyManagementController",
    "bodyType": "Rider",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/policies/{id}/riders",
    "controller": "PolicyManagementController",
    "bodyType": "Rider",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/policies/{id}/document",
    "controller": "PolicyPdfController",
    "bodyType": "",
    "upload": false,
    "download": true
  },
  {
    "method": "POST",
    "path": "/api/v1/policies/{id}/document/regenerate",
    "controller": "PolicyPdfController",
    "bodyType": "",
    "upload": false,
    "download": true
  },
  {
    "method": "POST",
    "path": "/api/v1/products",
    "controller": "ProductController",
    "bodyType": "Product",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/products",
    "controller": "ProductController",
    "bodyType": "Product",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/products/{id}",
    "controller": "ProductController",
    "bodyType": "Product",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/products/{id}",
    "controller": "ProductController",
    "bodyType": "Product",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/products/{id}",
    "controller": "ProductController",
    "bodyType": "ProductCategory",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/product-categories",
    "controller": "ProductController",
    "bodyType": "ProductCategory",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/product-categories",
    "controller": "ProductController",
    "bodyType": "ProductCategory",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/product-categories/{id}",
    "controller": "ProductController",
    "bodyType": "ProductCategory",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/product-categories/{id}",
    "controller": "ProductController",
    "bodyType": "ProductCoverage",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/products/{id}/coverages",
    "controller": "ProductController",
    "bodyType": "ProductCoverage",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/products/{id}/coverages",
    "controller": "ProductController",
    "bodyType": "ProductRider",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/coverages/{id}",
    "controller": "ProductController",
    "bodyType": "ProductRider",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/products/{id}/riders",
    "controller": "ProductController",
    "bodyType": "ProductRider",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/products/{id}/riders",
    "controller": "ProductController",
    "bodyType": "ProductRider",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/riders/{id}",
    "controller": "ProductController",
    "bodyType": "ProductRider",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/riders/{id}",
    "controller": "ProductController",
    "bodyType": "Benefit",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/products/{id}/benefits",
    "controller": "ProductController",
    "bodyType": "Benefit",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/products/{id}/benefits",
    "controller": "ProductController",
    "bodyType": "Benefit",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/benefits/{id}",
    "controller": "ProductController",
    "bodyType": "Benefit",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/benefits/{id}",
    "controller": "ProductController",
    "bodyType": "ProductCoverage",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/coverages/{id}",
    "controller": "ProductController",
    "bodyType": "ProductCoverage",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/quotes/calculate-premium",
    "controller": "QuoteController",
    "bodyType": "Map<String,Long>",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/quotes",
    "controller": "QuoteController",
    "bodyType": "Quote",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/quotes",
    "controller": "QuoteController",
    "bodyType": "Quote",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/quotes/{id}",
    "controller": "QuoteController",
    "bodyType": "Quote",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/quotes/{id}",
    "controller": "QuoteController",
    "bodyType": "Quote",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/quotes/{id}",
    "controller": "QuoteController",
    "bodyType": "Risk",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/quotes/{id}/premium",
    "controller": "QuoteController",
    "bodyType": "Risk",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/risk-assessment",
    "controller": "QuoteController",
    "bodyType": "Risk",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/risk-assessment/{quoteId}",
    "controller": "QuoteController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/quotes/{id}/approve",
    "controller": "QuoteController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/quotes/{id}/reject",
    "controller": "QuoteController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/login",
    "controller": "SessionController",
    "bodyType": "Login",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/refresh-token",
    "controller": "SessionController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/change-password",
    "controller": "SessionController",
    "bodyType": "Change",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/forgot-password",
    "controller": "SessionController",
    "bodyType": "Email",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/reset-password",
    "controller": "SessionController",
    "bodyType": "Reset",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/auth/logout",
    "controller": "SessionController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/underwriting",
    "controller": "UnderwritingController",
    "bodyType": "Underwriting",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/underwriting",
    "controller": "UnderwritingController",
    "bodyType": "Underwriting",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/underwriting/{id}",
    "controller": "UnderwritingController",
    "bodyType": "Underwriting",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}",
    "controller": "UnderwritingController",
    "bodyType": "Underwriting",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/underwriting/{id}/medical",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}/medical",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/underwriting/{id}/medical",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/underwriting/{id}/financial",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}/financial",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/underwriting/{id}/financial",
    "controller": "UnderwritingController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}/approve",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}/reject",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/underwriting/{id}/loading",
    "controller": "UnderwritingController",
    "bodyType": "Map<String,BigDecimal>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/underwriting/{id}/decision",
    "controller": "UnderwritingController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "POST",
    "path": "/api/v1/users",
    "controller": "UserManagementController",
    "bodyType": "Map<String,Object>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/users",
    "controller": "UserManagementController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "GET",
    "path": "/api/v1/users/{id}",
    "controller": "UserManagementController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/users/{id}",
    "controller": "UserManagementController",
    "bodyType": "Map<String,String>",
    "upload": false,
    "download": false
  },
  {
    "method": "DELETE",
    "path": "/api/v1/users/{id}",
    "controller": "UserManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/users/{id}/lock",
    "controller": "UserManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  },
  {
    "method": "PUT",
    "path": "/api/v1/users/{id}/unlock",
    "controller": "UserManagementController",
    "bodyType": "",
    "upload": false,
    "download": false
  }
];
export const ENTITY_FIELDS: Record<string,string[]> = {
  "Underwriting": [
    "quoteId",
    "status",
    "reviewedBy",
    "reviewedAt",
    "medicalDetails",
    "financialDetails",
    "loadingPercentage"
  ],
  "Customer": [
    "customerCode",
    "userId",
    "firstName",
    "middleName",
    "lastName",
    "gender",
    "maritalStatus",
    "mobileNumber",
    "email",
    "occupation",
    "status",
    "dateOfBirth",
    "annualIncome"
  ],
  "KycDoc": [
    "kycId",
    "documentType",
    "documentNumber",
    "filePath",
    "verificationStatus",
    "uploadDate"
  ],
  "Kyc": [
    "customerId",
    "kycNumber",
    "verificationStatus",
    "verifiedBy",
    "verifiedDate",
    "kycDate"
  ],
  "Risk": [
    "quoteId",
    "riskCategory",
    "loadingPercentage"
  ],
  "Branch": [
    "branchCode",
    "branchName",
    "city",
    "state",
    "address",
    "managerId"
  ],
  "Policy": [
    "policyNumber",
    "quoteId",
    "customerId",
    "productId",
    "issueDate",
    "effectiveDate",
    "expiryDate",
    "policyStatus"
  ],
  "Audit": [
    "userId",
    "moduleName",
    "action",
    "ipAddress",
    "oldValue",
    "newValue",
    "actionTime"
  ],
  "ProductRider": [
    "productId",
    "riderName",
    "riderPremium"
  ],
  "Rider": [
    "policyId",
    "riderId",
    "riderPremium"
  ],
  "Master": [
    "masterType",
    "masterValue",
    "status"
  ],
  "PasswordReset": [
    "tokenHash",
    "userId",
    "expiresAt",
    "used"
  ],
  "Role": [
    "roleName",
    "description"
  ],
  "Endorsement": [
    "policyId",
    "endorsementType",
    "oldValue",
    "newValue",
    "approvedBy",
    "endorsementDate",
    "status"
  ],
  "PolicyDocument": [
    "policyId",
    "fileName",
    "filePath",
    "generatedDate"
  ],
  "ProductCategory": [
    "categoryName",
    "status"
  ],
  "Department": [
    "departmentName",
    "description"
  ],
  "User": [
    "username",
    "passwordHash",
    "email",
    "mobile",
    "role",
    "branchId",
    "employeeId"
  ],
  "Product": [
    "productCode",
    "productName",
    "productType",
    "description",
    "status",
    "minAge",
    "basePremium"
  ],
  "Permission": [
    "permissionName",
    "moduleName",
    "actionType"
  ],
  "Coverage": [
    "policyId",
    "coverageName",
    "sumInsured",
    "coverageStartDate",
    "coverageEndDate"
  ],
  "Benefit": [
    "productId",
    "benefitName",
    "description"
  ],
  "Quote": [
    "quoteNumber",
    "customerId",
    "productId",
    "status",
    "premiumAmount",
    "createdAt"
  ],
  "PolicyHistory": [
    "policyId",
    "action",
    "remarks",
    "performedBy",
    "actionDate"
  ],
  "RolePermission": [
    "roleId",
    "permissionId"
  ],
  "RevokedToken": [
    "tokenId",
    "expiry"
  ],
  "ProductCoverage": [
    "productId",
    "coverageName",
    "coverageAmount"
  ]
};

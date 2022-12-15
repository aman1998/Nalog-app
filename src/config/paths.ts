export enum paths {
  HOME = "/",
  AUTH_OAUTH_GET_CODE = "/auth/oauth/get-code",
  AUTH_OAUTH_CALLBACK = "/auth/oauth/callback",
  SIGN_IN = "/login",
  SIGN_UP = "/registration",
  FORGOT = "/reset-password",
  CONFIRM_EMAIL = "/confirm-email",
  PROFILE = "/profile",
  ASSETS = "/assets",
  TRANSACTIONS = "/transactions",
  SINGLE_ASSET = "/assets/:id",
  SETTINGS = "/settings",
  SETTINGS_SAFETY = "/settings/safety",
  SETTINGS_SERVICES = "/settings/services",
  SETTINGS_REPORTS = "/settings/reports",
  SETTINGS_OTHER = "/settings/other",
  SETTINGS_PLAN_AND_PAYMENTS = "/settings/plan-and-payment",
  REPORTS = "/reports",
  DOCUMENTS = "/documents",
  DOCUMENTS_OLD = "/documents-old",
  REPORT_CONSTRUCTOR = "/documents/tax-report",
  SINGLE_REPORT = "/documents/tax-report/:id",
  SINGLE_REPORT_OPERATIONS = "/documents/tax-report/:id/operations",
  DOCUMENTS_CREATE_TRANSACTION_EXPORT = "/documents/transaction-export",
  DOCUMENTS_TRANSACTION_EXPORT = "/documents/transaction-export/:id",
  DOCUMENTS_CREATE_SOURCES_EXPORT = "/documents/sources-export",
  DOCUMENTS_SOURCES_EXPORT = "/documents/sources-export/:id",
  PRICING = "/pricing"
}
export const getAssetsSinglePath = (id: string): string => `/assets/${id}`;
export const getReportSinglePath = (id: string): string => `${paths.REPORT_CONSTRUCTOR}/${id}`;
export const getReportOperationsPath = (id: string): string => `${paths.REPORT_CONSTRUCTOR}/${id}/operations`;
export const getDocumentTransactionExportPage = (id: string): string =>
  paths.DOCUMENTS_TRANSACTION_EXPORT.replace(":id", id);
export const getDocumentSourcesExportPage = (id: string): string =>
  paths.DOCUMENTS_SOURCES_EXPORT.replace(":id", id);
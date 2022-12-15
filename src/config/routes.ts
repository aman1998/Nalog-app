import React, { FC } from "react";

import SignInPage from "pages/auth/signIn";
import SignUpPage from "pages/auth/signup";
import ForgotPage from "pages/auth/forgot";
import EmailConfirmPage from "pages/auth/confirm-email";

import OAuthGetCodePage from "../pages/auth/oauth/get-code";
import OAuthCallbackPage from "../pages/auth/oauth/callback";

import { paths } from "./paths";

// Routes
export const HomePage = React.lazy(() => import("pages/home"));
export const DashboardPage = React.lazy(() => import("pages/dashboard"));
export const ProfilePage = React.lazy(() => import("pages/profile"));
export const AssetsPage = React.lazy(() => import("pages/assets"));
export const SingleAssetsPage = React.lazy(() => import("pages/assets/singleAsset"));
export const SettingsPage = React.lazy(() => import("pages/settings"));
export const SettingsSafetyPage = React.lazy(() => import("pages/settings/safety"));
export const SettingsServicesPage = React.lazy(() => import("pages/settings/services"));
export const SettingsOtherPage = React.lazy(() => import("pages/settings/other"));
export const SettingsPlanAndPayment = React.lazy(() => import("pages/settings/plan-and-payment"));
export const SettingsReportsPage = React.lazy(() => import("pages/settings/reports"));
export const TransactionsPage = React.lazy(() => import("pages/transactions"));
export const ReportPage = React.lazy(() => import("pages/documents"));
export const ReportsCreatePage = React.lazy(() => import("pages/documents/ReportCreate"));
export const SingleReport = React.lazy(() => import("pages/documents/SingleReport"));
export const SingleReportOperationsPage = React.lazy(() => import("pages/documents/SingleReportOperations"));
export const DocumentsOldPage = React.lazy(() => import("pages/documents/DocumentsOld"));
export const DocumentsCreateTransactionExportPage =
  React.lazy(() => import("pages/documents/create-transaction-export"));
export const DocumentsCreateSourcesExportPage =
  React.lazy(() => import("pages/documents/create-sources-export"));
export const DocumentsSingleTransactionExportPage =
  React.lazy(() => import("pages/documents/single-transaction-export"));
export const DocumentsSingleSourcesExportPage =
  React.lazy(() => import("pages/documents/single-sources-export"));
export const PricingPage =
  React.lazy(() => import("pages/pricing"));

export type TRoutes = {
  path?: string;
  component: FC;
  active: boolean;
};

export const privateRoutes: TRoutes[] = [
  { path: paths.HOME, component: DashboardPage, active: true },
  { path: paths.PROFILE, component: ProfilePage, active: true },
  { path: paths.TRANSACTIONS, component: TransactionsPage, active: true },
  { path: paths.ASSETS, component: AssetsPage, active: true },
  { path: paths.SINGLE_ASSET, component: SingleAssetsPage, active: true },
  { path: paths.SETTINGS, component: SettingsPage, active: true },
  { path: paths.SETTINGS_SAFETY, component: SettingsSafetyPage, active: true },
  {
    path: paths.SETTINGS_SERVICES,
    component: SettingsServicesPage,
    active: process.env.REACT_APP_SERVICES_DISABLED !== "true"
  },
  { path: paths.SETTINGS_PLAN_AND_PAYMENTS, component: SettingsPlanAndPayment, active: true },
  { path: paths.SETTINGS_REPORTS, component: SettingsReportsPage, active: false },
  { path: paths.SETTINGS_OTHER, component: SettingsOtherPage, active: false },
  { path: paths.CONFIRM_EMAIL, component: EmailConfirmPage, active: true },
  { path: paths.DOCUMENTS_CREATE_TRANSACTION_EXPORT, component: DocumentsCreateTransactionExportPage, active: true },
  {
    path: paths.DOCUMENTS_TRANSACTION_EXPORT,
    component: DocumentsSingleTransactionExportPage,
    active: true
  },
  { path: paths.DOCUMENTS_CREATE_SOURCES_EXPORT, component: DocumentsCreateSourcesExportPage, active: true },
  {
    path: paths.DOCUMENTS_SOURCES_EXPORT,
    component: DocumentsSingleSourcesExportPage,
    active: true
  },
  { path: paths.DOCUMENTS, component: ReportPage, active: process.env.REACT_APP_DOCUMENTS_DISABLED !== "true" },
  {
    path: paths.DOCUMENTS_OLD,
    component: DocumentsOldPage,
    active: process.env.REACT_APP_DOCUMENTS_DISABLED !== "true"
  },
  { path: paths.REPORT_CONSTRUCTOR, component: ReportsCreatePage, active: true },
  { path: paths.SINGLE_REPORT, component: SingleReport, active: true },
  {
    path: paths.SINGLE_REPORT_OPERATIONS,
    component: SingleReportOperationsPage,
    active: true
  },
  {
    path: paths.PRICING,
    component: PricingPage,
    active: true
  },
];

export const authRoutes: TRoutes[] = [
  { path: paths.AUTH_OAUTH_GET_CODE, component: OAuthGetCodePage, active: true },
  { path: paths.AUTH_OAUTH_CALLBACK, component: OAuthCallbackPage, active: true },
  { path: paths.SIGN_IN, component: SignInPage, active: true },
  { path: paths.SIGN_UP, component: SignUpPage, active: true },
  { path: paths.FORGOT, component: ForgotPage, active: true },
  { path: paths.CONFIRM_EMAIL, component: EmailConfirmPage, active: true },
];

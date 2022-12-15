import { FC } from "react";

const DashboardTransactionsEmpty: FC = ({ children }) => (
  <div className="dashboard-transactions-empty">
    {children}
  </div>
);

export default DashboardTransactionsEmpty;
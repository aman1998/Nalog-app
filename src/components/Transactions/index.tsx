import MediaQuery from "react-responsive";

import { maxMobileMediaWidth, minTableMediaWidth } from "config/constants";

import TransactionsHeader from "./components/TransactionsHeader";
import TransactionsHeaderMobile from "./components/TransactionsHeaderMobile";
import TransactionsListWrapper from "./components/TransactionsListWrapper";

const Transactions = (): JSX.Element => (
  <div className="transactions">
    <MediaQuery minWidth={minTableMediaWidth}>
      <TransactionsHeader />
    </MediaQuery>
    <MediaQuery maxWidth={maxMobileMediaWidth}>
      <TransactionsHeaderMobile />
    </MediaQuery>
    <TransactionsListWrapper />
  </div>
);

export default Transactions;

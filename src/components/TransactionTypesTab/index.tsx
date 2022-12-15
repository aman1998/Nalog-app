import { useSelector } from "react-redux";
import { Tabs } from "antd";
import { matchPath } from "react-router";

import { paths } from "config/paths";

import {
  reportTransactionsTypeSelector
} from "store/reports/selectors";
import {
  EReportTransactionType,
  ReportTaxTransactionTypes,
  TReportTransactionType
} from "store/reports/types";

import { TransactionTypesTabProps } from "./types";
import { getTabName } from "./utils";
import { defaultTabs } from "./constants";

const { TabPane } = Tabs;

const TransactionTypesTab = <T extends ReportTaxTransactionTypes[] | TReportTransactionType[]>({
  tabsPane,
  handleTabs
}: TransactionTypesTabProps<T>): JSX.Element => {
  const type = useSelector(reportTransactionsTypeSelector);

  const getCount = (tab: string) => tabsPane?.length ? getTab(tab)?.count : "";

  const getTab = (tabType: string) => tabsPane?.find(item => item.type === tabType);

  const isDisabled = (item: string) =>
    (!tabsPane?.length && getTab(item)?.type !== EReportTransactionType.all)
    || !!tabsPane?.length
    && getTab(item)?.type !== EReportTransactionType.all
    && getTab(item)?.count === 0;

  const showFilter = matchPath(location.pathname, paths.SINGLE_REPORT)?.isExact;

  return (
    <Tabs
      activeKey={type}
      defaultActiveKey={EReportTransactionType.all}
      onChange={handleTabs}
      className="constructor-tabs"
      moreIcon={false}
    >
      {
        defaultTabs
          .map((item: string) => (
            <TabPane
              tab={
                <span className={item}>
                  {`${getTabName(item)} (${getCount(item)})`}
                </span>}
              key={item}
              disabled={isDisabled(item)}
              tabKey={item}
            />
          ))
      }
      {
        !!tabsPane?.length &&
        tabsPane
          .filter(item => item.type === EReportTransactionType.detailsRequired && item.count > 0)
          .map(item => (
            <TabPane
              tab={
                <span className={item.type}>
                  {`${getTabName(item.type)} (${item.count})`}
                </span>}
              key={item.type}
              tabKey={item.type}
            />
          ))
      }
      {showFilter && <TabPane
        tab={
          <span className={EReportTransactionType.filter}>
            {getTabName(EReportTransactionType.filter)}
          </span>}
        key={EReportTransactionType.filter}
        tabKey={EReportTransactionType.filter}
      />}
    </Tabs>
  );
};

export default TransactionTypesTab;
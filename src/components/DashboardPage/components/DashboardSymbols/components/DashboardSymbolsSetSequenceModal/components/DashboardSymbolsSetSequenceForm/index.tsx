import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend';
import { useMediaQuery } from "react-responsive";

import { TNullable } from "config/types";
import { maxMobileMediaWidth } from "config/constants";

import Button from "components/Buttons/Button";

import { assetsDashboardSaveSymbolsSelector, assetsDashboardSymbolsSelector } from "store/assets/selectors";
import {
  TAssetsDashboardAvailableSymbolData,
} from "store/assets/types";
import { postAssetsDashboardSaveSymbolsRequest } from "store/assets/reducers";
import { closeModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import DashboardSymbolsSetSequenceItems from "../DashboardSymbolsSetSequenceItems";

import { DashboardSymbolsSetSequenceFormContext } from "./hooks";

const DashboardSymbolsSetSequenceForm: FC = () => {
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data } = useSelector(assetsDashboardSymbolsSelector);
  const { fetching } = useSelector(assetsDashboardSaveSymbolsSelector);
  const [symbols, setSymbols] = useState<TNullable<TAssetsDashboardAvailableSymbolData>>(null);
  
  const onSubmit = () => {
    const $symbols = symbols?.map(sym => sym.id);
    dispatch(postAssetsDashboardSaveSymbolsRequest({ symbols: $symbols }));
    dispatch(closeModal(EModals.dashboardSymbolsSetSequence));
    dispatch(analyticEvent(EEventType.DASHBOARD_SYMBOLS_SAVE_CONFIG));
  };

  useEffect(() => {
    setSymbols(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className="dashboard-symbols-set-sequence-form"
    >
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <DashboardSymbolsSetSequenceFormContext.Provider value={{ symbols, setSymbols }}>
          {symbols && <DashboardSymbolsSetSequenceItems symbols={symbols} />}
        </DashboardSymbolsSetSequenceFormContext.Provider>
      </DndProvider>
      <div className="save-btn-wrapper">
        <Button
          onClick={onSubmit}
          loading={fetching}
          disabled={fetching}
          className="save-btn"
          title={t('naming.save')}
        />
      </div>
    </form>
  );
};

export default DashboardSymbolsSetSequenceForm;

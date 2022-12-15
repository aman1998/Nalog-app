import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import CloseIcon from "components/Icons/CloseIcon";

import { createReportModalSelector } from "store/reports/selectors";
import { setReportModals } from "store/reports/reducers";

import CreateReportForm from "../CreateReportForm";

const CreateReportMobile = (): JSX.Element => {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const createModalVisible = useSelector(createReportModalSelector);

  const onCancel = () => {
    dispatch(setReportModals({ key: "cancel", value: true }));
  };

  return (
    <Drawer
      width={"100%"}
      placement="right"
      closable={false}
      visible={createModalVisible}
      className="drawer"
    >
      <div className="drawer-header">
        <div className="drawer-closeIcon" onClick={onCancel}>
          <CloseIcon />
        </div>
        <h2 className="drawer-title">{t("naming.taxReturn")}</h2>
      </div>
      <CreateReportForm />
    </Drawer>
  );
};

export default CreateReportMobile;

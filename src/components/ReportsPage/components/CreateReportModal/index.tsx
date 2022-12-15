import Modal from "antd/lib/modal";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

import { mobileMediaWidth } from "config/constants";

import { setReportModals } from "store/reports/reducers";
import { createReportModalSelector } from "store/reports/selectors";

import CreateReportForm from "../CreateReportForm";

const CreateReportModal = (): JSX.Element => {
  const dispatch = useDispatch();
  const createModalVisible = useSelector(createReportModalSelector);
  const isMobile = useMediaQuery({
    query: `(max-width: ${mobileMediaWidth}px)`,
  });

  const onCancel = () => {
    dispatch(setReportModals({ key: "cancel", value: true }));
  };

  return (
    <Modal
      className={"create-report-modal"}
      visible={createModalVisible}
      footer={false}
      onCancel={onCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      width={isMobile ? 360 : 690}
    >
      <CreateReportForm />
    </Modal>
  );
};

export default CreateReportModal;

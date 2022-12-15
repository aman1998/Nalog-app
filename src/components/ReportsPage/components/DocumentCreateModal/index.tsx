import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import ModalWrapper from "components/ModalWrapper";

import { closeModal } from "store/modals/reducers";
import { EModals } from "store/modals/types";
import { modalStateSelector } from "store/modals/selectors";

import DocumentCreateModalForm from "./components/DocumentCreateModalForm";

const DocumentCreateModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector(modalStateSelector(EModals.documentCreateModal));

  return <ModalWrapper
    visible={Boolean(visible)}
    closeModal={() => dispatch(closeModal(EModals.documentCreateModal))}
    title={t('documentPage.newDocument')}
    destroyOnClose={true}
    className="document-create-modal"
    width={636}
  >
    <DocumentCreateModalForm/>
  </ModalWrapper>;
};

export default DocumentCreateModal;
import { FC, useState } from 'react';
import moment from "moment";
import { Menu, Dropdown, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { EStatus } from "config/types";

import DangerIcon from "components/Icons/DangerIcon";
import Button from "components/Buttons/Button";

import { deleteReportRequest } from "store/reports/reducers";


import ReportCardStatus from "./ReportCardStatus";
import { IRecordCardHead } from "./types";
import { RenderReportStatus } from "./RenderReportStatus";

const ReportCardHeader: FC<IRecordCardHead> = ({ created_at, name, status,id }) =>{
  const { t } = useTranslation();
  const [modal,setModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const toggleModal = ()=>{
    setModal(old=>!old);
  };

  // tslint:disable-next-line:no-shadowed-variable
  const onClickDeleteReport = (id:string) =>{
    dispatch(deleteReportRequest(id));
    toggleModal();

  };

  const menu = (
    <Menu className="old-report-menu_dropdown">
      <Menu.Item onClick={toggleModal} key="1">{t("report.deleteReport")}</Menu.Item>
    </Menu>
  );

  return(
    status !== EStatus.forming ?

      <div className="old-report-card-header">
        <div className="old-report-description">
          <RenderReportStatus status={status} name={name}/>
          <span>{moment(created_at).format("DD.MM.YYYY")}</span>
        </div>
        <div className="old-report-card-status">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={e => e.preventDefault()}>
              <ReportCardStatus status={status}/>
            </a>
          </Dropdown>
        </div>
        <Modal
          visible={modal}
          onCancel={toggleModal}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
          title={false}
          footer={false}
        >
          <div className="old-report-delete-modal__wrapper">
            <div className="old-report-delete-modal__body">
              <div className="old-report-delete-modal__icon">
                <DangerIcon />
              </div>
              <div className="old-report-delete-modal__content">
                <h4>{t("report.sureToDelete")}</h4>
                <p>{t("action.enteredDataLost")}</p>
              </div>
            </div>
            <div className="old-report-delete-modal__footer">
              <Button title={t("action.cancel")} transparent={true} onClick={toggleModal} />
              <Button title={t("action.delete")} danger={true} onClick={()=>onClickDeleteReport(id)}/>
            </div>
          </div>
        </Modal>
      </div>
      :
      <div className="old-report-card-header">
        <div className="old-report-description">
          <RenderReportStatus status={status} name={name}/>
          <span>{moment(created_at).format("DD.MM.YYYY")}</span>
        </div>
        <div className="old-report-card-status">
          <ReportCardStatus status={status}/>
        </div>
      </div>

  );
};

export default ReportCardHeader;

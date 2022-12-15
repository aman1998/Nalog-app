import { FC } from "react";
import debounce from "lodash/debounce";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";

import DownloadIcon from "components/Icons/DownloadIcon";
import PdfIcon from "components/Icons/DocTypesIcons/PdfIcon";
import XmlIcon from "components/Icons/DocTypesIcons/XmlIcon";
import ShowMoreIcon from "components/Icons/ShowMoreIcon";
import JPEGIcon from "components/Icons/DocTypesIcons/JPEGIcon";
import DocIcon from "components/Icons/DocTypesIcons/DocIcon";
import DocxIcon from "components/Icons/DocTypesIcons/DocxIcon";

import { onClickDownloadFile } from "utils/saveFiles";

import { TDownloadBlockProps } from "./types";
import FormedDefaultDocIcon from "./../FormedDefaultDocIcon";

const DOC_TYPES = {
  DOC: "DOC",
  DOCX: "DOCX",
  JPEG: "JPEG",
  PDF: "PDF",
  XML: "XML",
};

const DownloadBlock: FC<TDownloadBlockProps> = ( { files, tag } ) => {
  const { t } = useTranslation();

  const getIcon = (docType: string) => {
    switch (docType.toUpperCase()) {
    case DOC_TYPES.PDF:
      return <PdfIcon />;
    case DOC_TYPES.XML:
      return <XmlIcon />;
    case DOC_TYPES.JPEG:
      return <JPEGIcon/>;
    case DOC_TYPES.DOC:
      return <DocIcon/>;
    case DOC_TYPES.DOCX:
      return <DocxIcon/>;
    default:
      return <FormedDefaultDocIcon name={docType} />;
    }
  };

  const menu = (
    <Menu className="old-report-menu_dropdown">
      <Menu.Item key="1">{t("report.deleteReports")}</Menu.Item>
    </Menu>
  );

  return (
    <div className='report-download'>
      <div className='report-download__title-wrapper'>
        <h3 className='report-download__title'>{tag}</h3>
        {
          false && files.length > 2 &&
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <a onClick={e => e.preventDefault()}>
              <ShowMoreIcon />
            </a>
          </Dropdown>
        }
      </div>
      {
        // files.slice(0, 2)
        files.map(item => (
          <div key={item.id} className='report-download__item'>
            <div className='report-download__item-logo'>{getIcon(item.doc_type)}</div>
            <p className='report-download__item-name'>{item.name}</p>
            <a
              className='report-download__item-download'
              onClick={debounce(() => {
                // downloadjs(item.file || '', item.name, "application/pdf");
                onClickDownloadFile(item.file || '');
              }, 500)}
            >
              <DownloadIcon />
            </a>
          </div>
        ))
      }
      {
        false && files.length > 2 &&
        <div className="report-download__line">{t('action.seeAll')}</div>
      }
    </div>
  );
};

export default DownloadBlock;

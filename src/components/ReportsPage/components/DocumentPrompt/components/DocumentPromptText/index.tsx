import { Fragment, FC } from "react";
import { useTranslation } from "react-i18next";

const DocumentPromptText: FC = () => {
  const { t } = useTranslation();
  
  return (<Fragment>
    <p className="document-prompt__text" dangerouslySetInnerHTML={{ __html: t("documentPromptText.text1") }} />
    <p className="document-prompt__text"/>
    <p className="document-prompt__text" dangerouslySetInnerHTML={{ __html: t("documentPromptText.text2") }}/>
  </Fragment>);
};

export default DocumentPromptText;

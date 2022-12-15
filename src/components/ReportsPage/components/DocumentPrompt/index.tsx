import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import BNPrompt from "components/BNPrompt";

import { getAssetsHintTextDataSelector, getAssetsHintTextSelector } from "store/reports/selectors";
import { changeHintTextStatusRequest } from "store/reports/reducers";

import DocumentPromptText from "./components/DocumentPromptText";

const DocumentPrompt: FC = ({}) => {
  const textHintData = useSelector(getAssetsHintTextDataSelector);
  const text = useSelector(getAssetsHintTextSelector);

  const dispatch = useDispatch();

  return <BNPrompt
    text={text}
    defaultPromptText={<DocumentPromptText />}
    onClose={() =>
      dispatch(changeHintTextStatusRequest(
        { hint_code: process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT, visible: false }))
    }
    onOpen={() => textHintData &&  dispatch(changeHintTextStatusRequest(
      { hint_code: process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT, visible: true }))}
  />;

};

export default DocumentPrompt;

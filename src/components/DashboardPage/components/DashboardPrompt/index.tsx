import { FC } from "react";
import { useDispatch } from "react-redux";

import BNPrompt from "components/BNPrompt";

import { changeHintTextStatusRequest } from "store/reports/reducers";

import DashboardPromptText from "./components/DashboardPromptText";

const DashboardPrompt: FC = () => {
  const dispatch = useDispatch();
  return (
    <BNPrompt
      className="dashboard-prompt"
      defaultPromptText={<DashboardPromptText/>}
      onClose={() =>
        dispatch(changeHintTextStatusRequest(
          { hint_code: process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT, visible: false }))
      }
      onOpen={() => 
        dispatch(changeHintTextStatusRequest(
          { hint_code: process.env.REACT_APP_HINT_DOCUMENT_HELP_TEXT, visible: true }))}
    />
  );
};

export default DashboardPrompt;

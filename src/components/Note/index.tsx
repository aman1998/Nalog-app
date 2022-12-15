import { FC } from "react";
import { Tooltip } from "antd";
import { useHistory } from "react-router";
import cn from "classnames";

import { QUERIES } from "config/constants";

import { EModals } from "store/modals/types";

import { NoteProps } from "./types";
import { checkNoteTextTruncate } from "./utils";


const Note: FC<NoteProps> = ({ text, id }) => {
  const history = useHistory();
  const [nextLine, isTruncated, truncateCount] = checkNoteTextTruncate(text);

  const openEditTransactionNoteModal = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.transactionEditNote}`
    });
  };

  return (
    <Tooltip title={text} overlayClassName="note__tooltip" trigger={["hover"]}>
      <div
        className={cn("note", { "one-line": nextLine && !isTruncated })}
        onClick={openEditTransactionNoteModal}
        style={{ height: nextLine && isTruncated ? 48 : 32 }}
      >
        {isTruncated ? `${text.slice(0, truncateCount)}...` : text}
      </div>
    </Tooltip>
  );
};

export default Note;
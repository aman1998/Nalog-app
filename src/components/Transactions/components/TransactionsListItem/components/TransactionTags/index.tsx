import { CSSProperties, FC, useMemo, useRef } from "react";
import { useHistory } from "react-router";
import cn from "classnames";

import { QUERIES } from "config/constants";

import { checkNoteTextTruncate } from "components/Note/utils";

import { EModals } from "store/modals/types";

import { getTextWidth } from "utils/text";

import { TransactionTagsProps } from "./types";

const CONTAINER_WIDTH = 188;
const TAG_EMPTY_SPACES = 16;
const TAG_MARGIN_RIGHT = 8;
const REST_COUNT_WIDTH = 38;

const TransactionTags: FC<TransactionTagsProps> = ({ 
  tags, note, id 
}) => {
  const history = useHistory();
  const containerRef = useRef<HTMLDivElement>(null);

  const tagsWithWidth = useMemo(() => tags.map(tag => ({
    ...tag,
    width: getTextWidth("#" + tag.name, "400 12px Roboto,sans-serif") + TAG_EMPTY_SPACES + TAG_MARGIN_RIGHT
  })), [tags]);

  const [filteredTags, restCount, restCountFit] = useMemo(() => {
    const [nextLine, isTruncated] = checkNoteTextTruncate(note || "");
    const containerWidth = note
      ? nextLine && isTruncated ? CONTAINER_WIDTH :  CONTAINER_WIDTH * 2
      : CONTAINER_WIDTH * 3;

    const BreakException = {};

    let availableWidth = 0;
    let stopPoint = 1;
    try {
      tagsWithWidth.forEach((tag , index) => {
        if (index !== 0 && index !== tagsWithWidth.length + 1
          && containerWidth <= availableWidth + tag.width + REST_COUNT_WIDTH + TAG_MARGIN_RIGHT + TAG_EMPTY_SPACES
        ) throw BreakException;
        else if (containerWidth <= availableWidth + tag.width) throw BreakException;

        availableWidth += tag.width;
        stopPoint = index+1;
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    const $restCountFit = containerWidth - availableWidth >= REST_COUNT_WIDTH;
    return [tagsWithWidth.slice(0, stopPoint), tagsWithWidth.slice(stopPoint).length, $restCountFit];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsWithWidth, note]);

  const openEditTransactionTagModal = () => {
    history.replace({
      search: `?${QUERIES.transaction}=${id}&modal=${EModals.transactionEditTag}`
    });
  };

  const formLastItemTagStyle = (tag: { name: string; width: number }): CSSProperties => {
    if (restCountFit || !restCount) {
      return {};
    }
    return {
      width: tag.width - REST_COUNT_WIDTH,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    };
  };

  return (
    <div className="transactions-item__tags" ref={containerRef}>
      {
        filteredTags.map((tag, index) => {
          if (index + 1 === filteredTags.length) { // last item
            return (
              <div
                key={tag.name}
                className="transactions-item__tag"
                style={formLastItemTagStyle(tag)}
                onClick={openEditTransactionTagModal}
              >
                {"#" + tag.name}
              </div>
            );
          } else {
            return (
              <div
                key={tag.name}
                className="transactions-item__tag"
                onClick={openEditTransactionTagModal}
              >
                {"#" + tag.name}
              </div>
            );
          }
        }
        )
      }
      {!!restCount && (
        <div
          className={cn("transactions-item__tag", "rest-count")}
          onClick={openEditTransactionTagModal}
        >
          {"+" + restCount}
        </div>
      )}
    </div>
  );
};

export default TransactionTags;
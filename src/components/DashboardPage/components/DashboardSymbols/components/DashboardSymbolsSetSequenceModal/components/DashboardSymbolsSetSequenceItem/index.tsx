import { FC, memo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMediaQuery } from "react-responsive";

import { colors, maxMobileMediaWidth } from "config/constants";

import BurgerIcon from "components/Icons/BurgerIcon";

import { DashboardSymbolKeys } from "../../constants";

import DashboardSymbolsSetSequenceDropdown from "../DashboardSymbolsSetSequenceDropdown";

import { DashboardSymbolsSetSequenceItemProps } from "./types";

const DashboardSymbolsSetSequenceItem: FC<DashboardSymbolsSetSequenceItemProps> = memo(({
  index, symbol, moveCard 
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${maxMobileMediaWidth}px)` });
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: DashboardSymbolKeys.SYMBOL,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ opacity, backgroundColor }, drag, preview] = useDrag({
    type: DashboardSymbolKeys.SYMBOL,
    item: () => ({ id: symbol.id, index }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.4 : 1,
      backgroundColor: monitor.isDragging() ? colors.gray7 : "#fff"
    }),
  });

  if (isMobile) {
    drag(drop(ref));
  } else {
    preview(drop(ref));
  }

  return (
    <div
      className="dashboard-symbols-set-sequence-item"
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity, backgroundColor }}
    >
      <DashboardSymbolsSetSequenceDropdown symbol={symbol} index={index}/>
      {!isMobile && <div ref={drag} className="dashboard-symbols-set-sequence-item__burger-icon">
        <BurgerIcon  />
      </div>}
    </div>
  );
});

export default DashboardSymbolsSetSequenceItem;
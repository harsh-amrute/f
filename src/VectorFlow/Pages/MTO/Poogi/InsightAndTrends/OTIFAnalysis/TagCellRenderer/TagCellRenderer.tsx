import { useState } from "react";
import Portal from "../../../../../../../components/VectorFLOW/layouts/Portal";
import { Icon, TextWrapper, Wrapper, Tag } from "./styles";

interface ToolTipPositionType {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

const TagCellToolTip = (params: any) => {
  const tags = Object.keys(params?.value)?.filter(
    (val: any) => params?.value[val]
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<ToolTipPositionType>({
    top: 0,
    left: 0,
  });

  const showTooltip = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: top / 0.75 + (tags?.length === 2 ? -90 : -60),
      left: left + 35,
    });
    setIsOpen(true);
  };

  const hideTooltip = () => {
    setTooltipPosition({
      top: 0,
      left: 0,
    });
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <Icon
        src={`/assets/img/VectorFLOW/BPR/${tags[0] === "if" ? "if" : "ot"}.svg`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      />
      {isOpen && (
        <Portal wrapperId="tooltip">
          <TextWrapper style={{ ...tooltipPosition }}>
            {tags?.map((s, index) => {
              return (
                <Tag
                  style={{
                    background: `${s === "if" ? "#FEA236" : "#D1750C"}`,
                  }}
                  key={`${index + s}`}
                >
                  {s === "if" ? "IF Failed" : "OT Failed"}
                </Tag>
              );
            })}
          </TextWrapper>
        </Portal>
      )}
    </Wrapper>
  );
};

export default TagCellToolTip;

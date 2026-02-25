import React from "react";
import { CustomTooltipProps } from "@ag-grid-community/react";
import {
  tooltipWrapper,
  tagWrapper,
  tagArrow,
  tagLabel,
  tagArrowRightColorVar,
  tagArrowBorderColorVar,
  tagLabelBgVar,
  tagLabelTextColorVar,
  tagLabelBorderVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
const getTagStyles = (tag: string) => {
  if (!tag) {
    return { arrow: "#cccccc", bg: "#fff", text: "#000", border: "none" };
  }

  const lower = tag.toLowerCase();
  if (lower === "past scheduling") {
    return { arrow: "#E53F3F", bg: "#E53F3F", text: "#2F2B2B", border: "none" };
  }
  if (lower === "within scheduling") {
    return { arrow: "#A8A8A8", bg: "#A8A8A8", text: "#2F2B2B", border: "none" };
  }
  if (lower === "beyond scheduling") {
    return { arrow: "#f5f5f0", bg: "#f5f5f0", text: "#2F2B2B", border: "none" };
  }
  return { arrow: "#c1c1c1", bg: "#fff", text: "#111", border: "none" };
};

const LoadTagTooltip: React.FC<CustomTooltipProps> = (props) => {
  const rawValue = props.value;
  const tags: string[] = Array.isArray(rawValue)
    ? rawValue
    : [rawValue].filter(Boolean);

  if (tags.length === 0) {
    return <div className={tooltipWrapper}>No tags</div>;
  }

  return (
    <div className={tooltipWrapper}>
      {tags.map((tag, idx) => {
        const style = getTagStyles(tag);
        return (
          <div className={tagWrapper} key={idx}>
            <div
              className={tagArrow}
              style={assignInlineVars({
                [tagArrowRightColorVar]: style.arrow,
                [tagArrowBorderColorVar]: style.border,
              })}
            />
            <div
              className={tagLabel}
              style={assignInlineVars({
                [tagLabelBgVar]: style.bg,
                [tagLabelTextColorVar]: style.text,
                [tagLabelBorderVar]: style.border,
              })}
            >
              {tag}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoadTagTooltip;

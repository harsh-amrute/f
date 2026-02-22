import React, { useState } from "react";
import {
  tagWrapperInner,
  tagArrow,
  tagLabel,
  tagArrowRightColorVar,
  tagArrowBorderWidthVar,
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
    return { arrow: "#E8E8E8", bg: "#E8E8E8", text: "#2F2B2B", border: "none" };
  }
  return { arrow: "#c1c1c1", bg: "#fff", text: "#111", border: "none" };
};

const LoadTagCellRenderer = (params: any) => {
  const tags = Array.isArray(params.value)
    ? params.value
    : [params.value].filter(Boolean);
  const [hover, setHover] = useState(false);

  if (tags.length === 0) return null;

  return (
    <div
      style={{ display: "flex", alignItems: "center", position: "relative" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* First tag - main */}
      {tags[0] && (
        <div className={tagWrapperInner} style={{ zIndex: 2 }}>
          <div
            className={tagArrow}
            style={assignInlineVars({
              [tagArrowRightColorVar]: getTagStyles(tags[0]).arrow,
              [tagArrowBorderColorVar]: getTagStyles(tags[0]).border,
            })}
          />
          <div
            className={tagLabel}
            style={assignInlineVars({
              [tagLabelBgVar]: getTagStyles(tags[0]).bg,
              [tagLabelTextColorVar]: getTagStyles(tags[0]).text,
              [tagLabelBorderVar]: getTagStyles(tags[0]).border,
            })}
          >
            {tags[0]}
          </div>
        </div>
      )}

      {/* Second tag - overlapped behind */}
      {tags[1] && (
        <div
          className={tagWrapperInner}
          style={{
            marginLeft: "-135px", // overlap,
            marginTop: "8px",
            // filter: "brightness(0.97)",
            zIndex: 1,
          }}
        >
          <div
            className={tagArrow}
            style={assignInlineVars({
              [tagArrowRightColorVar]: getTagStyles(tags[1]).arrow,
              [tagArrowBorderColorVar]: getTagStyles(tags[1]).border,
            })}
          />

          <div
            className={tagLabel}
            style={assignInlineVars({
              [tagLabelBgVar]: getTagStyles(tags[1]).bg,
              [tagLabelTextColorVar]: getTagStyles(tags[1]).text,
              [tagLabelBorderVar]: getTagStyles(tags[1]).border,
            })}
          >
            {tags[1]}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadTagCellRenderer;







import styled from "styled-components";
 
const getTagStyles = (tag: string) => {
  if (!tag) {
    return { arrow: "#cccccc", bg: "#fff", text: "#000", border: "none" };
  }
  const lower = tag.toLowerCase();
  if (lower === "past scheduling") {
    return { arrow: "#E5493A", bg: "#E5493A", text: "#fff", border: "none" };
  }
  if (lower === "within scheduling") {
    return { arrow: "#E5E5E5", bg: "#E5E5E5", text: "#444", border: "none" };
  }
  if (lower === "beyond scheduling") {
    return { arrow: "#f5f5f0", bg: "#f5f5f0", text: "#111", border: "none" };
  }
  return { arrow: "#c1c1c1", bg: "#fff", text: "#111", border: "none" };
};
 
const TagArrow = styled.div<{ arrowcolor: string; bordercolor: string }>`
  width: 0;
  height: 0;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
  border-right: 15px solid ${({ arrowcolor }) => arrowcolor};
  ${({ bordercolor }) => bordercolor !== "none" && `border-top: 1px solid ${bordercolor}; border-bottom: 1px solid ${bordercolor};`};
`;
 
const TagLabel = styled.div<{ bgcolor: string; textcolor: string; bordercolor: string }>`
  padding: 5px 12px;
  border-left: none;
  line-height: 1;
  height: 22px;
  min-width: 90px;
  display: inline-block;
  width:140px;
  background: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};
  font-weight: 500;
  border-radius: 0 4px 4px 0;
  border: ${({ bordercolor }) => bordercolor};
`;
 
const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
`;
 
// AG Grid passes params with value property
const LoadTagCellRenderer = (params: any) => {
  const text = params.value;
  const { arrow, bg, text: txt, border } = getTagStyles(text);
  console.log('textttttttttttt', text)

 
  return (
    <TagWrapper>
      <TagArrow arrowcolor={arrow} bordercolor={border} />
      <TagLabel bgcolor={bg} textcolor={txt} bordercolor={border}>
      {text}
      </TagLabel>
    </TagWrapper>
  );
};
 
export default LoadTagCellRenderer;
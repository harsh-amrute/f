import { OTIFTags } from "../../../../../../../VectorFlow/Pages/MTO/Common/Enum";
import { container, icon } from "./styles.css";

const TagCellToolTip = (params: any) => {
  if (
    !(
      params &&
      params.value &&
      OTIFTags[params.value] &&
      OTIFTags[params.value].split("_")
    )
  ) {
    return <></>;
  }
  const allTags = OTIFTags[params.value].split("_");
  const tags: string[] = [];

  if (allTags[1] === "False") {
    tags.push("ot");
  }
  if (allTags[3] === "False") {
    tags.push("if");
  }

  if (tags.length === 2) {
    return (
      <div className={container}>
        <img
          className={icon}
          src="/assets/img/mto/OTIFAnalysis/otif.svg"
          alt="OTIF"
        />
      </div>
    );
  }

  return (
    <div className={container}>
      {tags.length > 0 && (
        <img
          className={icon}
          src={`/assets/img/mto/OTIFAnalysis/${
            tags[0] === "if" ? "if" : "ot"
          }.svg`}
          alt={tags[0].toUpperCase()}
        />
      )}
    </div>
  );
};

export default TagCellToolTip;

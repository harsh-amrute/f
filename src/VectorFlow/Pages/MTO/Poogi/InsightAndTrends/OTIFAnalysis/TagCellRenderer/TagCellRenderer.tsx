import { OTIFTags } from "../../../../../../../VectorFlow/Pages/MTO/Common/Enum";
import { Icon } from "./styles";

const TagCellToolTip = (params: any) => {

  const allTags = OTIFTags[params.value].split('_');
  const tags: string[] = [];
  console.log(allTags);
  if(allTags[1] === 'True'){
      tags.push('ot');
  }
  if(allTags[3] === 'True'){
      tags.push('if');
  }

  if(tags.length === 2){
    return (
      <Icon src={`/assets/img/mto/OTIFAnalysis/otif.svg`} />
    )
  }

  return (
    <>
      {tags.length > 0 && <Icon src={`/assets/img/mto/OTIFAnalysis/${tags[0] === "if" ? "if" : "ot"}.svg`} />}
    </>
  );
};

export default TagCellToolTip;

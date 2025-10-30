import { assignInlineVars } from "@vanilla-extract/dynamic";
import { SCVerticalPartitions, partitionHeightVar } from "./style.css";

type VerticalPartitionsProps = {
  height?: string;
};

const VerticalPartitions: React.FC<VerticalPartitionsProps> = ({
  height = "52px",
}) => {
  return (
    <div
      className={SCVerticalPartitions}
      style={assignInlineVars({ [partitionHeightVar]: height })}
    />
  );
};

export default VerticalPartitions;

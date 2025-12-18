import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useUserData } from "../../../../../context";
import {
  BPRTagsCellRendererWrapper,
  themeBg,
} from "../../SupplyChainIntelligenceHub/BPR/styles.css";

const TagsCellRenderer = (params: any) => {
  const { user } = useUserData();
  const bg =
    user.user.theme_ui === "REGALBLAZE"
      ? "#FCA311 0% 0% no-repeat padding-box"
      : "#B93B7E 0% 0% no-repeat padding-box";

  if (!params.value || params.value.length < 1) return null;
  return (
    <div
      className={BPRTagsCellRendererWrapper}
      style={{
        height: 18,
        padding: "0px 3px",
        fontSize: 9,
        width: 35,
        ...assignInlineVars({ [themeBg]: bg }),
      }}
      data-theme={user.user.theme_ui}
    >
      {params.value}
    </div>
  );
};

export default TagsCellRenderer;

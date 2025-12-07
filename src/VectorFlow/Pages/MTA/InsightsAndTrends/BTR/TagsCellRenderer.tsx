import { useUserData } from "../../../../../context";
import { BPRTagsCellRendererWrapper } from "../../SupplyChainIntelligenceHub/BPR/styles.css";

const TagsCellRenderer = (params: any) => {
  const { user } = useUserData();

  if (!params.value || params.value.length < 1) return null;
  return (
    <div
      className={BPRTagsCellRendererWrapper}
      style={{ height: 18, padding: "0px 3px", fontSize: 9, width: 35 }}
      data-theme={user.user.theme_ui}
    >
      {params.value}
    </div>
  );
};

export default TagsCellRenderer;

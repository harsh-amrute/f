import { StoreDetails } from "../../../../../../VectorFlow/types/MCGrid";
import {
  DetailToolTipWrapper,
  DetailToolTipHeader,
  DetailToolTipGrid,
  DetailToolTipGridRow,
  DetailToolTipGridHeader,
  DetailToolTipGridCell,
  HighlightedRow,
} from "./styles.css";

const DetailToolTip = (props: { data: StoreDetails }) => {
  const { data } = props;
  return (
    <div className={DetailToolTipWrapper}>
      <div className={DetailToolTipHeader}>Details</div>
      <div className={DetailToolTipGrid}>
        <div className={DetailToolTipGridRow}>
          <span className={DetailToolTipGridHeader}></span>
          <span className={DetailToolTipGridHeader}>Value (Lakhs)</span>
          <span className={DetailToolTipGridHeader}>PCs/ %</span>
        </div>
        <div className={DetailToolTipGridRow}>
          <span className={DetailToolTipGridCell}>Sales</span>
          <span className={DetailToolTipGridCell}>{data.sales.value}</span>
          <span className={DetailToolTipGridCell}>{data.sales.pcs}</span>
        </div>
        <div className={DetailToolTipGridRow}>
          <span className={DetailToolTipGridCell}>Gross Margin</span>
          <span className={DetailToolTipGridCell}>
            {data["gross-margin"].value}
          </span>
          <span className={DetailToolTipGridCell}>
            {data["gross-margin"].pcs}
          </span>
        </div>
        <div
          className={HighlightedRow}
          style={{ borderRadius: "4px 4px 0px 0px" }}
        >
          <span className={DetailToolTipGridCell}>Planned Range</span>
          <span className={DetailToolTipGridCell}>
            {data["planned-range"].value}
          </span>
          <span className={DetailToolTipGridCell}>
            {data["planned-range"].pcs}
          </span>
        </div>
        <div
          className={HighlightedRow}
          style={{ borderBottom: "dashed 1px white" }}
        >
          <span className={DetailToolTipGridCell}>Range Available</span>
          <span className={DetailToolTipGridCell}>
            {data["range-available"].value}
          </span>
          <span className={DetailToolTipGridCell}>
            {data["range-available"].pcs}
          </span>
        </div>
        <div
          className={HighlightedRow}
          style={{ borderRadius: "0px 0px 4px 4px" }}
        >
          <span className={DetailToolTipGridCell}>Gap</span>
          <span className={DetailToolTipGridCell}>{data.gap.value}</span>
          <span className={DetailToolTipGridCell}>{data.gap.pcs}</span>
        </div>

        {/* <div className={DetailToolTipGridRow}>
                    <span className={DetailToolTipGridCell}>
                        Sales
                    </DetailToolTipGridCell>
                    <span className={DetailToolTipGridCell}>
                        
                    </DetailToolTipGridCell>
                    <span className={DetailToolTipGridCell}>
                        
                    </DetailToolTipGridCell>
                </DetailToolTipGridRow> */}
      </div>
    </div>
  );
};

export default DetailToolTip;

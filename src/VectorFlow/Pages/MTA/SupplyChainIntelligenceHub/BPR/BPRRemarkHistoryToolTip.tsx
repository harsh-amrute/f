import { BPRRemarkHistoryToolTipProps } from "../../../../../VectorFlow/types/BPR";
import Portal from "../../../../../components/VectorFLOW/layouts/Portal";

import {
  BPRRemarksToolTipWrapper,
  BPRRemarksToolTipContent,
  BPRRemarksToolTipContentHeaderContainer,
  BPRRemarksToolTipContentHeader,
  BPRRemarksToolTipContentColumnContainer,
  BPRRemarksToolTipContentColumn,
  BPRRemarksToolTipContentRowContainer,
  BPRRemarksToolTipContentRow,
  BPRRemarksToolTipContentRowCell,
  BPRRemarksToolTipContentRowNameCellSection,
  BPRRemarksToolTipContentRowDataCellSection,
  BPRRemarkHistoryCloseIcon,
} from "./styles.css";

const BPRRemarkHistoryToolTip = (props: BPRRemarkHistoryToolTipProps) => {
  const { style, remarkHistory, onClose } = props;

  return (
    <Portal wrapperId="tooltip">
      <div className={BPRRemarksToolTipWrapper} style={{ ...style }}>
        <div className={BPRRemarksToolTipContent}>
          <div className={BPRRemarksToolTipContentHeaderContainer}>
            <div className={BPRRemarksToolTipContentHeader}>
              Remarks History
            </div>
            <img
              className={BPRRemarkHistoryCloseIcon}
              src="/assets/img/VectorFlow/NMS/close-dark.svg"
              alt="close-icon"
              onClick={onClose}
            />
          </div>

          <div className={BPRRemarksToolTipContentColumnContainer}>
            <div
              className={BPRRemarksToolTipContentColumn}
              style={{ width: 140 }}
            >
              Date
            </div>
            <div
              className={BPRRemarksToolTipContentColumn}
              style={{ width: "100%" }}
            >
              Remarks
            </div>
          </div>

          <div className={`${BPRRemarksToolTipContentRowContainer} custom-scrollbar`}>
            {remarkHistory.map((r: any) => {
              if (r) {
                return (
                  <div className={BPRRemarksToolTipContentRow}>
                    <div
                      className={BPRRemarksToolTipContentRowCell}
                      style={{ width: 130 }}
                    >
                      {r.rd}
                    </div>
                    <div className={BPRRemarksToolTipContentRowCell}>
                      {r.un && r.un.length > 0 && (
                        <div
                          className={BPRRemarksToolTipContentRowNameCellSection}
                        >
                          Name - {r.un}
                        </div>
                      )}
                      <div
                        className={BPRRemarksToolTipContentRowDataCellSection}
                        style={{ fontWeight: 500, color: " #464646" }}
                      >
                        {r.r}
                      </div>
                    </div>
                    {/* {Object.keys(r).map((key:string)=>{
                                    if(key==="date" ){
                                        return(
                                            <BPRRemarksToolTipContentRowCell style={{width:130}}>
                                                {r[key]}
                                            </BPRRemarksToolTipContentRowCell>
                                        )
                                    }
                                    if(key==='remark'){
                                        return(
                                            <BPRRemarksToolTipContentRowCell >
                                                <BPRRemarksToolTipContentRowNameCellSection>
                                                    Name - {r.author}
                                                </BPRRemarksToolTipContentRowNameCellSection>
                                                <BPRRemarksToolTipContentRowDataCellSection style={{fontWeight:500,color:" #464646"}}>
                                                    {r.remark}
                                                </BPRRemarksToolTipContentRowDataCellSection>
                                            </BPRRemarksToolTipContentRowCell>
                                        )
                                    }
                            })} */}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default BPRRemarkHistoryToolTip;

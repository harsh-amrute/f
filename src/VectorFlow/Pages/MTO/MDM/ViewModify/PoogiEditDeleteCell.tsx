import _ from "lodash";
import { notifyError } from "../../../../../helpers/notify";

const PoogiEditDeleteCell = (params: any) => {

  const isMajor = !params.data.minId;

  const syncMinorToMajor = (updatedMinorData: any, isDeleted = false) => {
    if (!isMajor && params.majorRef?.current?.api) {
      const majorNode = params.majorRef.current.api.getRowNode(params.data.majId);
      if (majorNode) {
        const majorData = { ...majorNode.data };
        if (majorData.minData) {
          if (isDeleted) {
            majorData.minData = majorData.minData.filter((min: any) => min.minId !== updatedMinorData.minId);
          } else {
            majorData.minData = majorData.minData.map((min: any) =>
              min.minId === updatedMinorData.minId ? updatedMinorData : min
            );
          }
          params.majorRef.current.api.applyTransaction({ update: [majorData] });
        }
      }
    }
    if (params.minRef.current) {
      params.minRef.current.api.refreshCells()
    }
  };

  const validateUniqueness = (dataToCheck: any) => {
    if (isMajor) {
      let isDuplicate = false;
      params.api.forEachNode((node: any) => {
        if (
          node.data.majId !== dataToCheck.majId &&
          node.data.plnm === dataToCheck.plnm &&
          node.data.majdsc?.toLowerCase().trim() === dataToCheck.majdsc?.toLowerCase().trim() &&
          !node.data.id
        ) {
          isDuplicate = true;
        }
      });
      if (isDuplicate) {
        notifyError("Major reason description must be unique for a plant.");
        return false;
      }
    } else {
      let isDuplicate = false;
      const majorNode = params.majorRef?.current?.api?.getRowNode(dataToCheck.majId);
      if (majorNode?.data?.minData) {
        majorNode.data.minData.forEach((min: any) => {
          if (
            min.minId !== dataToCheck.minId &&
            min.mindsc?.toLowerCase().trim() === dataToCheck.mindsc?.toLowerCase().trim() &&
            !min.id && !min.ipd
          ) {
            isDuplicate = true;
          }
        });
      }
      if (isDuplicate) {
        notifyError("Minor reason description must be unique under a major reason.");
        return false;
      }
    }
    return true;
  };

  const onSaveChange = () => {
    if (!validateUniqueness(params.data)) {
      return;
    }
    const updatedData = { ...params.data, editable: false, iu: true };
    params.api.applyTransaction({ update: [updatedData] });
    if (params.minRef && isMajor) {
      params.minRef.current = params.data.minId;
    }
    syncMinorToMajor(updatedData);
  };

  const onCancel = () => {
    if (params.data.oldValue) {
      const updatedData = { ...params.data, ...params.data.oldValue, editable: false };
      params.api.applyTransaction({ update: [updatedData] });
      syncMinorToMajor(updatedData);
    } else {
      if (isMajor) {
        params.api.applyTransaction({ remove: [params.data] });
        if (params.minRef?.current?.api) {
          const minorRowsToRemove: any[] = [];
          params.minRef.current.api.forEachNode((node: any) => {
            minorRowsToRemove.push(node.data);
          });
          if (minorRowsToRemove.length > 0) {
            params.minRef.current.api.applyTransaction({ remove: minorRowsToRemove });
          }
        }
      } else {
        const majorNode = params.majorRef?.current?.api?.getRowNode(params.data.majId);
        const minDataCount = majorNode?.data?.minData?.length || 0;

        if (minDataCount <= 1) {
          notifyError('Major reason must contain atleast one minor reason.');
        } else {
          params.api.applyTransaction({ remove: [params.data] });
          syncMinorToMajor(params.data, true);
        }
      }
    }
  };

  if (params?.data.editable) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          justifyContent: "center",
          marginTop: "4px",
        }}
      >
        <div onClick={onSaveChange} style={{ cursor: "pointer" }}>
          <img height={18} src="/assets/img/MTOapprovalBuffer.svg" alt="ApproveMaster" />
        </div>

        <div onClick={onCancel} style={{ cursor: "pointer" }}>
          <img height={18} src="/assets/img/MTOcancelBuffer.svg" alt="CancelMaster" />
        </div>
      </div>
    );
  }

  const onDeleteClick = () => {
    const updatedData = { ...params.data, id: true, editable: false };

    if (isMajor) {
      if (updatedData.minData) {
        updatedData.minData = updatedData.minData.map((min: any) => ({ ...min, editable: false, ipd: true }));
      }
      params.api.applyTransaction({ update: [updatedData] });

      if (params.minRef?.current?.api) {
        const minorUpdates: any[] = [];
        params.minRef.current.api.forEachNode((node: any) => {
          minorUpdates.push({ ...node.data, editable: false, ipd: true });
        });
        if (minorUpdates.length > 0) {
          params.minRef.current.api.applyTransaction({ update: minorUpdates });
        }
      }
    } else {
      params.api.applyTransaction({ update: [updatedData] });
      syncMinorToMajor(updatedData);
    }
  };

  const onDeleteUndoClick = () => {
    if (!validateUniqueness(params.data)) {
      return;
    }
    const updatedData = { ...params.data, id: false };

    if (isMajor) {
      if (updatedData.minData) {
        updatedData.minData = updatedData.minData.map((min: any) => ({ ...min, ipd: false }));
      }
      params.api.applyTransaction({ update: [updatedData] });

      if (params.minRef?.current?.api) {
        const minorUpdates: any[] = [];
        params.minRef.current.api.forEachNode((node: any) => {
          minorUpdates.push({ ...node.data, ipd: false });
        });
        if (minorUpdates.length > 0) {
          params.minRef.current.api.applyTransaction({ update: minorUpdates });
        }
      }
    } else {
      params.api.applyTransaction({ update: [updatedData] });
      syncMinorToMajor(updatedData);
    }
  };

  const onEditClick = () => {
    const updatedData = { ...params.data, editable: true, iu: true, oldValue: { ...params.data } };
    params.api.applyTransaction({ update: [updatedData] });
    syncMinorToMajor(updatedData);
  };

  let isMajorDeleted = false;
  if (!isMajor && params.majorRef?.current?.api) {
    const majorNode = params.majorRef.current.api.getRowNode(params.data.majId);
    if (majorNode) {
      isMajorDeleted = !!majorNode.data.id;
    }
  }

  const isEditDisabled = !!params.data.id || isMajorDeleted || !!params.data.ipd;

  return (
    <div
      style={{
        display: "flex",
        margin: "4px auto",
        width: "80px",
        justifyContent: "center",
      }}
    >
          <button
        disabled={isEditDisabled}
            onClick={onEditClick}
            style={{
              background: "transparent",
              opacity: isEditDisabled ? 0.2 : 1,
              border: "none",
              cursor: isEditDisabled ? "not-allowed" : "pointer"
            }}
          >
            <img
              height={16}
              width={16}
              src="/assets/img/VectorFLOW/NMS/edit-draft.svg"
            />
          </button>
          {params.data.id ? (
            <button
          disabled={false}
              onClick={onDeleteUndoClick}
              style={{ background: "transparent",
                border: "none",
                cursor: "pointer",
                opacity: 
                  !isMajor ? (params.data.editable ? 0.2 : 1) : 1
              }}
            >
              <img
                height={16}
                width={16}
                src="/assets/img/delete-undo.svg"
                alt="undo"
              />
            </button>
          ) : (
            <button
              onClick={onDeleteClick}
            disabled={isMajorDeleted || !!params.data.ipd}
              style={{ background: "transparent",
                border: "none",
                cursor: (isMajorDeleted || !!params.data.ipd) ? "not-allowed" : "pointer",
                opacity: (isMajorDeleted || !!params.data.ipd) ? 0.2 : 1
               }}
            >
              <img
                height={16}
                width={16}
                src="/assets/img/VectorFLOW/NMS/delete-draft.svg"
              />
          </button>
      )}
    </div>
  );
};

export default PoogiEditDeleteCell;

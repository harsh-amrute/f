import _ from "lodash";


const PoogiEditDeleteCell = (params: any) => {


  const onSaveChange = () => {
    params.api.applyTransaction({ update: [{ ...params.data, editable: false }] });
  };

  const onCancel = () => {

  };


  if (
    params?.data.editable
  ) {
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

  };
  const onDeleteUndoClick = () => {
  };

  const onEditClick = () => {
  };

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
            disabled={
          false

            }
            onClick={onEditClick}
            style={{
              background: "transparent",
              opacity: `${params.data.id ? 0.2 : 1}`,
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
                opacity: 
                  `${params.data.minId ? params.data.editable ? 0.2 : 1 : 1}`
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
            disabled={false
              }
              style={{ background: "transparent",

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

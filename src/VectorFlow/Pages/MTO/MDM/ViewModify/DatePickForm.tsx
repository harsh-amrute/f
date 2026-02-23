import { useUserData } from "../../../../../context";
import { useEffect, useState } from "react";
import _ from "lodash";
import {
  SCFlexCenter,
  SCItemMulSelect,
  SCSwapItem,
  itemMulWidthVar,
} from "../../../../../components/layouts/ProductPermission/styles.css";
import { SearchInputMultiple } from "../../../../../components";
import moment from "moment";
import { useGetMaxFolDate } from "../../../../../VectorFlow/Services/MTA/MDM";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  formContainer,
  radioGroup,
  radioLabel,
  radioInput,labelEl,inputEl,selectEl,inputWrapper, daysContainer,dayBtn,
  footerText,daySelectedBgVar, accentColorVar
} from "./styles.css";
import CalenderMonthlySelect from "./CalenderMonthlySelect";

/* runtime vars */
// export const accentColorVar = createVar(); // for radio accent color
// export const daySelectedBgVar = createVar(); // selected day background

const DatePickForm = ({
  plantNames,
  calendarFormData,
  ccrNames,
  formData,
  setFormData,
  setIsModalOpen,
  onSaveHandler,
  maxFol,
  setMaxFol,
}: any) => {
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const isDisabled = formData.sd === "" || formData.ed === "";
  const [ccrNameOptFromPlant, setCcrNameOptFromPlant] = useState<any>(ccrNames);

  const { mutateAsync: GetMaxFolDate } = useGetMaxFolDate();

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      ...calendarFormData,
      rb: calendarFormData?.rb || "Once",
    }));
  }, [calendarFormData]);

  const onHandleChange = (e: any) => {
    setFormData({
      ...formData,
      iwd: e.target.value == "holiday" ? false : true,
    });
  };

  const onHandleTitleChange = (e: any) => {
    setFormData({
      ...formData,
      dsc: e.target.value,
    });
  };

  const onHandleOptionChange = (e: any) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      dow: [{ id: 0, mn: "", md: "" }],
      rd: null,
      rb: e.target.value || "Once",
    }));
  };

  const onHandlePlantChange = (e: any) => {
    const selectedPlantId = Number(e.target.value);
    const filteredCcrNames = ccrNames
      .filter((ccr: any) => ccr.plant === selectedPlantId)
      .map((ccr: any) => ({ value: ccr.ccr_id, label: ccr.ccr_name }));

    setCcrNameOptFromPlant(filteredCcrNames);

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      plid: selectedPlantId,
      plnm: plantNames.find((pl: any) => pl.plant_id == selectedPlantId)
        ?.plant_name,
      ccr_id: [],
      ccr: "",
    }));
  };

  const [ccrMapFol, setccrMapFol] = useState<any>();

  const fetchccrMapFol: any = async () => {
    try {
      const FOLData = await GetMaxFolDate();
      if (FOLData?.data) {
        setccrMapFol(FOLData.data.data);
      }
    } catch (error) {
      console.error("Error fetching FOL date", error);
    }
  };

  useEffect(() => {
    fetchccrMapFol();
  }, [formData?.ccr_id]);

  useEffect(() => {
    ccrMapFol || formData.ccr_id;
    setMaxFolFn(formData.ccr_id);
  }, [formData.ccr_id, ccrMapFol]);

  const onHandleCCRChange = (e: any) => {
    const ccrIds = e.map((ccr: any) => ccr.value);
    const ccrNames = e.map((ccr: any) => ccr.label).join(",");
    setFormData({
      ...formData,
      ccr_id: ccrIds,
      ccr: ccrNames,
    });
    setMaxFolFn(ccrIds);
  };

  const setMaxFolFn = (ccrs: any) => {
    if (!ccrMapFol) {
      return;
    }
    const dates = [];
    const plant = formData.plid;
    if (plant in ccrMapFol) {
      for (const ccr of ccrs) {
        if (ccr in ccrMapFol[plant]) {
          dates.push(ccrMapFol[plant][ccr]);
        }
      }
      // const momentDates = dates.map(date => moment(date, 'DD/MM/YYYY'));
      const momentDates = dates.map((date) =>
        moment(date, ["DD/MM/YYYY", "YYYY-MM-DD"], true)
      );

      const maxDate = moment.max(momentDates);
      setMaxFol(maxDate.format("YYYY-MM-DD"));
    }
  };

  const onHandleEndDateChange = (e: any) => {
    setFormData({
      ...formData,
      ed: e.target.value,
    });
  };

  const onHandleStartDateChange = (e: any) => {
    setFormData({
      ...formData,
      sd: e.target.value,
    });
  };

  const onHandleEVeryChange = (e: any) => {
    setFormData({
      ...formData,
      rd: Number(e.target.value),
    });
  };

  const handleAddDow = (day: string) => {
    setFormData((prevFormData: any) => {
      const updatedDow = [...prevFormData.dow];
      if (updatedDow.length === 1 && updatedDow[0].md === "") {
        updatedDow[0] = { id: 0, mn: "", md: day };
      } else if (!updatedDow.some((entry: any) => entry.md === day)) {
        updatedDow.push({ id: updatedDow.length, mn: "", md: day });
      } else {
        const index = updatedDow.findIndex((entry: any) => entry.md === day);
        updatedDow.splice(index, 1);
      }
      return { ...prevFormData, dow: updatedDow };
    });
  };

  // useEffect(() => {
  //   // Clear all selections first to avoid duplicate toggling issues
  //   document.querySelectorAll(".selected").forEach((el) => {
  //     el.classList.remove("selected");
  //   });

  //   // Apply the correct class to selected days
  //   if (formData && formData.dow && Array.isArray(formData.dow)) {
  //     formData?.dow
  //       .map((day: any) => day.md)
  //       .forEach((day: string) => {
  //         const element = document.getElementById(day);
  //         if (element) {
  //           element.classList.add("selected");
  //         }
  //       });
  //   }
  // }, [formData.dow]);

  useEffect(() => {
    if (formData.rb !== "Weekly") {
      if (formData?.dow?.length === 0) {
        setFormData((prevFormData: any) => ({
          ...prevFormData,
          dow: [{ id: 0, mn: "", md: "" }],
          rd: null,
        }));
      }
    } else {
      if (formData?.dow?.length === 0) {
        setFormData((prevFormData: any) => ({ ...prevFormData, dow: [] }));
      }
    }
  }, [formData.rb]);

  const handleMnOptionsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      dow: prevFormData.dow.map((month: any) =>
        month.id == id ? { ...month, mn: e.target.value } : month
      ),
    }));
  };

  const handleMdOptionsChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      dow: prevFormData.dow.map((month: any) =>
        month.id == id ? { ...month, md: e.target.value } : month
      ),
    }));
  };

  // Filter CCR names based on selected plant
  useEffect(() => {
    if (formData.plid) {
      const filteredCcrNames = ccrNames
        .filter((ccr: any) => ccr.plant === formData.plid)
        .map((ccr: any) => ({ value: ccr.ccr_id, label: ccr.ccr_name }));
      setCcrNameOptFromPlant(filteredCcrNames);
    }
  }, [formData.plid, ccrNames]);

  const onAddClick = () => {
    const newFormData = _.cloneDeep(formData);
    newFormData.dow.push({ id: formData.dow.length, mn: "", md: "" });
    setFormData(newFormData);
  };

  const onRemoveclick = (id: number) => {
    const newFormData = _.cloneDeep(formData);
    newFormData.dow = newFormData.dow.filter((val: any) => val.id !== id);
    setFormData(newFormData);
  };

  const [isFieldDisabled, setIsFieldDisabled] = useState(false);

  useEffect(() => {
    if (!formData.sd) {
      setIsFieldDisabled(false);
      return;
    }

    const today = moment().startOf("day");
    const selectedStart = moment(formData.sd, "YYYY-MM-DD");

    if (selectedStart.isBefore(today)) {
      setIsFieldDisabled(true);
    } else {
      setIsFieldDisabled(false);
    }
  }, [formData.sd]);

  const cx = (...c: Array<string | false | undefined>) =>
    c.filter(Boolean).join(" ");

  return (
    <>
      <fieldset
        disabled={isFieldDisabled}
        style={{
          border: "none",
          padding: 0,
          margin: 0,
          opacity: isFieldDisabled ? 0.6 : 1,
          pointerEvents: isFieldDisabled ? "none" : "auto",
        }}
      >
        <div className={formContainer}>
          {/* radios */}
          <div className={radioGroup}>
            <label
              className={radioLabel}
              style={assignInlineVars({
                [accentColorVar]:
                  themeUi === "REGALBLAZE" ? "#C7810E" : "#82104C",
              })}
            >
              <input
                className={radioInput}
                type="radio"
                name="type"
                value="holiday"
                checked={formData.iwd === false}
                onChange={onHandleChange}
              />
              Holiday
            </label>

            <label
              className={radioLabel}
              style={assignInlineVars({
                [accentColorVar]:
                  themeUi === "REGALBLAZE" ? "#C7810E" : "#82104C",
              })}
            >
              <input
                className={radioInput}
                type="radio"
                name="type"
                value="working"
                checked={formData.iwd === true}
                onChange={onHandleChange}
              />
              Working
            </label>
          </div>

          {/* title */}
          <div className={inputWrapper}>
            <label className={labelEl}>Title</label>
            <input
              className={inputEl}
              type="text"
              placeholder="Add name of holiday"
              value={formData.dsc}
              onChange={onHandleTitleChange}
            />
          </div>

          {/* plant */}
          <div className={inputWrapper}>
            <label className={labelEl}>Plant</label>
            <select
              className={selectEl}
              value={formData.plant__plant_name || formData.plnm}
              onChange={onHandlePlantChange}
            >
              <option value="" selected disabled hidden>
                Select a Plant
              </option>
              {plantNames.map((plant: any, i: number) => (
                <option key={i} value={plant.plant_id}>
                  {plant.plant_name}
                </option>
              ))}
            </select>
          </div>

          {/* CCR (your existing components) */}
          <div className={inputWrapper} style={{ marginBottom: "10px" }}>
            <label className={labelEl}>CCR</label>
            <div className={SCSwapItem}>
              <div className={SCFlexCenter}>
                <div
                  className={SCItemMulSelect}
                  style={assignInlineVars({
                    [itemMulWidthVar]: "85%", // override when needed
                  })}
                >
                  <SearchInputMultiple
                    placeholder={"Select CCR"}
                    options={formData.plid ? ccrNameOptFromPlant : []}
                    value={formData?.ccr_id?.map((ccr: any) => ({
                      value: ccr,
                      label:
                        ccrNames.find((ccrName: any) => ccrName.ccr_id == ccr)
                          ?.ccr_name || "",
                    }))}
                    setValue={onHandleCCRChange}
                    handleListChild={() => {
                      return null;
                    }}
                    disabled={false}
                    key={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* repeat */}
          <div className={inputWrapper}>
            <label className={labelEl}>Repeat</label>
            <select
              className={selectEl}
              value={formData?.rb || "Once"}
              onChange={onHandleOptionChange}
            >
              {["Once", "Weekly", "Monthly"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* start */}
          <div className={inputWrapper}>
            <label className={labelEl}>Start</label>
            <input
              className={inputEl}
              disabled={formData?.ccr_id?.length === 0}
              type="date"
              min={moment(maxFol).add(1, "day").format("YYYY-MM-DD")}
              value={formData.sd}
              onChange={onHandleStartDateChange}
            />
          </div>

          {/* weekly extras */}
          {formData.rb === "Weekly" && (
            <>
              <div className={inputWrapper}>
                <label className={labelEl}>Every</label>
                <input
                  className={inputEl}
                  type="number"
                  max={4}
                  value={formData?.rd}
                  onChange={onHandleEVeryChange}
                />
                Week(s)
              </div>

              <div className={inputWrapper}>
                <label className={labelEl}>On</label>
                <div className={daysContainer}>
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => {
                    const isSelected = formData?.dow?.some(
                      (d: any) => d.md === day
                    );
                    return (
                      <button
                        key={day}
                        className={`${dayBtn} ${isSelected ? "selected" : ""}`}
                        style={assignInlineVars({
                          [daySelectedBgVar]:
                            themeUi === "REGALBLAZE" ? "#C7810E" : "#82104C",
                        })}
                        onClick={() => handleAddDow(day)}
                        type="button"
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* monthly block stays as-is (your CalenderMonthlySelect) */}
          {formData.rb === "Monthly" &&
          formData?.dow?.map((val: any) => {
            return (
              <CalenderMonthlySelect
                key={val.id}
                formData={formData}
                handleMdOptionsChange={handleMdOptionsChange}
                handleMnOptionsChange={handleMnOptionsChange}
                onAddClick={onAddClick}
                onRemoveClick={onRemoveclick}
                id={val.id}
              />
            );
          })}

          {/* end */}
          <div className={inputWrapper}>
            <label className={labelEl}>Ends</label>
            <input
              className={inputEl}
              disabled={formData?.ccr_id?.length === 0}
              type="date"
              min={
                formData.sd
                  ? moment(formData.sd).format("YYYY-MM-DD")
                  : moment(maxFol).add(1, "day").format("YYYY-MM-DD")
              }
              value={formData.ed}
              onChange={onHandleEndDateChange}
            />
          </div>
          <div style={{ zoom: "0.8", marginTop: "10px" }}>
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "right",
              gap: "8px",
              borderTop: "2px dashed #A0A0A0",
              padding: "20px 10px 0 0",
            }}
          >
            <div>
              <button
                disabled={isDisabled}
                type="submit"
                onClick={() => {
                  onSaveHandler();
                }}
                style={{
                  font: "normal normal 300 16px/24px Roboto",
                  fontWeight: "400",
                  padding: "10px 30px",
                  color: "white",
                  borderRadius: "6px",
                  background: isDisabled ? "gray" : "#820F4C",
                  boxShadow: "0px 6px 25px #00000029",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                style={{
                  background: "white",
                  color: "grey",
                  font: "normal normal 300 16px/24px Roboto",
                  padding: "10px 20px",
                  fontWeight: "400",
                  borderRadius: "6px",
                  border: "1px solid grey",

                  boxShadow: "0px 6px 25px #00000029",
                }}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        </div>
      </fieldset>
    </>
  );
};

export default DatePickForm;

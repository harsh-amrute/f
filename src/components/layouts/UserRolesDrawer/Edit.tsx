import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useCombobox } from "downshift";
import {
  inputWrapper,
  urlsForm,
  label,
  buttonsWrapper,
  checkBoxesWrapper,
  checkBoxesHeader,
  checkBoxesContainer,
  checkBoxWrapper,
  checkBoxesHeaderContainer,
  searchWrapper,
  checkBoxLabel,
  urlSearch,
  focusOutlineVar,
} from "../UserURLsDrawer/styles.css";
import {
  input,
  primaryButton,
  secondaryButton,
  skeleton,
  textArea,
} from "../../commons/styled/index.css";
import { useUserData } from "../../../context";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

interface FormDataType {
  name: string;
  code: string;
  description: string;
  application_id: string;
  application_name: string;
  id: number;
  urls: Array<any>;
  features:Array<any>
}

const EditRole = (props: { data: any; cb: () => void }) => {
  const { data, cb } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [allUrls, setAllUrls] = useState<Array<any>>([]);

  const [allApplications, setAllApplications] = useState<Array<any>>([]);

  const [formData, setFormData] = useState<FormDataType>({ ...data });

  const [urlSearchQuery, setUrlSearchQuery] = useState<string>("");

  const sortUrls = (allUrlsArray: Array<any>): Array<any> => {
    const selectedUrls = formData.urls.map((url) => url.id);
    const result = [
      ...formData.urls,
      ...allUrlsArray.filter((url) => !selectedUrls.includes(url.id)),
    ];
    return result;
  };

  const getAllUrls = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/user/get-all-functions/`
      );

      setAllUrls(sortUrls(data));
    } catch (error: any) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
  }, []);

  const getAllApplications = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_HOST}api/user/get-all-applications/`
      );
      setAllApplications(data);
    } catch (error: any) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
  }, []);

  useEffect(() => {
    getAllUrls();
    getAllApplications();
    setIsLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value: any, label: any) => {
    setFormData({
      ...formData,
      application_id: value,
      application_name: label,
    });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const { checked } = e.target;

    setFormData((prevFormData) => {
      const updatedUrls = checked
        ? [...prevFormData.urls, data]
        : prevFormData.urls.filter((url) => url.id !== data.id);

      return { ...prevFormData, urls: updatedUrls };
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    if (checked) {
      setFormData((prev) => {
        return {
          ...prev,
          urls: allUrls,
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          urls: [],
        };
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}api/user/edit-role/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.status !== 200) notifyError("Server Went Unresponsive");
      else notifySuccess("Updated Role Successfully");
      cb();
    } catch (error) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    }
  };

  const applicationsFormattedData = useMemo(() => {
    return [
      { value: null, label: "Select Application" },
      ...allApplications.map((a) => ({
        value: a.application_id,
        label: a.application_name,
      })),
    ];
  }, [allApplications]);

  const isFormValid = useMemo((): boolean => {
    return Object.keys(formData).every((k) => {
      const key = k as keyof FormDataType;
      const value = formData[key];
      if (key === "features") return true; 
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (!Array.isArray(value) || value.length > 0)
      );
    });
  }, [formData]);

  const debounce = (fn: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: any[]) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearchURLs = (e: any) => {
    setUrlSearchQuery(e.target.value.toLowerCase());
  };

  const debouncedSearch = debounce(handleSearchURLs, 0);

  const isChecked = useCallback(
    (url: any) => {
      return formData.urls.some((u) => u.code === url.code);
    },
    [formData]
  );

  // const highlightText = (text: string, query: string) => {
  //   if (!query) return text

  // Downshift combobox for Application
  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getInputProps,
    getToggleButtonProps,
  } = useCombobox({
    items: applicationsFormattedData,
    itemToString: (item) => (item ? item.label : ""),
    selectedItem: applicationsFormattedData.find(
      (a) => a.value === formData.application_id
    ),
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem)
        handleSelectChange(selectedItem.value, selectedItem.label);
    },
  });

  const queriedURLs = useMemo(()=>{
    if(!urlSearchQuery || urlSearchQuery.length === 0)return allUrls
    return allUrls.filter((url)=>url.name.toLowerCase().includes(urlSearchQuery))
  },[urlSearchQuery,allUrls])

  if (isLoading) {
    return (
      <form className={urlsForm}>
        <div style={{ display: "flex", height: 30, gap: 20 }}>
          <div
            className={skeleton}
            style={{ height: "100%", flex: 1, width: "100%" }}
          />
          <div
            className={skeleton}
            style={{ height: "100%", flex: 1, width: "100%" }}
          />
        </div>
        <div
          className={skeleton}
          style={{ height: 30, width: "100%", marginTop: 20 }}
        />
        <div
          className={skeleton}
          style={{ height: 30, width: "100%", marginTop: 20 }}
        />

        <div
          className={skeleton}
          style={{ height: 80, width: "100%", marginTop: 20 }}
        />
        <div
          className={buttonsWrapper}
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 10,
          }}
        >
          <div className={skeleton} style={{ height: 30, width: "100px" }} />
        </div>
      </form>
    );
  }
  const focusColor =
    globalStyles.chooseThemeColor[themeUi]?.color4 ?? "transparent";

  return (
    <form className={urlsForm} onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="name">
            {" "}
            Name
          </label>
          <input
            className={input}
            type={"text"}
            required
            name="name"
            value={formData.name}
            placeholder="Any name"
            style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
            onChange={handleChange}
          />
        </div>
        <div className={inputWrapper} style={{ marginLeft: "10px" }}>
          <label className={label} htmlFor="code">
            {" "}
            Code
          </label>
          <input
            className={input}
            type={"text"}
            required
            name="code"
            placeholder="Role code"
            style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
            value={formData.code}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={inputWrapper}>
        <label className={label}>Applications</label>
        <div style={{ position: "relative" }}>
          <div
            {...getToggleButtonProps()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 10px",
              backgroundColor: "rgb(247,247,247)",
              border: "2px solid transparent",
              fontSize: 12,
              cursor: "pointer",
              borderRadius: 6,
            }}
          >
            <input
              {...getInputProps({
                readOnly: true,
                placeholder: "Select Application",
              })}
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                flex: 1,
                fontSize: 12,
              }}
              value={formData.application_name || ""}
            />
            <span style={{ fontSize: 10 }}>▼</span>
          </div>

          <ul
            {...getMenuProps()}
            style={{
              position: "absolute",
              zIndex: 1000,
              listStyle: "none",
              margin: 0,
              padding: 0,
              width: "100%",
              maxHeight: 150,
              overflowY: "auto",
              background: "white",
              border:
                isOpen && applicationsFormattedData.length > 0
                  ? "1px solid #BC3D80"
                  : "none",
              boxShadow: isOpen ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {isOpen &&
              applicationsFormattedData.map((item, index) => (
                <li
                  key={item.value ?? index}
                  {...getItemProps({ item, index })}
                  style={{
                    padding: "6px 10px",
                    fontSize: 11,
                    backgroundColor:
                      highlightedIndex === index
                        ? "#bc3d814d"
                        : item.value === formData.application_id
                        ? "#BC3D80"
                        : "white",
                    color:
                      item.value === formData.application_id
                        ? "white"
                        : "black",
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={inputWrapper}>
        <label className={label} htmlFor="description">
          {" "}
          Description
        </label>
        <textarea
          className={textArea}
          name="description"
          value={formData.description}
          required
          placeholder="Example : BPR Manager"
          style={{minHeight: 50, ...assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}}
          onChange={handleChange}
        />
      </div>
      <div className={checkBoxesWrapper}>
        <div className={checkBoxesHeaderContainer}>
          <div className={checkBoxesHeader}>Select URLS</div>
          <div className={searchWrapper}>
            <input
              className={urlSearch}
              // style={{ padding: "2px 5px", height: "25px" }}
              // style={assignInlineVars({
              // themeUi={themeUi}
              type={"search"}
              placeholder="Search..."
              onChange={debouncedSearch}
            />
            <img src="/assets/img/search-icon.svg" height={15} width={15} />
          </div>
        </div>
        <div
          className={`${checkBoxesContainer} custom-scrollbar`}
          style={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          {queriedURLs.length ? (
            <React.Fragment>
              <div
                className={checkBoxWrapper}
                style={{ position: "sticky", top: 0, backgroundColor: "white" }}
              >
                <input
                  className={input}
                  style={{ width: 10 }}
                  type={"checkbox"}
                  name={"all"}
                  onChange={handleSelectAll}
                />
                <label className={label} htmlFor={"all"}>
                  <b> Select All</b>
                </label>
              </div>
              {queriedURLs.map((r) => {
                return (
                  <div className={checkBoxWrapper} key={r.code}>
                    <input
                      className={input}
                      style={{ width: 10 }}
                      checked={isChecked(r)}
                      type={"checkbox"}
                      name={r.name}
                      onChange={(e) => handleCheck(e, r)}
                    />
                    <label className={label} htmlFor={r.name}>
                      <div className={checkBoxLabel}>
                        {/* {highlightText(r.name,urlSearchQuery)} */}
                        {r.name.split("").map((letter: string) => {
                          if (urlSearchQuery.includes(letter.toLowerCase())) {
                            return <p style={{ color: "#BC3D81" }}>{letter}</p>;
                          }
                          return <p>{letter}</p>;
                        })}
                      </div>
                    </label>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <div className={checkBoxWrapper}>
              <p
                style={{ fontSize: "14px", textAlign: "center", width: "100%" }}
              >
                No result
              </p>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 10,
          gap: 10,
        }}
      >
        <button
          className={secondaryButton}
          type="button"
          onClick={cb}
          style={assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}
        >
          Cancel
        </button>
        <button
          className={primaryButton}
          disabled={!isFormValid}
          style={assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}
        >
          Update Role
        </button>
      </div>
    </form>
  );
};

export default EditRole;

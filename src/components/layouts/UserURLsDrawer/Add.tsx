import { useState } from "react";
import {
  urlsForm,
  row,
  inputWrapper,
  label,
  ml10,
  formActions,
  focusOutlineVar,
} from "./styles.css";
import { input, primaryButton, textArea } from "../../commons/styled/index.css";
import { useUserData } from "../../../context";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

const AddURL = (props: { cb: () => void }) => {
  const { cb } = props;
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<any>({
    name: "",
    code: "",
    url: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_HOST}api/user/add-function/`,
        {
          data: [formData],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 400) {
        notifyError("A URL with the name " + formData.name + " already exists");
      } else {
        notifySuccess("Successfully Added " + formData.name);
        cb();
      }
    } catch (error) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusColor =
    globalStyles.chooseThemeColor[themeUi]?.color4 ?? "transparent";

  return (
    <form className={urlsForm} onSubmit={handleSubmit}>
      <div className={row}>
        <div className={inputWrapper}>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input
            className={input}
            type="text"
            required
            name="name"
            placeholder="Any name"
            style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
            onChange={handleChange}
          />
        </div>

        <div className={`${inputWrapper} ${ml10}`}>
          <label className={label} htmlFor="code">
            Code
          </label>
          <input
            className={input}
            type="text"
            required
            name="code"
            placeholder="URL code"
            style={assignInlineVars({
              [focusOutlineVar]: focusColor,
            })}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={inputWrapper}>
        <label className={label} htmlFor="url">
          URL
        </label>
        <input
          className={input}
          type="text"
          name="url"
          required
          placeholder="Enter your url"
          style={assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}
          onChange={handleChange}
        />
      </div>

      <div className={inputWrapper}>
        <label className={label} htmlFor="description">
          Description
        </label>
        <textarea
          className={textArea}
          name="description"
          required
          placeholder="Example : BPR url"
          style={assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}
          onChange={handleChange}
        />
      </div>

      <div className={formActions}>
        <button
          className={primaryButton}
          style={assignInlineVars({
            [focusOutlineVar]: focusColor,
          })}
          disabled={isSubmitting}
        >
          Add Url
        </button>
      </div>
    </form>
  );
};

export default AddURL;

import { useState } from "react";
import { notifyError } from "../../../../helpers/notify";

import {
  primaryButton,
  primaryBgVar,
  primaryWidthVar,
  primaryHeightVar,
  primaryRadiusVar,
} from "../../../commons/styled/index.css";

import {
  FormLogo,
  LoginForm,
  LoginWrapper,
  InputArea,
  PasswordInput,
  FormSection,
  inputFocusColorVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../styles/global";

import { useNavigate } from "react-router";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (password === "password") {
        localStorage.setItem("isAdmin", "1");
        navigate("/vector-admin/");
      } else {
        notifyError("Invalid Password");
      }
      setIsLoading(false);
    }, 1000);
  };
  const focusColor =
    globalStyles.chooseThemeColor["NOIRFUSION"]?.color4 ?? "#0000";
  const theme = "NOIRFUSION";
  const bg = globalStyles.chooseThemeColor?.[theme]?.color4 ?? "#1f2937"; // fallback if theme not found

  return (
    <div className={LoginWrapper}>
      <form className={LoginForm} onSubmit={handleLogin}>
        <div className={FormSection} style={{ flex: 4, alignItems: "start" }}>
          <img className={FormLogo} src="/assets/VectorFlow_black.svg" />
        </div>

        <div className={FormSection} style={{ flex: 3 }}>
          <div
            className={InputArea}
            style={assignInlineVars({ [inputFocusColorVar]: focusColor })}
          >
            <img src="/assets/img/auth/password.svg" style={{ height: 20 }} />
            <input
              className={PasswordInput}
              type="password"
              required
              autoFocus
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </div>

        <div className={FormSection} style={{ flex: 1 }}>
          <button
            className={primaryButton}
            disabled={isLoading}
            type="submit"
            style={assignInlineVars({
              [primaryBgVar]: bg,
              [primaryWidthVar]: "100%",
              [primaryHeightVar]: "40px",
              [primaryRadiusVar]: "32px",
            })}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

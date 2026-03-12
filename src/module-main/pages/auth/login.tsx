import { useTranslation } from "react-i18next";
import {
  ContainerRight,
  ChangePassText,
  CircleLogin,
  IputLogin,
  LinkRouter,
  SCButtonLogin,
  SCButtonLoginDisabled,
  SignInArea,
  SignInContainer,
  Tittle,
  FormArea,
  ButtonSubmit,
  ButtonSubmitText,
  ButtonSubmitTextLoading,
  ArrowArea,
  InputArea,
  InputAreaError,
  // CheckboxButton,
  InputGroup,
  LogoAreaLogin,
  ContainerLeft,
  RecaptchaInput,
  CaptchaContainer,
  CaptchaReload,
  inputErrorMarginVar,
} from "./styles.css";

import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../../module-main/types";
import { useLoginAccount } from "../../../module-main/services";
import {  useNavigate } from "react-router";
import { notifyError, notifySuccess, notifyWarningWithoutAutoClose } from "../../../helpers/notify";
import { useEffect, useState } from "react";
import WelcomeBoard from "./welcome-board";
import { hashPassword } from "../../../helpers/utils";
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";
import {
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useGetAllEnvironmentConfiguration } from "../../../VectorFlow/Services/MTA/MDM";
import { useDispatch } from "react-redux";
import { UPDATE_ENV_CONFIG } from "../../../redux/actions/MTA";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Link } from 'react-router-dom';
import { reloadCaptcha} from "../../../helpers/utils";

function LoginContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
   
    reloadCaptcha(setCaptchaInput);
    
    const interval = setInterval(() => {
      reloadCaptcha(setCaptchaInput);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const form = useForm<LoginRequest>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const { mutate: mutateLogin, isLoading } = useLoginAccount();
  const [captchaInput, setCaptchaInput] = useState("");
  const dispatch = useDispatch();
  const { mutateAsync: getAllEnvConfiguration } =
    useGetAllEnvironmentConfiguration();
  const getAllEnvironmentConfiguration = async () => {
    try {
      const response = await getAllEnvConfiguration();
      const configMap = response?.data?.data.reduce((map: any, item: any) => {
        map[item.ConfigKey] = item.ConfigValue;
        return map;
      }, {});
      dispatch(UPDATE_ENV_CONFIG(configMap));
    } catch (err) {
      console.error("Unexpected error in get Environment configuration:", err);
    }
  };

  const onSave = async () => {
    if (!captchaInput || !validateCaptcha(captchaInput)) {
      notifyError("Invalid Captcha. Please try again.");
      reloadCaptcha(setCaptchaInput);
      return;
    }

    const formData = getValues();
    formData.password = await hashPassword(formData.password);

    mutateLogin(formData, {
      onSuccess: (data: any) => {
        if (data?.status !== 200) {
          if (data.response.msg === "User is inactive please contact admin") {
            notifyError("User is inactive please contact admin");
          } else if (data?.status === 400) {
            notifyError(data?.error?.non_field_errors[0]);
          } else {
            notifyError("Something went wrong");
          }
          // Reload captcha
          reloadCaptcha(setCaptchaInput);
        } else {
          const url = "/landing-page";
          navigate(url, { replace: true });
          getAllEnvironmentConfiguration();
          notifySuccess(data.data?.data?.msg);
          if(data.data?.data?.wrng != null){
           notifyWarningWithoutAutoClose(data.data.data.wrng)
          }
        }
      },
      onError(error: any) {
        if (error?.code === "ERR_NETWORK") {
          notifyError(t("loginPage.notify.networkError"));
        } else {
          notifyError(error?.error?.non_field_errors[0]);
        }
        reloadCaptcha(setCaptchaInput);
      },
    });
  };

  const emailErrLen = errors?.email?.message?.length ?? 0;
  const emailAreaClass = errors.email ? InputAreaError : InputArea;
  const emailAreaVars = assignInlineVars({
    [inputErrorMarginVar]: errors.email
      ? emailErrLen > 50
        ? "2.5vh"
        : "0.3vh"
      : "0px",
  });

  const pwErrLen = errors?.password?.message?.length ?? 0;
  const pwAreaClass = errors.password ? InputAreaError : InputArea;
  const pwAreaVars = assignInlineVars({
    [inputErrorMarginVar]: errors.password
      ? pwErrLen > 50
        ? "2.5vh"
        : "0.3vh"
      : "0px",
  });

  const submitBtnClass = isLoading ? SCButtonLoginDisabled : SCButtonLogin;
  const submitTextClass = isLoading ? ButtonSubmitTextLoading : ButtonSubmitText;  

  return (
    <div className={SignInArea}>
      <div className={SignInContainer}>
        <div className={ContainerLeft}>
          <div className={CircleLogin} />
          <div className={LogoAreaLogin}>
            <img
              src="/assets/img/auth/login-left.png"
              className="icon-head left-icon"
            />
            <img
              src="/assets/img/auth/login-right.png"
              className="icon-head right-icon"
            />
            <WelcomeBoard />
          </div>
        </div>
      </div>

      <div className={SignInContainer}>
        <div className={ContainerRight}>
          <h1 className={Tittle}>{t("loginPage.title")}</h1>

          <form className={FormArea} onSubmit={handleSubmit(onSave)}>
            <div className={emailAreaClass} style={emailAreaVars}>
              <div className={InputGroup}>
                <img src="/assets/img/auth/user.svg" />
                <input
                  className={IputLogin}
                  type="text"
                  {...register("email", {
                    required: true,
                    maxLength: {
                      value: 255,
                      message: t("loginPage.validate.emailMaxLength"),
                    },
                  })}
                  placeholder={t("loginPage.placeholder.email") as string}
                />
              </div>
              <Errors errors={errors} name="email" />
            </div>

            <div className={pwAreaClass} style={pwAreaVars}>
              <div className={InputGroup}>
                <img src="/assets/img/auth/password.svg" />
                <input
                  className={IputLogin}
                  type="password"
                  {...register("password", { required: true })}
                  placeholder={t("loginPage.placeholder.password") as string}
                />
              </div>
              <Errors
                style={{ marginLeft: "30px" }}
                errors={errors}
                name="password"
              />
            </div>

            <div className={ChangePassText}>
              <Link
                className={LinkRouter}
                style={{ textAlign: "center" }}
                to="/forgot-password"
              >
                {t("loginPage.forgotPassword")}
              </Link>
            </div>

            <div className={CaptchaContainer}>
              <LoadCanvasTemplateNoReload />
              <button
                className={CaptchaReload}
                type="button"
                onClick={() => reloadCaptcha(setCaptchaInput)}
              >
                <img src="/assets/img/reload.svg" alt="Reload" />
              </button>
            </div>

            <input
              className={RecaptchaInput}
              type="text"
              placeholder="Enter the text here"
              value={captchaInput}
              onChange={(e: any) => setCaptchaInput(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(onSave)();
                }
              }}
            />

            <button className={submitBtnClass} disabled={isLoading}>
              <div className={ButtonSubmit}>
                <span className={submitTextClass}>
                  {isLoading ? "Logging in" : t("loginPage.submitBtn")}
                </span>
                {isLoading ? (
                  <div
                    style={{
                      width: "30px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <VFLoader styles={{ width: "50px", height: "50px" }} />
                  </div>
                ) : (
                  <div className={ArrowArea}>
                    <img
                      src="/assets/img/auth/arrow.svg"
                      className="arrow arrow-in"
                    />
                    <img
                      src="/assets/img/auth/arrow-hover.svg"
                      className="arrow arrow-out"
                    />
                  </div>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;

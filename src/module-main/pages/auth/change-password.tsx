import { useTranslation } from "react-i18next";

import {
  SignInArea,
  SignInContainer,
  ContainerRight,
  SuccessArea,
  SuccessIcon,
  SuccessText,
  SCButtonLogin,
  SCButtonLoginDisabled,
  ButtonSubmit,
  ButtonSubmitText,
  ButtonSubmitTextLoading,
  ArrowArea,
  Tittle,
  FormArea,
  InputArea,
  InputAreaError,
  InputGroup,
  IputLogin,
  CaptchaContainer,
  CaptchaReload,
  RecaptchaInput,
  ContainerLeft,
  CircleForgotPassword,
  LogoAreaForgotPsw,
} from "./styles.css";
import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../services";
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import WelcomeBoard from "./welcome-board";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../components/commons/LoadingSpinner";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";

function ChangePasswordContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const userId = params.get("userId");

  const [requestSend, setRequestSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    if (!token || !userId) {
      navigate("/login", { replace: true });
    }
    loadCaptchaEnginge(6);
    const interval = setInterval(() => {
      loadCaptchaEnginge(6);
    }, 120000);
    return () => clearInterval(interval);
  }, [token, userId, navigate]);

  const form = useForm<{
    new_password: string;
    confirm_password: string;
    token: string;
    uid: string;
  }>({
    mode: "onTouched",
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const { mutateAsync: mutateForgotPassword } = useChangePassword();

  const onSave = () => {
    if (!captchaInput || !validateCaptcha(captchaInput)) {
      notifyError("Invalid Captcha. Please try again.");
      setCaptchaInput("");
      return;
    }

    setLoading(true);
    let formData = getValues();
    formData = {
      ...formData,
      token: token || "",
      uid: userId || "",
    };
    mutateForgotPassword(formData, {
      onSuccess: (data: any) => {
        if (data?.status === 400) {
          notifyError(data?.response?.msg);
          loadCaptchaEnginge(6);
          setCaptchaInput("");
          setLoading(false);
          return;
        }
        notifySuccess(data?.data?.msg || "Password changed successfully");
        setRequestSend(true);
        setLoading(false);
      },
      onError: () => {
        notifyError("Something went wrong!");
        loadCaptchaEnginge(6);
        setCaptchaInput("");
        setLoading(false);
      },
    });
  };
  return (
    <div className={SignInArea}>
      {loading && <LoadingSpinner />}

      {/* Right column */}
      <div className={SignInContainer}>
        <div className={ContainerRight}>
          {requestSend ? (
            <div className={SuccessArea}>
              <img
                className={SuccessIcon}
                src="/assets/img/auth/tick-circle.svg"
              />
              <p className={SuccessText}>Password changed successfully.</p>
              <p className={SuccessText}>
                Please login again with the new password.
              </p>

              <button
                className={SCButtonLogin}
                onClick={() => navigate("/login", { replace: true })}
              >
                <div className={ButtonSubmit}>
                  <span className={ButtonSubmitText}>
                    {t("changePasswordPage.loginBtn")}
                  </span>
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
                </div>
              </button>
            </div>
          ) : (
            <>
              <h1 className={Tittle}>{t("changePasswordPage.title")}</h1>

              <form className={FormArea} onSubmit={handleSubmit(onSave)}>
                {/* New password */}
                <div
                  className={errors.new_password ? InputAreaError : InputArea}
                >
                  <div className={InputGroup}>
                    <img src="/assets/img/auth/password.svg" />
                    <input
                      className={IputLogin}
                      type="password"
                      {...register("new_password", {
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-=+{}[\]|;:'",.<>/?]).{8,}$/,
                          message: t("changePasswordPage.validate.password"),
                        },
                        validate: (value) =>
                          value.includes(" ")
                            ? (t("loginPage.validate.includeSpace") as string)
                            : true,
                      })}
                      placeholder={t("changePasswordPage.placeholder.password") as string}
                    />
                  </div>
                  <Errors errors={errors} name="new_password" />
                </div>

                {/* Confirm password */}
                <div
                  className={
                    errors.confirm_password ? InputAreaError : InputArea
                  }
                >
                  <div className={InputGroup}>
                    <img src="/assets/img/auth/password.svg" />
                    <input
                      className={IputLogin}
                      type="password"
                      {...register("confirm_password", {
                        required: true,
                        validate: (value) =>
                          value !== getValues("new_password")
                            ? (t(
                                "changePasswordPage.validate.confirmPassword"
                              ) as string)
                            : true,
                      })}
                      placeholder={t(
                        "changePasswordPage.placeholder.confirmPassword"
                      ) as string}
                    />
                  </div>
                  <Errors errors={errors} name="confirm_password" />
                </div>

                {/* Captcha */}
                <div className={CaptchaContainer}>
                  <LoadCanvasTemplateNoReload />
                  <button
                    type="button"
                    className={CaptchaReload}
                    onClick={() => {
                      loadCaptchaEnginge(6);
                      setCaptchaInput("");
                    }}
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

                {/* Submit */}
                <button
                  className={
                    loading || Object.keys(errors).length > 0
                      ? SCButtonLoginDisabled
                      : SCButtonLogin
                  }
                  disabled={loading || Object.keys(errors).length > 0}
                >
                  <div className={ButtonSubmit}>
                    {loading ? (
                      <>
                        <span className={ButtonSubmitTextLoading}>
                          Submitting...
                        </span>
                        <div
                          style={{
                            width: "30px",
                            height: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <VFLoader
                            styles={{ width: "50px", height: "50px" }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <span className={ButtonSubmitText}>
                          {t("changePasswordPage.submitBtn")}
                        </span>
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
                      </>
                    )}
                  </div>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Left column */}
      <div className={SignInContainer}>
        <div className={ContainerLeft}>
          <div className={CircleForgotPassword} />
          <div className={LogoAreaForgotPsw}>
            <img
              src="/assets/img/auth/forgot-left.png"
              className="icon-head left-icon"
            />
            <img
              src="/assets/img/auth/forgot-right.png"
              className="icon-head right-icon"
            />
            <WelcomeBoard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordContainer;

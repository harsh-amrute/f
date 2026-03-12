import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SignInArea,
  SignInContainer,
  ContainerRight,
  SuccessArea,
  SuccessIcon,
  SuccessText,
  Tittle,
  FormArea,
  InputArea,
  InputAreaError,
  InputGroup,
  IputLogin,
  CaptchaContainer,
  CaptchaReload,
  RecaptchaInput,
  SCButtonLogin,
  SCButtonLoginDisabled,
  ButtonSubmit,
  ButtonSubmitText,
  ArrowArea,
  GoBackButton,
  ContainerLeft,
  CircleForgotPassword,
  LogoAreaForgotPsw,
} from "./styles.css";
import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types";
import { useForgotPassword } from "../../services";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import WelcomeBoard from "./welcome-board";
import LoadingSpinner from "../../../components/commons/LoadingSpinner";
// eslint-disable-next-line import/no-named-as-default
import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { reloadCaptcha} from "../../../helpers/utils";

function ForgotPasswordContainer() {
  const { t } = useTranslation();
  localStorage.clear();
  const [requestSend, setRequestSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginRequest>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = form;

  const { mutateAsync: mutateForgotPassword } = useForgotPassword();

  const [message, setMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const onSave = () => {
    if (!captchaInput || !validateCaptcha(captchaInput)) {
      notifyError("Invalid Captcha. Please try again.");
      reloadCaptcha(setCaptchaInput);
      return;
    }

    setLoading(true);
    const formData = getValues();
    const data = { email: formData.email.trim() };

    mutateForgotPassword(data, {
      onSuccess: (data: any) => {
        setMessage(data?.data?.msg);
        if (data?.status === 400) {
          notifyError(data?.response?.msg[0]);
          reloadCaptcha(setCaptchaInput);
        } else {
          setRequestSend(true);
          notifySuccess("Password reset link sent to your email.");
        }
        setLoading(false);
      },
      onError: (error: any) => {
        setMessage(error?.data?.msg);
        notifyError(error?.error || "Something went wrong");
        setLoading(false);
        reloadCaptcha(setCaptchaInput);
      },
    });
  };

  useEffect(() => {
    reloadCaptcha(setCaptchaInput);
    const interval = setInterval(() => {
      reloadCaptcha(setCaptchaInput);
    }, 120000);

    return () => clearInterval(interval);
  }, []);

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
              <p className={SuccessText}>{message}</p>
            </div>
          ) : (
            <>
              <h1 className={Tittle}>{t("forgotPasswordPage.title")}</h1>

              <form className={FormArea} onSubmit={handleSubmit(onSave)}>
                {/* Email */}
                <div className={errors.email ? InputAreaError : InputArea}>
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
                      placeholder={t('forgotPasswordPage.placeholder.email') as string}
                      />
                  </div>
                  <Errors errors={errors} name="email" />
                </div>

                {/* Captcha */}
                <div className={CaptchaContainer}>
                  <LoadCanvasTemplateNoReload />
                    <button
                      type="button"
                      className={CaptchaReload}
                      onClick={()=>reloadCaptcha(setCaptchaInput)}
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
                  className={loading ? SCButtonLoginDisabled : SCButtonLogin}
                  disabled={loading}
                >
                  <div className={ButtonSubmit}>
                    <span className={ButtonSubmitText}>
                      {t("forgotPasswordPage.submitBtn")}
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

                <div
                  className={GoBackButton}
                  onClick={() => window.location.replace("/login")}
                >
                  {t("forgotPasswordPage.goBackBtn")}
                </div>
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

export default ForgotPasswordContainer;

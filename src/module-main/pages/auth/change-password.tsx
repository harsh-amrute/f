import { useTranslation } from "react-i18next";
import { ContainerRight, CircleForgotPassword, IputLogin, SCButtonLogin, SignInArea, SignInContainer, Tittle, FormArea, ButtonSubmit, ButtonSubmitText, ArrowArea, InputArea, InputGroup, LogoAreaForgotPsw, ContainerLeft, SuccessArea, SuccessIcon, SuccessText } from "./styles";
import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../services";
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import WelcomeBoard from "./welcome-board";
import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../../../components/commons/LoadingSpinner";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY} from "../../../helpers/constants";
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";

function ChangePasswordContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const userId = params.get('userId');
  const [requestSend, setRequestSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef: any = useRef();

  useEffect(() => {
    if (!token || !userId) {
      navigate('/login', { replace: true })
    }
  }, [token, userId])

  const form = useForm<{ new_password: string, confirm_password: string, token: string, uid: string }>({
    mode:"onTouched",
    defaultValues: {
      new_password: '',
      confirm_password: ''
    }
  })
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = form

  const { mutateAsync: mutateForgotPassword } = useChangePassword()

  const onSave = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    const recaptcha = localStorage.getItem("_grecaptcha");

    if (recaptchaValue || recaptcha) {

      setLoading(true)
      let formData = getValues()
      formData = {
        ...formData,
        token: token || '',
        uid: userId || ''
      }
      mutateForgotPassword(formData, {
        onSuccess: (data: any) => {
          if (data?.status === 400) {
            notifyError(data?.response?.msg)
            setLoading(false)
            return
          }
          notifySuccess(data?.data?.msg)
          setRequestSend(true)
          setLoading(false)
        },
        onError: () => {
          notifyError('Something wrong !')
          setLoading(false)
        }
      })
    } else {
      // recaptchaRef.current?.reload();
      notifyError(t("loginPage.notify.completeReCaptcha"));
    }
  }

  return (
    <SignInArea>
      {loading && <LoadingSpinner />}
      <SignInContainer>
        <ContainerRight>
          {requestSend ? (
            <SuccessArea>
              <SuccessIcon src="/assets/img/auth/tick-circle.svg" />
              <SuccessText>Password changed successfully.</SuccessText>
              <SuccessText>
                Please login again with the new password.
              </SuccessText>
              <SCButtonLogin
                onClick={() => navigate("/login", { replace: true })}
              >
                <ButtonSubmit>
                  <ButtonSubmitText>
                    {t("changePasswordPage.loginBtn")}
                  </ButtonSubmitText>
                  <ArrowArea>
                    <img
                      src="/assets/img/auth/arrow.svg"
                      className="arrow arrow-in"
                    />
                    <img
                      src="/assets/img/auth/arrow-hover.svg"
                      className="arrow arrow-out"
                    />
                  </ArrowArea>
                </ButtonSubmit>
              </SCButtonLogin>
            </SuccessArea>
          ) : (
            <>
              {/* <LogoArvind src="/assets/img/logoArvind.png" alt="logo" /> */}
              <Tittle>{t("changePasswordPage.title")}</Tittle>
              <FormArea onSubmit={handleSubmit(onSave)}>
                <InputArea
                  error={errors.new_password}
                  errorLength={errors.new_password?.message?.length}
                >
                  <InputGroup>
                    <img src="/assets/img/auth/password.svg" />
                    <IputLogin
                      type="password"
                      {...register("new_password", {
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])(?=.*[a-zA-Z]).{8,}$/,
                          message: t("changePasswordPage.validate.password"),
                        },
                        validate: (value) => {
                          if (value.includes(" ")) {
                            return (
                              t("loginPage.validate.includeSpace") ||
                              "Password mush not contain spaces."
                            );
                          }
                          return true;
                        },
                      })}
                      placeholder={t("changePasswordPage.placeholder.password")}
                    />
                  </InputGroup>
                  <Errors errors={errors} name="new_password" />
                </InputArea>

                <InputArea
                  error={errors.confirm_password}
                  errorLength={errors.confirm_password?.message?.length}
                >
                  <InputGroup>
                    <img src="/assets/img/auth/password.svg" />
                    <IputLogin
                      type="password"
                      {...register("confirm_password", {
                        required: true,
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])(?=.*[a-zA-Z]).{8,}$/,
                          message: t(
                            "changePasswordPage.validate.confirmPassword"
                          ),
                        },
                        validate: (value) => {
                          if (value !== getValues("new_password")) {
                            return (
                              t(
                                "changePasswordPage.validate.confirmPassword"
                              ) || "Passwords must match"
                            );
                          }
                          return true;
                        },
                      })}
                      placeholder={t(
                        "changePasswordPage.placeholder.confirmPassword"
                      )}
                    />
                  </InputGroup>
                  <Errors errors={errors} name="confirm_password" />
                </InputArea>

                <ReCAPTCHA
                  className="recaptcha"
                  ref={recaptchaRef}
                  // sitekey={process.env.REACT_APP_ENV === 'test' ? TEST_SITE_KEY : SITE_KEY}
                  sitekey={SITE_KEY}
                />

                <SCButtonLogin disabled={loading || Object.keys(errors).length > 0}>
                  <ButtonSubmit>
                    {loading ? (
                      <>
                        <ButtonSubmitText>Submitting...</ButtonSubmitText>
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
                        <ButtonSubmitText>
                          {t("changePasswordPage.submitBtn")}
                        </ButtonSubmitText>
                        <ArrowArea>
                          <img
                            src="/assets/img/auth/arrow.svg"
                            className="arrow arrow-in"
                          />
                          <img
                            src="/assets/img/auth/arrow-hover.svg"
                            className="arrow arrow-out"
                          />
                        </ArrowArea>
                      </>
                    )}
                  </ButtonSubmit>
                </SCButtonLogin>
              </FormArea>
            </>
          )}
        </ContainerRight>
      </SignInContainer>
      <SignInContainer>
        <ContainerLeft>
          <CircleForgotPassword />
          <LogoAreaForgotPsw>
            <img
              src="/assets/img/auth/forgot-left.png"
              className="icon-head left-icon"
            />
            <img
              src="/assets/img/auth/forgot-right.png"
              className="icon-head right-icon"
            />
            <WelcomeBoard />
          </LogoAreaForgotPsw>
        </ContainerLeft>
      </SignInContainer>
    </SignInArea>
  );
}

export default ChangePasswordContainer;
import { useRef,useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ContainerRight,
  CircleForgotPassword,
  IputLogin,
  SCButtonLogin,
  SignInArea,
  SignInContainer,
  Tittle,
  FormArea,
  ButtonSubmit,
  ButtonSubmitText,
  ArrowArea,
  InputArea,
  InputGroup,
  LogoAreaForgotPsw,
  ContainerLeft,
  GoBackButton,
  SuccessIcon,
  SuccessText,
  SuccessArea,
} from "./styles";
import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../types";
import { useForgotPassword } from "../../services";
import { notifyError } from "../../../helpers/notify";
import WelcomeBoard from "./welcome-board";
import LoadingSpinner from "../../../components/commons/LoadingSpinner";
import ReCAPTCHA from "react-google-recaptcha";
import { SITE_KEY } from "../../../helpers/constants";

function ForgotPasswordContainer() {
  const { t } = useTranslation();
  localStorage.clear();
  const [requestSend, setRequestSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef: any = useRef<any>();

  const form = useForm<LoginRequest>({
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

  const onSave = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    setLoading(true);
    const formData = getValues();
    const data = { email: formData.email.trim() };

    if (recaptchaValue) {
      mutateForgotPassword(data, {
        onSuccess: (data: any) => {
          if (data?.status === 400) {
            recaptchaRef.current?.reset();
            notifyError(data?.response?.msg[0]);
          } else {
            setRequestSend(true);
          }
          setLoading(false);
        },
        onError: (data: any) => {
          recaptchaRef.current?.reset();
          notifyError(data.error);
          setLoading(false);
        },
      });
    }
  };

  return (
    <SignInArea>
      {loading && <LoadingSpinner />}
      <SignInContainer>
        <ContainerRight>
          {requestSend ? (
            <SuccessArea>
              <SuccessIcon src="/assets/img/auth/tick-circle.svg" />
              <SuccessText>
                Password reset link successfully sent to your email ID.
              </SuccessText>
              <SuccessText>
                Please follow the steps provided on email.
              </SuccessText>
            </SuccessArea>
          ) : (
            <>
            {
              /* 
              <LogoArvind src="/assets/img/logoArvind.png" alt="logo" />          
              */
            }
              <Tittle>{t("forgotPasswordPage.title")}</Tittle>
              <FormArea onSubmit={handleSubmit(onSave)}>
                <InputArea error={errors.email}>
                  <InputGroup>
                    <img src="/assets/img/auth/user.svg" />
                    <IputLogin
                      inputType="email"
                      type="text"
                      {...register("email", {
                        required: true,
                        maxLength: {
                          value: 255,
                          message: t("loginPage.validate.emailMaxLength"),
                        },
                      })}
                      placeholder={t("forgotPasswordPage.placeholder.email")}
                    />
                  </InputGroup>
                  <Errors errors={errors} name="email" />
                </InputArea>

                <ReCAPTCHA
                  className="recaptcha"
                  ref={recaptchaRef}
                  // sitekey={process.env.REACT_APP_ENV === 'test' ? TEST_SITE_KEY : SITE_KEY}
                  sitekey={SITE_KEY}
                />

                <SCButtonLogin>
                  <ButtonSubmit>
                    <ButtonSubmitText>
                      {t("forgotPasswordPage.submitBtn")}
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

                <GoBackButton onClick={() => window.location.replace("/login")}>
                  {t("forgotPasswordPage.goBackBtn")}
                </GoBackButton>
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

export default ForgotPasswordContainer;

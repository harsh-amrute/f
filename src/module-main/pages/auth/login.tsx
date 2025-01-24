import { useTranslation } from "react-i18next";
import { ContainerRight, ChangePassText, CircleLogin, IputLogin, KeepSingIn, KeepMe, LinkRouter, SCButtonLogin, SignInArea, SignInContainer, Tittle, FormArea, ButtonSubmit, ButtonSubmitText, ArrowArea, InputArea, CheckboxButton, InputGroup, LogoAreaLogin, ContainerLeft } from "./styles";
import { Errors } from "../../../components";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../../../module-main/types";
import { useLoginAccount } from "../../../module-main/services";
import {  useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
// import { SITE_KEY,TEST_SITE_KEY } from "../../../helpers/constants";
import { SITE_KEY} from "../../../helpers/constants";
import WelcomeBoard from "./welcome-board";
import { hashPassword } from '../../../helpers/utils'
import VFLoader from "../../../components/VectorFLOW/commons/VFLoader";

function LoginContainer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if(token) {
      // const url: any = JSON.parse(localStorage?.getItem('landing_page') || "");
      const url: any = "/landing-page";
      // console.log(urlPermission);
      // const url = urlPermission.includes("/") ? "/" : urlPermission.includes('/master-data-management/control-panel') ? '/master-data-management/control-panel' : urlPermission[0]
      navigate(url, { replace: true });
    } else {
      localStorage.clear();
    }
  },[])

  const form = useForm<LoginRequest>({
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

  const { mutate: mutateLogin,isLoading } = useLoginAccount();
  const [remember, setRemember] = useState(true);
  const recaptchaRef: any = useRef();

  const onSave = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    const recaptcha = localStorage.getItem("_grecaptcha");

    if (recaptchaValue || recaptcha) {

      const formData = getValues();  
      formData.password = await hashPassword(formData.password)
      mutateLogin(formData, {
        onSuccess: (data: any) => {
          if (data?.status !== 200) {
            if(data?.status === 400){
              notifyError(data?.error?.non_field_errors[0] )
            }else{
              notifyError("Something went wrong")
            }
            recaptchaRef.current?.reset();
            localStorage.removeItem("token")
            localStorage.removeItem("url_permission")
          } else {
            // const urlPermission = data?.data?.data.url_permission;
            // const rolePermission = data?.data?.data.roles.permission;
            // const isRolePresent =  rolePermission.some((permission:any) => !permission.name.startsWith("IST"));
            // const url = urlPermission.includes("/") && isRolePresent ? "/" : !urlPermission.includes("/") && isRolePresent ? '/master-data-management/control-panel' : urlPermission[0];
            // const url = urlPermission.includes("/") && isRolePresent ? "/" : urlPermission.includes('/supply-chain-intelligence-hub/planning') ? '/supply-chain-intelligence-hub/planning' : urlPermission[0];
            // const url = data.data.data.landing_page
            const url = "/landing-page";
            console.log(url);
            navigate(url, { replace: true });
            notifySuccess(t("loginPage.notify.success"));
          }
        },
        onError(error: any) {
          notifyError(error?.error?.non_field_errors[0]);
        },
      });
    } else {
      // recaptchaRef.current?.reload();
      notifyError(t("loginPage.notify.completeReCaptcha"));
    }
  };

  return (
    <SignInArea>
      <SignInContainer>
        <ContainerLeft>
          <CircleLogin />
          <LogoAreaLogin>
            <img
              src="/assets/img/auth/login-left.png"
              className="icon-head left-icon"
            />
            <img
              src="/assets/img/auth/login-right.png"
              className="icon-head right-icon"
            />
            <WelcomeBoard />
          </LogoAreaLogin>
        </ContainerLeft>
      </SignInContainer>
      <SignInContainer>
        <ContainerRight>
          {/* <LogoArvind
            style={{ opacity: 0, visibility: "hidden" }}
            src=""
            alt="logo"
          /> */}
          <Tittle>{t("loginPage.title")}</Tittle>
          <FormArea onSubmit={handleSubmit(onSave)}>
            <InputArea error={errors.email}>
              <InputGroup>
                <img src="/assets/img/auth/user.svg" />
                <IputLogin
                  type="text"
                  {...register("email", {
                    required: true,
                    maxLength: {
                      value: 255,
                      message: t("loginPage.validate.emailMaxLength"),
                    },
                  })}
                  placeholder={t("loginPage.placeholder.email")}
                />
              </InputGroup>
              <Errors errors={errors} name="email" />
            </InputArea>
            <InputArea error={errors.password}>
              <InputGroup>
                <img src="/assets/img/auth/password.svg" />
                <IputLogin
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: t("loginPage.validate.password"),
                    },
                  })}
                  placeholder={t("loginPage.placeholder.password")}
                />
              </InputGroup>
              <Errors errors={errors} name="password" />
            </InputArea>

            <ReCAPTCHA
              className="recaptcha"
              ref={recaptchaRef}
              // sitekey={process.env.REACT_APP_ENV === 'test' ? TEST_SITE_KEY : SITE_KEY}
              sitekey={SITE_KEY}
            />

            <KeepSingIn>
              <div>
                <CheckboxButton
                  type="checkbox"
                  onChange={() => {
                    setRemember(!remember);
                  }}
                  defaultChecked={true}
                />
                <KeepMe>{t("loginPage.keepMeSignedIn")}</KeepMe>
              </div>
              <ChangePassText>
                <LinkRouter to={"/forgot-password"}>
                  {t("loginPage.forgotPassword")}
                </LinkRouter>
              </ChangePassText>
            </KeepSingIn>

            <SCButtonLogin disabled={isLoading}>
              <ButtonSubmit>
                <ButtonSubmitText isLoading={isLoading}>
                  {isLoading ? "Logging in" : t("loginPage.submitBtn")}
                </ButtonSubmitText>
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
                )}
              </ButtonSubmit>
            </SCButtonLogin>
          </FormArea>
        </ContainerRight>
      </SignInContainer>
    </SignInArea>
  );
}

export default LoginContainer;
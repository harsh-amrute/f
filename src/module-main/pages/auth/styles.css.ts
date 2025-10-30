import { style, createVar, globalStyle } from "@vanilla-extract/css";
import * as gridSystem from "../../../styles/gridSystem.css";
// import checkmarkUrl from '../../../../public/assets/img/check/checkmark.svg';

export const iconBgVar = createVar();

/* -------------------- Vars -------------------- */
export const inputErrorMarginVar = createVar();

/* -------------------- Layout -------------------- */
export const SignInArea = style({
  display: "flex",
  flexDirection: "row",
  height: "100vh",
  background:
    "transparent linear-gradient(126deg, #f8f8fc 0%, #e1e2e8 100%) 0% 0% no-repeat padding-box",
  opacity: 1,
  overflow: "hidden",
  "@media": {
    "(max-width: 768px)": { flexDirection: "column" },
  },
});
globalStyle(".spinner--dotted", { border: "5px dotted #fff" });

export const SignInContainer = style({ flex: 1, position: "relative" });

export const ContainerLeft = style({
  display: "flex",
  height: "100%",
  width: "100%",
});
export const ContainerRight = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  placeContent: "center",
  alignItems: "center",
});

/* -------------------- Background circles -------------------- */
export const CircleLogin = style({
  position: "absolute",
  width: "170%",
  height: "170%",
  background:
    "transparent linear-gradient(135deg, #000000 0%, #333333 100%) 0% 0% no-repeat padding-box",
  borderTopRightRadius: "50%",
  borderBottomRightRadius: "50%",
  top: "-65%",
  right: 0,
});

export const CircleForgotPassword = style({
  position: "absolute",
  width: "170%",
  height: "170%",
  background:
    "transparent linear-gradient(45deg, #333333 0%, #000000 100%) 0% 0% no-repeat padding-box",
  borderTopLeftRadius: "50%",
  borderBottomLeftRadius: "50%",
  top: "-65%",
  left: 0,
});

/* -------------------- Captcha -------------------- */
export const CaptchaContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 12px",
  background: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "fit-content",
  marginTop: "20px",
});

export const CaptchaReload = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#ac3072",
  border: "none",
  borderRadius: "6px",
  padding: "6px",
  cursor: "pointer",
  transition: "0.3s ease",
  ":hover": { background: "#820f4c" },
});
globalStyle(`${CaptchaReload} img`, {
  width: 20,
  height: 20,
  filter: "brightness(0) invert(1)",
});

export const RecaptchaInput = style({
  marginTop: "12px",
  padding: "10px",
  width: "50%",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  fontFamily: "Roboto, sans-serif",
  color: "#707070",
  "::placeholder": { color: "#aaa" },
  ":focus": { outline: "none", borderColor: "#ac3072" },
});

/* -------------------- Typography / inputs -------------------- */
export const Tittle = style({
  color: "#575f6b",
  fontSize: "1.8vw",
  margin: "-52px 0 0 0",
  "@media": {
    [`(min-width: ${gridSystem.size.laptop}) and (max-width: ${gridSystem.size.laptopL})`]:
      {
        margin: "-40px 0 0 0",
      },
  },
});

export const IputLogin = style({
  border: "none",
  fontWeight: 500,
  fontSize: "1.2vw",
  fontFamily: "Roboto, sans-serif",
  width: "100%",
  background: "transparent",
  color: "#707070",
  "::placeholder": { color: "#707070", fontSize: "1.2vw" },
  ":focus": { outline: "none" },
});
globalStyle(
  `${IputLogin}:-webkit-autofill, ${IputLogin}:-webkit-autofill:hover, ${IputLogin}:-webkit-autofill:focus, ${IputLogin}:-webkit-autofill:active`,
  {
    transition: "background-color 9999s ease-in-out 0s",
    WebkitTextFillColor: "#707070 !important",
  }
);

export const KeepSingIn = style({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  margin: "4vh 0 0 0",
  padding: "0 0.5rem",
});
export const KeepMe = style({
  fontSize: "0.8vw",
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif",
  letterSpacing: 0,
  color: "#707070",
});

export const ChangePassText = style({
  paddingTop: "30px",
  width: "28vw",
  marginLeft: "65px",
});

/* -------------------- Primary button (variants) -------------------- */
const baseLoginBtn = style({
  fontSize: "1vw",
  fontWeight: "bold",
  padding: "10px 0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  transition: "all 0.2s ease",
  boxShadow: "6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff",
  borderRadius: "40px",
  width: "17vw",
  height: "7vh",
  margin: "4vh 0 0 0",
  color: "#575f6b",
});
export const SCButtonLogin = style([
  baseLoginBtn,
  {
    cursor: "pointer",
    background: "#ffffff",
    selectors: {
      '&:hover': {
        background: '#ac3072',
        color: '#ffffff',
        position: 'relative',
        transition: 'all 0.9s ease',
      },
    },
  },
]);
// ⬇️ move descendant hover styles here
globalStyle(`${SCButtonLogin}:hover span`, {
  color: "#ffffff",
});

globalStyle(`${SCButtonLogin}:hover .arrow-in`, {
  display: "none",
});

globalStyle(`${SCButtonLogin}:hover .arrow`, {
  transform: "translate(30px, 0px)",
  transition: "all 0.5s ease-in",
});

globalStyle(`${SCButtonLogin}:hover .arrow-out`, {
  visibility: "visible",
});

export const SCButtonLoginDisabled = style([
  baseLoginBtn,
  { cursor: "not-allowed", background: "#E3DFDF" },
]);

export const LinkRouter = style({
  fontSize: "0.8vw",
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif",
  letterSpacing: 0,
  color: "#707070",
  textDecoration: "none",
});

/* -------------------- Form scaffold -------------------- */
export const FormArea = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
globalStyle(`${FormArea} .recaptcha`, {
  paddingTop: "0.4vh",
  margin: "4vh 0 0 0",
});

export const ButtonSubmit = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const ButtonSubmitText = style({
  marginRight: "1rem",
  color: "#575f6b",
  fontSize: "1vw",
  fontWeight: "bold",
  fontFamily: "Roboto, sans-serif",
  selectors: {
    "&:hover": { color: "#ffffff" },
  },
});
export const ButtonSubmitTextLoading = style([
  ButtonSubmitText,
  {
    color: "#808080",
    selectors: {
      "&:hover": { color: "#808080" },
    },
  },
]);
export const ArrowArea = style({ display: "flex", alignItems: "center" });

/* -------------------- Inputs group / boxes -------------------- */
export const InputArea = style({
  marginTop: "6vh",
  background:
    "transparent linear-gradient(278deg, #f2f3f6 0%, #e5e6ec 100%) 0% 0% no-repeat padding-box",
  boxShadow: "6px 6px 20px #c5c5c5, -6px -6px 20px #ffffff",
  borderRadius: "40px",
  width: "28vw",
  height: "8vh",
  border: "none",
  marginBottom: inputErrorMarginVar, // drive this with assignInlineVars
});
export const InputAreaError = style([InputArea, { border: "2px solid red" }]);

export const InputGroup = style({
  display: "flex",
  height: "100%",
  width: "100%",
  padding: "0 2vw",
  alignItems: "center",
  gap: "1.2vw",
});
globalStyle(`${InputGroup} img`, { width: "1.5vw" });

// export const CheckboxButton = style({
//   WebkitAppearance: 'none',
//   background: 'transparent linear-gradient(278deg, #f2f3f6 0%, #e5e6ec 100%) 0% 0% no-repeat padding-box',
//   padding: '0.5vw',
//   borderRadius: '2px',
//   display: 'inline-block',
//   position: 'relative',
//   top: '0.7vh',
//   right: '0.3vw',
//   boxShadow: '6px 6px 20px #c5c5c5, -6px -6px 20px #ffffff',
//   ':focus': { outline: 'none' },
//   selectors: {
//     '&:checked': {
//       backgroundImage: iconBgVar,
//       backgroundRepeat: 'no-repeat',
//       backgroundSize: '1.2vw',
//     },
//   },
// });

/* -------------------- Left visual areas -------------------- */
export const LogoVector = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  position: "relative",
  bottom: "7.5vh",
});

export const LogoAreaLogin = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  color: "#fff",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  position: "relative",
});
globalStyle(`${LogoAreaLogin} .icon-head`, { position: "absolute" });
globalStyle(`${LogoAreaLogin} .left-icon`, {
  width: "28vw",
  left: 0,
  bottom: 0,
  opacity: 0.7,
});
globalStyle(`${LogoAreaLogin} .right-icon`, {
  width: "10vw",
  right: "-10px",
  top: "32%",
  transform: "matrix(0.33, -0.95, 0.95, 0.33, 0, 0)",
  opacity: 0.9,
});

export const LogoAreaForgotPsw = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  color: "#fff",
  height: "100%",
  width: "100%",
  flexDirection: "column",
  position: "relative",
});
globalStyle(`${LogoAreaForgotPsw} .icon-head`, { position: "absolute" });
globalStyle(`${LogoAreaForgotPsw} .left-icon`, {
  width: "8vw",
  left: 0,
  top: "25%",
  opacity: 0.9,
});
globalStyle(`${LogoAreaForgotPsw} .right-icon`, {
  width: "28vw",
  right: 0,
  bottom: 0,
  opacity: 0.7,
});

export const LogoIcon = style({ width: "20vw" });
export const WelcomeText = style({
  fontSize: "1vw",
  fontWeight: 300,
  fontFamily: "Roboto, sans-serif",
  letterSpacing: 0,
  color: "#fff",
});

export const GoBackButton = style({
  fontSize: "0.8vw",
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif",
  letterSpacing: 0,
  color: "#820f4c",
  textDecoration: "none",
  margin: "4vh 0 0 0",
  cursor: "pointer",
});

export const LogoArvind = style({ marginTop: "-4vh", height: "35vh" });

/* -------------------- Success block -------------------- */
export const SuccessArea = style({
  marginBottom: "10vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
export const SuccessIcon = style({ height: "10vh", marginBottom: "2vh" });
export const SuccessText = style({ fontSize: "1vw" });

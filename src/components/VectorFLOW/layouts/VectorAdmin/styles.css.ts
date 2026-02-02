import { style, createVar } from '@vanilla-extract/css';

import * as globalStyles from "../../../../styles/global";
/* ===== Runtime vars ===== */
export const inputFocusColorVar = createVar(); // outline color on :focus-within

/* ===== Admin layout ===== */
export const AdminLayoutWrapper = style({
  padding: 20,
  height: '100vh',
  backgroundColor: 'rgba(10,10,10,0.04)',
});

export const AdminLayoutContent = style({
  backgroundColor: 'white',
  height: '100%',
  width: '100%',
  borderRadius: 16,
  boxShadow:
    'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
});

/* ===== Login page ===== */
export const LoginWrapper = style({
  width: '100%',
  height: '100vh',
  backgroundColor: '#e8e6e6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LoginForm = style({
  maxWidth: '100%',
  width: 400,
  boxShadow: 'rgba(17, 17, 26, 0.1) 0px 0px 16px',
  padding: '15px 10px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  gap: 10,
  borderRadius: 10,
});

export const FormLogo = style({
  backgroundColor: 'white',
  height: 60,
});

export const FormSection = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10,
});

export const InputArea = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  outline: '2px solid transparent',
  borderRadius: 16,
  boxShadow:
    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  background: '#F7F7F7 0% 0% no-repeat padding-box',
  opacity: 1,
  padding: '0 15px',
  transition: '0.3s ease',
  selectors: {
    '&:focus-within': {
      outlineColor: inputFocusColorVar,
    },
  },
});

export const PasswordInput = style({
  border: 'none',
  width: '100%',
  outline: 'none',
  borderRadius: 6,
  background: '#F7F7F7 0% 0% no-repeat padding-box',
  opacity: 1,
  padding: '0 15px',
  height: 39,
  transition: '0.2s ease-in-out',
  selectors: {
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },
  },
});

/* ===== Tools page ===== */
export const ToolsWrapper = style({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: 10,
});

export const ToolCard = style({
  padding: 20,
  borderRadius: 7,
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
  backgroundColor: 'rgba(1,1,1,0.06)',
});

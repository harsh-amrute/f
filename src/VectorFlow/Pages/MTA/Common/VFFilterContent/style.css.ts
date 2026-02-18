import { style, createVar, globalStyle } from '@vanilla-extract/css';

/* ========= Vars (set these from your component) ========= */
export const accentColorVar = createVar();               // REGALBLAZE / other
export const titleColorVar = createVar();                // subtitle vs title
export const titleWeightVar = createVar();
export const titleSizeVar = createVar();
export const titleFontStyleVar = createVar();

export const iconCursorVar = createVar();                // pointer / not-allowed
export const iconOpacityVar = createVar();               // 0.3 / 0.7 / 1
export const iconBorderColorVar = createVar();           // transparent / #757575 / theme
export const iconBgColorVar = createVar();               // transparent / #9e9e9e
export const iconHoverBgColorVar = createVar();          // white / #9e9e9e
export const iconHoverBorderColorVar = createVar();      // theme / #757575
export const iconActiveBorderColorVar = createVar();     // theme / #757575
export const disabledVar = createVar();      // "true" / "false"

/* ========= FilterGroup ========= */
export const filterGroup = style({
  minHeight: 80,
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'flex-start',
  gap: 20,
  padding: 0,
  marginTop: -10,
  marginLeft: 5,
  marginRight: 5,
  flexWrap: 'wrap',
});

/* ========= FilterColumn ========= */
export const filterColumn = style({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 250,
  maxWidth: 'none',
});

/* ========= MultiSelectCheckBoxComponent (theme-driven accent-color) ========= */
export const multiSelectCheckBox = style({
  marginBottom: 16,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 6,
  accentColor: accentColorVar,
});

/* ========= FilterTitle (subtitle variant via vars) ========= */
export const filterTitle = style({
  margin: '0 0 0.5rem 0',
  color: titleColorVar,
  fontWeight: titleWeightVar as unknown as any, // numeric-as-string is fine
  fontSize: titleSizeVar,
  fontStyle: titleFontStyleVar,
  fontFamily: 'Roboto, sans-serif',
});

/* ========= DropDownRow / Wrapper ========= */
export const dropDownRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'nowrap',
  width: '100%',
  boxSizing: 'border-box',
  marginBottom: 0.5,
});

export const dropDownWrapper = style({
  flex: '1',
  minWidth: 0,
  height: 50,
  boxSizing: 'border-box',
});

/* ========= TextWrapper ========= */
export const textWrapper = style({
  display: 'flex',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '24px',
  margin: '0 0 0.5rem 0',
  alignItems: 'center',
});

/* ========= IconWrapper (img states via vars) ========= */
export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 8,
  marginBottom: 11,
  gap: 8,
  // selectors: {
  //   '& img': {
  //     display: 'block',
  //     height: 24,
  //     width: 24,
  //     cursor: iconCursorVar,
  //     opacity: iconOpacityVar as unknown as any,
  //     padding: 4,
  //     border: `1px solid ${iconBorderColorVar}`,
  //     borderRadius: 4,
  //     backgroundColor: iconBgColorVar,
  //     boxSizing: 'content-box',
  //     transition: 'all 0.2s ease',
  //   },
  //   '& img:hover': {
  //     backgroundColor: iconHoverBgColorVar,
  //     border: `1px solid ${iconHoverBorderColorVar}`,
  //     opacity: iconOpacityVar as unknown as any, // keep same opacity var (e.g., 0.3 for disabled)
  //   },
  //   '& img:active': {
  //     border: `1px solid ${iconActiveBorderColorVar}`,
  //   },
  // },

  selectors: {
    // ✅ hover only when not disabled
    [`&:not([style*="${disabledVar}:true"]):hover`]: {
      background: 'white',
      borderColor: accentColorVar,
      opacity: 1,
    },

    [`&:not([style*="${disabledVar}:true"]):active`]: {
      borderColor: accentColorVar,
    },

    // ✅ disabled styles driven by var, no extra class
    [`&[style*="${disabledVar}:true"]`]: {
      cursor: 'not-allowed',
      opacity: 0.3,
      borderColor: '#757575',
      background: '#9e9e9e',
    },

    [`&[style*="${disabledVar}:true"]:hover`]: {
      background: '#9e9e9e',
      borderColor: '#757575',
      opacity: 0.3,
    },
  },

});

/* Descendant rules must be globalStyle */
globalStyle(`${iconWrapper} img`, {
  display: 'block',
  height: 24,
  width: 24,
  cursor: iconCursorVar as unknown as any,
  opacity: iconOpacityVar as unknown as any,
  padding: 4,
  border: `1px solid ${iconBorderColorVar}`,
  borderRadius: 4,
  backgroundColor: iconBgColorVar,
  boxSizing: 'content-box',
  transition: 'all 0.2s ease',
});

globalStyle(`${iconWrapper} img:hover`, {
  backgroundColor: iconHoverBgColorVar,
  border: `1px solid ${iconHoverBorderColorVar}`,
  /* keep same opacity var (e.g., 0.3 for disabled) */
  opacity: iconOpacityVar as unknown as any,
});

globalStyle(`${iconWrapper} img:active`, {
  border: `1px solid ${iconActiveBorderColorVar}`,
});


/* ========= CheckboxWrapper ========= */
export const checkboxWrapper = style({
  border: '1px solid #c7c0c0ff',
  borderRadius: 10,
  minHeight: 40,
  width: 'auto',
  padding: '2px 10px',
  fontSize: 14,
  fontFamily: 'Roboto, sans-serif',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  selectors: {
    '&:hover': {
      borderColor: '#BC3D80',
      boxShadow: '0 2px 4px rgba(188, 61, 128, 0.1)',
    },
    '&:focus-within': {
      borderColor: '#BC3D80',
      borderWidth: 2,
      outline: 'none',
    },
  },
});

/* ========= InputField ========= */
export const inputField = style({
  width: '100%',
  height: 40,
  borderRadius: 12,
  border: '1px solid #ddd', // last specified wins
  padding: '0.75rem',
  background: 'white',
  fontSize: 14,
  transition: 'border-color 0.2s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: '#B93B7E',
      boxShadow: '0 0 0 2px rgba(185, 59, 126, 0.1)',
    },
    '&::placeholder': {
      color: '#999',
    },
  },
});

/* ========= SelectField ========= */
export const selectField = style({
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #ddd',
  borderRadius: 6,
  background: 'white',
  fontSize: 14,
  transition: 'border-color 0.2s ease',
  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: '#B93B7E',
      boxShadow: '0 0 0 2px rgba(185, 59, 126, 0.1)',
    },
  },
});

/* ========= NoFiltersContainer / Icon / SubText ========= */
export const noFiltersContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  textAlign: 'center',
  height: '100%',
  width: '100%',
  marginTop: -70,
});

export const noFiltersIcon = style({
  marginBottom: 24,
  // selectors: {
  //   '& svg': { transition: 'transform 0.3s ease' },
  //   '& svg:hover': { transform: 'scale(1.05)' },
  // },
});

globalStyle(`${noFiltersIcon} svg`, {
  transition: 'transform 0.3s ease',
});

globalStyle(`${noFiltersIcon} svg:hover`, {
  transform: 'scale(1.05)',
});


export const noFiltersSubText = style({
  fontSize: 14,
  color: '#000000',
  lineHeight: 1.4,
  maxWidth: 300,
  fontFamily: `'Segoe UI', Roboto, Arial, sans-serif`,
});

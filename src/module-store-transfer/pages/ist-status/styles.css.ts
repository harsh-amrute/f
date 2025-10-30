// style.css.ts
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import * as globalStyles from '../../../styles/global';

// Row / container
export const SCIstStatusRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
  width: '100%',
});

// Table wrapper
export const SCIstStatusTable = style({
  width: '100%',
  overflow: 'auto',
  position: 'relative',
});

// Text
export const SCIstStatusText = style({
  fontSize: '1.2rem',
  color: '#b4b4b4',
  paddingBottom: '10px',
});

// Filter box
export const SCIstStatusFIlterBox = style({
  padding: '30px 15px',
  backgroundColor: globalStyles.white,
  width: '100%',
});

// Header chip
export const SCIstComponent = style({
  backgroundColor: '#b4b4b4',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  color: globalStyles.white,
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
});

// Setting panel
export const SCIstStatusSettingPanel = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

// Button
export const SCIstStatusAddButton = style({
  backgroundColor: globalStyles.white,
  fontSize: '1.2rem',
  fontWeight: 500,
  textDecoration: 'underline',
  border: 'none',
  cursor: 'pointer',
});

// Radio input (hidden)
export const SCIstStatusInput = style({
  display: 'none',
});

// Label (with active variant)
// Use a CSS var for theme accent: set `--accent` inline where you render it.
export const SCIstStatusLabel = recipe({
  base: {
    display: 'inline-flex',
    margin: '4px 0',
    position: 'relative',
    borderRadius: '2px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px 10px',
    boxSizing: 'border-box',
    border: '1px solid #929292',
    background: '#fff',
    color: '#929292',
  },
  variants: {
    active: {
      false: {},
      true: {
        background: 'var(--accent)',
        border: '1px solid var(--accent)',
        color: '#fff',
      },
    },
  },
});

export const SCIstStatusAddText = style({
  fontSize: '1.2rem',
});

export const SCIstStatusAddNew = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const AlertNoRecords = style({
  fontSize: '1.5rem',
  backgroundColor: globalStyles.mainColor,
  color: globalStyles.white,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 1rem',
  borderRadius: '0.5rem',
});

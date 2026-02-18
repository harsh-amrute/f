// styles.css.ts
import { style } from '@vanilla-extract/css';

export const DBMLayout = style({
  marginBottom: '40px',
});

const centerClickable = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
} as const;

export const DBMGraphCellRendererWrapper = style(centerClickable);
export const DBMSleepCellRendererWrapper = style(centerClickable);

export const DBMTickCellRendererWrapper = style({
  width: '201px',
  height: '49px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

export const DBMApplyNormButton = style({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '401px',
  height: '49px',
  background: '#FFFFFF 0% 0% no-repeat padding-box',
  boxShadow: '0px 6px 12px #86868629',
  borderRadius: '6px',
  opacity: 1,
  padding: '13px',
  textAlign: 'left',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '19px',
  letterSpacing: 0,
  color: '#000000',
  gap: '10px',
});

export const suggestionCategoryIcon = style({
  height: '12px',
  width: '12px',
});

export const suggestionCategoryIconRotated = style([
  suggestionCategoryIcon,
  { transform: 'rotate(90deg)' },
]);

export const ConfirmationDataTextContainer = style({
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '12px',
  fontFamily: 'Roboto',
  color: '#000000',
  opacity: 1,
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  marginTop: '26px',
});

export const ConfirmationDataButtonWrapper = style({
  marginLeft: '-140px',
  marginRight: '-140px',
  padding: '15px 20px 0 10px',
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: '1px dashed gray',
  flexDirection: 'row',
  gap: '28px',
  transform: 'scale(0.8)',
});

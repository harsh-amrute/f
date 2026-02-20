import { style } from '@vanilla-extract/css';

export const PaginationWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'inherit',
    position: 'relative',
  });
  
  export const PaginationContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: '40px',
    padding: '0 10px',
    fontSize: '13px',
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0px',
    color: 'black',
    boxShadow: '0px 6px 12px #95959529',
    borderTop: 'none',
    backgroundColor: 'white',
  });
  
  export const StatusBarLabel = style({
    display: 'flex',
    flexDirection: 'row',
    fontVariant: 'normal',
    alignItems: 'center',
    fontSize: '11px',
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0px',
    color: 'black',
  });
  
  export const StatusBarLabelLight = style({
    fontWeight: 400,
    marginLeft: '5px',
  });
  
  export const StatusBarLabelBold = style({
    fontWeight: 700,
    marginLeft: '5px',
  });
  
  export const PaginationArrowIcon = style({
    marginLeft: '5px',
    height: '10px',
    width: '10px',
  });
  
  export const PaginationArrowIconDisabled = style({
    cursor: 'not-allowed',
    opacity: 0.3,
  });
  
  export const PaginationArrowIconEnabled = style({
    cursor: 'pointer',
  });
  
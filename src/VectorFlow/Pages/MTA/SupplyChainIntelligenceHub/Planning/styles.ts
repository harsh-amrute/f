import { style } from '@vanilla-extract/css';

export const PlanningTaskBar = style({
  // border: '1px solid black',
  height: '50px',
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '0px',
  zoom: '0.8',                 // non-standard but supported by most browsers
  scrollbarWidth: 'none',      // Firefox
  selectors: {
    '&::-webkit-scrollbar': {  // Chrome/Safari/Edge
      width: '0.2px',
      display: 'none',
    },
  },
});

export const ButtonFilterWrapper = style({});

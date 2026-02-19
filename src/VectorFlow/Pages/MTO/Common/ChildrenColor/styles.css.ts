import { style, createVar } from '@vanilla-extract/css';

/* runtime var for the dot background color */
export const vDotColor = createVar();

/** Set the dot color at runtime (e.g., from props.data.clr) */
// export const setDotColor = (color: string) =>
//   assignInlineVars({ [vDotColor]: color });

export const ProcPlanningChildrenColor = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ChildrenColorCellRenderer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  marginTop: '5px',
  backgroundColor: vDotColor,
});

export const Tooltipcontainer = style({
  margin: '2px 4px',
  fontSize: '12px',
});

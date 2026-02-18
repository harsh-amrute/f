import { style, createVar } from '@vanilla-extract/css'

/** runtime var for the gradient background */
export const gradientVar = createVar()

export const ColorPriorityCellRendererWrapper = style({
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const ColorPriorityCellRenderer = style({
  position: 'relative',
  height: '70%',
  width: '90%',
  maxWidth: '150px',
  background: '#000000 0% 0% no-repeat padding-box',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      // dynamic gradient comes from gradientVar
      background: gradientVar,
    },
  },
})

import { style, styleVariants } from '@vanilla-extract/css'

const baseButton = style({
  borderRadius: '6px',
  fontSize: '1.2rem',
  lineHeight: '1.6rem',
  padding: '8px 16px',
  margin: '0 10px',
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxHeight: '46px',
  cursor: 'pointer',
})

// Instead of props.icons we use variants
export const buttonOutline = styleVariants({
  withIcon: [
    baseButton,
    {
      background: 'linear-gradient(180deg, #BC3D81 0%, #820F4C 100%)',
      color: '#fff',
      border: 'none',
    },
  ],
  withoutIcon: [
    baseButton,
    {
      background: '#F9F9F9',
      color: '#929292',
      border: '1px solid #929292',
    },
  ],
})

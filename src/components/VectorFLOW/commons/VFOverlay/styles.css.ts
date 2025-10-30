import { style } from '@vanilla-extract/css';

export const VFOverlayWrapper = style({
    position: 'fixed',
    inset: 0,                 // top:0, right:0, bottom:0, left:0
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  });
  
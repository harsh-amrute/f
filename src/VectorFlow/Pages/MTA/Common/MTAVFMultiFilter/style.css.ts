import { style, createVar } from '@vanilla-extract/css';

/* ===== createVar tokens for SidebarItem ===== */
export const sbBgVar = createVar();
export const sbColorVar = createVar();
export const sbWeightVar = createVar();
export const sbMarginRightVar = createVar();
export const sbHoverBgVar = createVar();
export const sbHoverColorVar = createVar();

/* ===== ModalContent ===== */
export const modalContent = style({
  padding: 0,
  background: '#fff',
  marginTop: 16,
  borderRadius: '0 0 12px 12px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
});

/* ===== FilterLayout ===== */
export const filterLayout = style({
  display: 'flex',
  flex: 1,
  minHeight: 680,
  minWidth: 980,
  overflow: 'hidden',
});

/* ===== SidebarSection ===== */
export const sidebarSection = style({
  width: 180,
  background: '#f8f9fa',
  borderRight: '1px solid #e9ecef',
  padding: '1rem 0',
  display: 'flex',
  flexDirection: 'column',
});

/* ===== SidebarItem (all dynamics via vars) ===== */
export const sidebarItem = style({
  padding: '0.875rem 1.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: 15,

  background: sbBgVar,
  color: sbColorVar,
  fontWeight: sbWeightVar as unknown as any,
  marginRight: sbMarginRightVar,

  selectors: {
    '&:hover': {
      background: sbHoverBgVar,
      color: sbHoverColorVar,
    },
  },
});

/* ===== ContentSection ===== */
export const contentSection = style({
  flex: 1,
  padding: '1.5rem 2rem',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
});

/* ===== FooterSection ===== */
export const footerSection = style({
  background: '#ffffff',
  padding: '0.5rem 1.6rem',
  borderTop: '1px solid #e9ecef',
  borderBottomLeftRadius: 8,
  borderBottomRightRadius: 8,
  boxShadow: '0px -2px 16px -1px rgba(0, 0, 0, 0.1)',
});

/* ===== FooterButtons ===== */
export const footerButtons = style({
  display: 'flex',
  gap: '1.5rem',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

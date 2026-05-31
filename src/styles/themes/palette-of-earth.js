/**
 * Palette of Earth Theme
 *
 * 「Palette of Earth」웹사이트 전용 다크 테마.
 * visual-direction.md 기반: 따뜻한 숯검정 베이스 위에 자연색이 빛나는 설계.
 *
 * ## 핵심 특성
 * - Dark base: #0D0C0B (따뜻한 검정, 순수 블랙 대비 자연스러움)
 * - Warm off-white text: #F0EBE3
 * - Editorial typography: Cormorant Garamond (heading) + DM Sans (body) + DM Mono (data)
 */

import { createTheme } from '@mui/material/styles';

// ============================================================
// 1. Color Tokens
// ============================================================
const palette = {
  mode: 'dark',

  primary: {
    main: '#F0EBE3',
    light: '#FFFFFF',
    dark: '#C8C2BA',
    contrastText: '#0D0C0B',
  },
  secondary: {
    main: '#8A8278',
    light: '#B0A89E',
    dark: '#504D49',
    contrastText: '#F0EBE3',
  },

  background: {
    default: '#000000',
    paper: '#111111',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#999999',
    disabled: '#555555',
  },

  divider: '#2E2C28',

  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.06)',
    selected: 'rgba(255, 255, 255, 0.10)',
    disabled: '#555555',
    disabledBackground: 'rgba(255, 255, 255, 0.04)',
    focus: 'rgba(255, 255, 255, 0.10)',
  },
};

// ============================================================
// 2. Typography
// ============================================================
const typography = {
  fontFamily: [
    '"DM Sans"',
    'Pretendard',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ].join(','),

  headingFontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
  monoFontFamily: '"DM Mono", "JetBrains Mono", monospace',

  fontSize: 14,
  htmlFontSize: 16,

  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Display — Hero 타이틀
  h1: {
    fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 'clamp(3.25rem, 8vw, 6.25rem)',
    lineHeight: 1.0,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
    fontWeight: 400,
    fontSize: 'clamp(2.75rem, 5vw, 4.25rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
    lineHeight: 1.2,
    letterSpacing: '0',
  },
  h4: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  h5: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },

  body1: {
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0',
  },
  body2: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
    letterSpacing: '0',
  },

  caption: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.08em',
  },
  overline: {
    fontFamily: '"DM Sans", Pretendard, sans-serif',
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: 2,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  button: {
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    textTransform: 'none',
  },
};

// ============================================================
// 3. Spacing & Shape
// ============================================================
const spacing = 8;
const shape = { borderRadius: 0 };

// ============================================================
// 4. Shadows
// ============================================================
const customShadows = {
  none: 'none',
  chip: '0 2px 12px rgba(0, 0, 0, 0.4)',
  card: '0 0 24px rgba(0, 0, 0, 0.5)',
  toast: '0 4px 20px rgba(0, 0, 0, 0.6)',
};

// ============================================================
// 5. Breakpoints
// ============================================================
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 768,
    lg: 1200,
    xl: 1440,
  },
};

// ============================================================
// 6. Transitions
// ============================================================
const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 300,
    standard: 600,   // 느리고 의도적인 기본값
    complex: 800,
    enteringScreen: 600,
    leavingScreen: 400,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',   // ease-out-expo (자연스러운 안착)
    easeIn: 'cubic-bezier(0.7, 0, 0.84, 0)',     // 빠르게 사라짐
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

// ============================================================
// 7. Component Overrides
// ============================================================
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#000000',
        color: '#FFFFFF',
        scrollbarWidth: 'thin',
        scrollbarColor: '#2E2C28 #0D0C0B',
        '&::-webkit-scrollbar': { width: 6 },
        '&::-webkit-scrollbar-track': { background: '#0D0C0B' },
        '&::-webkit-scrollbar-thumb': {
          background: '#2E2C28',
          borderRadius: 3,
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 0, textTransform: 'none' },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: '#1A1917',
        border: '1px solid #2E2C28',
        borderRadius: 4,
        fontSize: '0.75rem',
        fontFamily: '"DM Mono", monospace',
      },
    },
  },
};

// ============================================================
// Theme 생성
// ============================================================
const paletteOfEarthTheme = createTheme({
  palette,
  typography,
  spacing,
  shape,
  breakpoints,
  transitions,
  components,
});

paletteOfEarthTheme.customShadows = customShadows;

export default paletteOfEarthTheme;
export { palette, typography, customShadows };

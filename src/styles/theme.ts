export const theme = {
  colors: {
    // Primary colors
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrast: '#ffffff',
    },
    // Secondary colors
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrast: '#ffffff',
    },
    // Neutral colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    // Semantic colors
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrast: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrast: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrast: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrast: '#ffffff',
    },
    // Background colors
    background: {
      default: '#ffffff',
      paper: '#ffffff',
      popover: '#ffffff',
    },
    // Text colors
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#9e9e9e',
    },
    // Border colors
    border: {
      light: '#e0e0e0',
      main: '#bdbdbd',
      dark: '#9e9e9e',
    },
    // Holiday specific colors
    holiday: {
      background: '#e3f2fd',
      border: '#90caf9',
      text: '#1976d2',
    },
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  // Typography
  typography: {
    fontFamily: 'inherit',
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      md: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  // Spacing
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '2.5rem', // 40px
  },
  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },
  // Shadows
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    popover: '0 2px 16px rgba(0, 0, 0, 0.15)',
    modal: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  // Z-index
  zIndex: {
    modal: 1000,
    popover: 100,
    tooltip: 800,
  },
} as const;

export type Theme = typeof theme;

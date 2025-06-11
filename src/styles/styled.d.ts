import 'styled-components';
import type { Theme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      background: {
        default: string;
        paper: string;
        popover: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      border: {
        light: string;
        main: string;
      };
      neutral: {
        [key: number]: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
      };
      holiday: {
        text: string;
        background: string;
        border: string;
      };
      overlay: string;
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      fontWeight: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
      popover: string;
      modal: string;
    };
    zIndex: {
      modal: number;
      popover: number;
    };
  }
}

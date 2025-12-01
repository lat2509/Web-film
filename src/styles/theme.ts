import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// 1. MODULE AUGMENTATION
declare module "@mui/material/styles" {
  interface Theme {
    gradients: {
      searchButton: string;
      heroOverlay: string;
      trailerOverlay: string;
    };
  }
  interface ThemeOptions {
    gradients?: {
      searchButton?: string;
      heroOverlay?: string;
      trailerOverlay?: string;
    };
  }

  interface Palette {
    custom: {
      lightGreen: string;
      lightBlue: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      lightGreen?: string;
      lightBlue?: string;
    };
  }
}

// 2. DEFINE COLORS
const COLORS = {
  primaryMain: "#032541",
  secondaryMain: "#01b4e4",
  successMain: "#22c55e",
  textSecondary: "#757575",
  lightGreen: "#1ed5a9",
  lightBlue: "#01b4e4",
};

// 3. CREATE THEME
let theme = createTheme({
  palette: {
    primary: {
      main: COLORS.primaryMain,
      contrastText: "#ffffff",
    },
    secondary: {
      main: COLORS.secondaryMain,
    },
    success: {
      main: COLORS.successMain,
    },
    text: {
      primary: "#000000",
      secondary: COLORS.textSecondary,
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    custom: {
      lightGreen: COLORS.lightGreen,
      lightBlue: COLORS.lightBlue,
    },
  },

  gradients: {
    searchButton: `linear-gradient(to right, ${COLORS.lightGreen} 0%, ${COLORS.lightBlue} 100%)`,
    heroOverlay: "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0))",
    trailerOverlay: "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: "8px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

// Tự động chỉnh font size theo màn hình (Responsive)
theme = responsiveFontSizes(theme);

export default theme;

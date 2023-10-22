import { Components, Theme } from "@mui/material";

/**
 * MUI Components whose styles are override as per theme
 */
export const componentStyleOverrides = () => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          label: {
            color: "rgba(0,0,0, .6)",
          },
          input: {
            color: "black",
          },
          div: {
            "&:hover": {
              borderColor: "black !important",
            },
            "&::before": {
              content: "''",
              borderColor: "rgba(0,0,0, .7) !important",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "unset",
          color: "unset",
          "&:hover": {
            background: "unset !important",
            boxShadow: "unset",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#AAA",
          paddingRight: 10,
          transition: "0.15s",
          svg: {
            width: 20,
            height: 20,
          },
          "&:hover": {
            color: "#FFF",
          },
        },
      },
    },
    MuiTypography: {},
  } as Components<Omit<Theme, "components">>;
};

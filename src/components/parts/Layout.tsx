import { useMemo } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { THEME } from "../../constants";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const { children } = props;
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: true ? "dark" : "light",
          primary: THEME.primary,
          secondary: THEME.secondary,
        },
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {children}
        {/* <Footer /> */}
      </Container>
    </ThemeProvider>
  );
}

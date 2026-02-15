import MainContent from "./Component/MainContent";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import useThemeMode from "./hooks/useThemeMode";
import { getTheme } from "./theme/theme";
import "./App.css";

function App() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Container maxWidth="xl">
          <MainContent toggleTheme={toggleTheme} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

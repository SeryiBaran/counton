import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { GlobalStyle } from "@/styles/global";

import { Index } from "@/components/Index";
import { Balance } from "@/components/Balance";

import { Header } from "@/components/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />}></Route>
              <Route path="/balance">
                <Route path=":wallet" element={<Balance />} />
              </Route>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

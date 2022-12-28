import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";
import { wrapper } from "../store/auth/store";
import { Provider } from "react-redux";
import { HMSRoomProvider } from "@100mslive/react-sdk";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Provider store={store}>
          <HMSRoomProvider>
            <Component {...pageProps} />
          </HMSRoomProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App);

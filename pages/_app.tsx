import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";
import { wrapper } from "../store/auth/store";
import { Provider } from "react-redux";
import { HMSRoomProvider } from "@100mslive/react-sdk";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <Provider store={store}>
        <HMSRoomProvider>
          <Component {...pageProps} />
        </HMSRoomProvider>
      </Provider>
    </>
  );
};

export default appWithTranslation(App);

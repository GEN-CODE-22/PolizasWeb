import { ThemeProvider } from "@/components/Shared/theme-provider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux";
import GlobalDrawer from "@/components/Shared/drawer-views/container";

import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  {
    ssr: false,
  }
);

export default function App({ Component, ...pageProps }: AppProps) {
  return (
    <HydrationOverlay>
      <SessionProvider>
        <ThemeProvider>
          <Provider store={store}>
            <Component {...pageProps} />
            <GlobalDrawer />
            <Toaster containerStyle={{ zIndex: 99999 }} />
          </Provider>
        </ThemeProvider>
      </SessionProvider>
    </HydrationOverlay>
  );
}

import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Header } from "components/layout/header";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;

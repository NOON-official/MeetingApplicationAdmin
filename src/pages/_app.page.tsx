import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "@/store";
import JwtProvider from "@/providers/JwtProvider";
import AuthProvider from "@/providers/AuthProvider";
import theme from "../styles/theme";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>미팅학개론 관리자</title>
        <meta name="description" content="미팅학개론 관리자 전용 페이지" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ConfigProvider>
        <JwtProvider />
      </Provider>
    </>
  );
}

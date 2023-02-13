
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../styles/theme';
import 'antd/dist/reset.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>미팅학개론 관리자</title>
        <meta name="description" content="미팅학개론 관리자 전용 페이지" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ConfigProvider theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}

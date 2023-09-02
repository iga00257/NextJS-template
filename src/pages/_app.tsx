import type { AppProps } from "next/app";
import "@/styles/main.scss";
import "@/styles/Icon/index.scss";
import "@/styles/motion/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

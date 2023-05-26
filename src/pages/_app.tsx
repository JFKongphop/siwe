import type { AppProps } from 'next/app';
import { Session } from "next-auth"
import { SessionProvider } from 'next-auth/react';
import { WagmiConfig, createConfig, configureChains  } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import * as allChains from '@wagmi/core/chains'
 

const { publicClient } = configureChains(
  Object.values(allChains), 
  [publicProvider()]
);

const config = createConfig({
  autoConnect: false,
  publicClient,
});


export default function App({ Component, pageProps }: AppProps<{session: Session}>) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  )
}
import "@/styles/globals.css"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import Head from "next/head"

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <link rel="shortcut icon" href="/robot-svg.svg" type="image/x-icon" />
                <title>{"Decentralized Autonomous Lottery"}</title>
                <meta name="title" content="Decentralized Autonomous Lottery" />
                <meta name="description" content="Decentralized Autonomous Lottery" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Decentralized Autonomous Lottery" />
                <meta property="og:description" content="Decentralized Autonomous Lottery" />
                <meta property="og:image" content="/robot-svg.svg" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Component {...pageProps} />
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

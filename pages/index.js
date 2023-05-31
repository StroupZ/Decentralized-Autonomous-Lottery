import LotteryEntrance from "../components/LotteryEntrance"
import ConnectWallet from "../components/ConnectWallet"
import Clock from "../components/Clock"
import Header from "../components/Header"
import Footer from "../components/Footer"
import About from "../components/About"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "../constants/constantsIndex"
import { useState } from "react"

export default function Home() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [closed, setClosed] = useState(true)
    const [showAbout, setShowAbout] = useState(false)
    const [updateUi, setUpdateUi] = useState(false)

    function hideAbout() {
        setShowAbout(false)
    }

    return (
        <div>
            <About showAbout={showAbout} onClose={hideAbout} />
            <div className="flex flex-col bg-[#f5f5f5] min-h-screen min-w-screen relative overflow-hidden">
                <img
                    src="./eth-pattern.jpg"
                    className="absolute opacity-20 left-0 top-0 min-w-[1600px] h-auto"
                ></img>
                <div className="relative">
                    <Header setShowAbout={setShowAbout} />
                    <div>
                        {isWeb3Enabled ? (
                            raffleAddress ? (
                                <div className="flex-1 flex-col p-2">
                                    <div className="flex-1">
                                        <LotteryEntrance closed={closed} updateUi={updateUi} />
                                    </div>
                                    <div className="mt-6 mb-24">
                                        <Clock setClosed={setClosed} setUpdateUi={setUpdateUi} />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center mb-48">
                                    <div className="flex text-center text-xl text-blue-500 mt-36 bg-[#f5f7fd] shadow-md py-5 px-14 border-t-[#dfe7fb] border-l-[#dfe7fb] border-b-[#a0b3f2] border-r-[#a0b3f2] border-4 font-textMeOne italic">
                                        Network not currently supported...<br></br>Please switch to
                                        Goerli Testnet
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="flex-1 mb-48">
                                <ConnectWallet />
                            </div>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

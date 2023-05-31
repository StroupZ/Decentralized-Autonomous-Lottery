import { ConnectButton } from "web3uikit"

export default function ConnectWallet() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col items-center mt-36 bg-[#f5f7fd] shadow-md py-5 px-14 border-t-[#dfe7fb] border-l-[#dfe7fb] border-b-[#a0b3f2] border-r-[#a0b3f2] border-4">
                <div className="text-center text-xl text-blue-500 mb-5 font-textMeOne italic">
                    Web3 Not Currently Detected...<br></br>Please Connect Wallet<br></br>
                </div>
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

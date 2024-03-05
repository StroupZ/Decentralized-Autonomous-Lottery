import { abi, contractAddresses } from "../constants/constantsIndex"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance({ closed, updateUi }) {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("")
    const [jackpot, setJackpot] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()
        const totalJackpot =
            ethers.utils.formatUnits(entranceFeeFromCall, "ether").toString() *
            numPlayersFromCall.toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        setJackpot(totalJackpot)
    }

    useEffect(() => {
        if (
            window.ethereum.on("chainChanged", () => {
                window.location.reload()
            })
        ) {
        }
    }, [])

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled, updateUi])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
        })
    }

    return (
        <div className="p-5 flex justify-center text-center">
            <div className="space-y-10">
                <div className="relative">
                    <div className="absolute -inset-1 bg-indigo-400 blur"></div>
                    <div className="info-container relative">
                        <div className="relative">
                            <div className="info">
                                <h2 className="text-l text-left italic">Entrance Fee</h2>
                                <p className="text-2xl font-bold font-bungeeHairline text-blue-500">
                                    {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                                </p>
                            </div>
                            <div className="info">
                                <h2 className="text-l text-left italic">Number of Players</h2>
                                <p className="text-2xl font-bold font-bungeeHairline text-blue-500">
                                    {numPlayers}
                                </p>
                            </div>
                            <div className="info">
                                <h2 className="text-l text-left italic">Current Jackpot</h2>
                                <p className="text-2xl font-bold font-bungeeHairline text-blue-500">
                                    {jackpot} ETH
                                </p>
                            </div>
                            <div className="info">
                                <h2 className="text-l text-left italic">Recent Winner</h2>
                                <p className="text-2xl font-bold px-8 min-[450px]:px-16 font-bungeeHairline text-blue-500">
                                    {recentWinner.slice(0, 6)}...
                                    {recentWinner.slice(recentWinner.length - 4)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded-lg ml-auto font-bungeeHairline"
                    onClick={async function () {
                        await enterRaffle({
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error),
                        })
                    }}
                    disabled={isLoading || isFetching || closed}
                >
                    {isLoading || isFetching ? (
                        <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                    ) : closed ? (
                        <div>Please Wait</div>
                    ) : (
                        <div className="animate-pulse">Enter Lottery</div>
                    )}
                </button>
            </div>
        </div>
    )
}

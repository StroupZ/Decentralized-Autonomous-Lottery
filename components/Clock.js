import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants/constantsIndex"
import { useEffect, useState } from "react"

export default function Clock({ setClosed, setUpdateUi }) {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [deadline, setDeadline] = useState(0)
    const { runContractFunction: getExpiration } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getExpiration",
        params: {},
    })

    async function callExpiration() {
        const expirationFromCall = (await getExpiration()).toString()
        setDeadline(expirationFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            callExpiration()
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        if (isWeb3Enabled && days + hours + minutes + seconds <= 0) {
            const interval = setInterval(() => callExpiration(), 120000)
            return () => clearInterval(interval)
        }
    }, [isWeb3Enabled])

    function getTime() {
        const time = deadline - new Date().getTime() / 1000
        setDays(Math.floor(time / (60 * 60 * 24)))
        setHours(Math.floor((time / (60 * 60)) % 24))
        setMinutes(Math.floor((time / 60) % 60))
        setSeconds(Math.floor(time % 60))
        if (days + hours + minutes + seconds <= 0) {
            setClosed(true)
            setUpdateUi(true)
        } else {
            setClosed(false)
            setUpdateUi(false)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            const interval = setInterval(() => getTime(), 1000)
            return () => clearInterval(interval)
        }
    }, [isWeb3Enabled, callExpiration])

    if (days + hours + minutes + seconds <= 0) {
        return (
            <div>
                <h2 className="text-blue-500 text-center animate-bounce font-textMeOne italic">
                    Maintenance in Progress... Entry is Temporarily <b>CLOSED</b>
                </h2>
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <div className="timer animate-pulse">0</div>
                        <div className="timer-label">Days</div>
                    </div>
                    <div className="flex-1">
                        <div className="timer animate-pulse">0</div>
                        <div className="timer-label">Hours</div>
                    </div>

                    <div className="flex-1">
                        <div className="timer animate-pulse">0</div>
                        <div className="timer-label">Minutes</div>
                    </div>

                    <div className="flex-1">
                        <div className="timer animate-pulse">0</div>
                        <div className="timer-label">Seconds</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h2 className="text-blue-500 font-textMeOne italic text-center ">
                    Time Remaining Until Drawing
                </h2>
                <div className="flex space-x-3">
                    <div className="flex-1">
                        <div className="timer">{days}</div>
                        <div className="timer-label">Days</div>
                    </div>
                    <div className="flex-1">
                        <div className="timer">{hours}</div>
                        <div className="timer-label">Hours</div>
                    </div>

                    <div className="flex-1">
                        <div className="timer">{minutes}</div>
                        <div className="timer-label">Minutes</div>
                    </div>

                    <div className="flex-1">
                        <div className="timer">{seconds}</div>
                        <div className="timer-label">Seconds</div>
                    </div>
                </div>
            </div>
        )
    }
}

import { Modal } from "web3uikit"

export default function About({ showAbout, onClose }) {
    return (
        <Modal
            onClick={onClose}
            id="AboutModal"
            hasFooter={false}
            isVisible={showAbout}
            isCentered={true}
            onCloseButtonPressed={onClose}
            customize={{ className: "bg-red-500" }}
            title={
                <div className="mt-64 min-[450px]:mt-2 flex flex-grow text-3xl font-bungeeHairline font-bold text-center justify-center text-blue-500">
                    Hi! I'm DAL...
                </div>
            }
        >
            <div className="mb-10 font-textMeOne text-lg font-bold">
                ...a decentralized autonomous lottery. I programmatically initiate and conclude
                lotteries in succession over a specified period of time. Once the time is up for a
                given lottery, Chainlink Automation will begin maintenance to end the previous
                lottery and begin another. During this time, Chainlink VRF is utilized to pick a
                winner in a way that is verifiably random. At this stage, the lucky entrant will
                have the jackpot deposited into their wallet automatically. All of my source code
                is public, transparent, and immutable, as it is written in blockchain based smart
                contracts. As a user, all you need to worry about is how many times you would like
                to enter.
            </div>
        </Modal>
    )
}

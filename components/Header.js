import { ConnectButton } from "web3uikit"
import Typed from "typed.js"
import React from "react"
import { useState } from "react"

export default function Header({ setShowAbout }) {
    const [clicked, setClicked] = useState(false)
    const el = React.useRef(null)
    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "<span>Hello,&nbsp</span> <span>I&apos;m&nbsp</span> <span><span style='font-size:50px;color:blue'>DAL</span>...</span>",
                "<span><span style='font-size:50px;color:blue'>D</span>ecentralized&nbsp</span> <span><span style='font-size:50px;color:blue'>A</span>utonomous&nbsp</span> <span><span style='font-size:50px;color:blue'>L</span>ottery</span>",
            ],
            showCursor: window.innerWidth > [1346] ? true : false,
            fadeOut: true,
            typeSpeed: 50,
            onComplete: (self) => {
                self.cursor ? self.cursor.remove() : null
            },
        })
        return () => {
            typed.destroy()
        }
    }, [clicked])

    function handleClick() {
        const isClicked = !clicked
        setClicked(isClicked)
    }

    function aboutClick() {
        setShowAbout(true)
    }

    return (
        <div className="p-5 m-3 shadow-md border-4 border-4 border-t-[#dfe7fb] border-l-[#dfe7fb] border-b-[#a0b3f2] border-r-[#a0b3f2] flex flex-col min-[890px]:flex-row bg-[#f5f7fd] max-[570px]:items-center">
            <h1 className="py-4 px-4 flex flex-col min-[570px]:flex-row text-2xl min-[450px]:text-4xl font-bold font-bungeeHairline text-slate-500 items-center">
                <img
                    className="min-[1346px]:w-[50px] min-[1346px]:h-[50px] w-[100px] h-[100px] mr-5 max-[890px]:mb-5 hover:scale-125 cursor-pointer"
                    src="./robot-svg.svg"
                    onClick={handleClick}
                />
                <span ref={el} className="flex flex-col min-[1346px]:flex-row" />
            </h1>
            <div className="min-[571px]:ml-auto py-2 px-4 flex flex-col items-center">
                <ConnectButton moralisAuth={false} />
                <div
                    onClick={aboutClick}
                    className="mt-2 font-bungeeHairline italic font-bold text-blue-500 cursor-pointer hover:scale-110"
                >
                    About DAL
                </div>
            </div>
        </div>
    )
}

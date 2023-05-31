export default function Footer() {
    return (
        <footer className="border-t border-blue-500/20 flex items-center text-white justify-center p-5">
            <img
                className="h-10 w-10 filter hue-rotate-80 opacity-20 rounded-full"
                src="https://icon-library.com/images/announcement-icon/announcement-icon-16.jpg"
                alt="disclaimer"
            />

            <p className="text-xs text-indigo-200 flex text-center pl-5">
                DISCLAIMER: This website is published by the developer and is designed for academic
                and display purposes only. While it is fully functional, the developer takes no
                responsibility for any loss that may occur when using this website.
            </p>
        </footer>
    )
}


import lapBook from "../assets/laptop.jpg"
import {Link} from "react-router-dom"

export default function Home() {
    return (
        <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${lapBook})` }}>
            {/* Overlay to make text more readable */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Text Section */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                    Welcome to Cerebro
                </h1>
                <p className="text-lg lg:text-2xl mb-6 drop-shadow-lg">
                    Where excelent meets knowledge and something great happens.
                </p>
                <Link className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300 shadow-lg" to="/registration">
                    Get Started
                </Link>
            </div>
        </div>
    )
}
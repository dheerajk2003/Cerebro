import { Outlet, Link } from "react-router-dom"
import GreenImg from "../assets/Green.jpg"
import logo from "../assets/logo.png"
import mute from "../assets/mute.png"
import unmute from "../assets/unmute.png"
import music from "../assets/music.mp3"
import { useRef } from "react"
import { useState, useEffect } from "react"

export default function Nav() {

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Increment the timer every second
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Calculate hours and minutes from the total seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Pause the audio
        } else {
            audioRef.current.play(); // Play the audio
        }
        setIsPlaying(!isPlaying); // Toggle the play/pause state
    };
    return (
        <>


            <nav className="bg-white border-gray-200 dark:bg-gray-900 absolute top-0 left-0 w-full z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8 bg-white h-12" alt="Flowbite Logo" />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={GreenImg} alt="user photo" />
                        </button>
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" to="/" >Home</Link>
                                </li>
                                <li>
                                    <Link to="/todo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Todo</Link>
                                </li>
                                <li>
                                    <Link to="/notes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Akatsuki AI</Link>
                                </li>
                                <li>
                                    <Link to="/walloffame" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wall of Fame</Link>
                                </li>
                            </ul>
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                        <div>
                            <audio ref={audioRef} src={music} loop />

                            {/* Play/Pause button */}
                            <button
                                onClick={handlePlayPause}
                                className="py-2 rounded absolute right-5 top-3"
                            >
                                {isPlaying ? <img src={unmute} className="h-6" /> : <img src={mute} className="h-6" />}
                            </button>
                        </div>
                        <div className="flex justify-center items-center h-16">
                            <div className="text-xl font-bold text-red-800">
                                {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/" className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500" aria-current="page" to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/todo" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Todo</Link>
                            </li>
                            <li>
                                <Link to="/notes" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Akatsuki AI</Link>
                            </li>
                            <li>
                                <Link to="/walloffame" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Wall of Fame</Link>
                            </li>
                            <li>
                                <Link to="/test" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Test</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet></Outlet>
        </>
    )
}
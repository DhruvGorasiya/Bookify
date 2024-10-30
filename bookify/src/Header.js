import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 p-5 flex justify-between items-center bg-white shadow-md max-w-full mx-auto rounded-full">
            <a href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                </div>
                <span className="font-bold text-2xl text-gray-800">Bookify</span>
            </a>

            <div className="flex gap-3 bg-gray-100 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-700">Anywhere</div>
                </div>
                <div className="border border-gray-300 h-6 mx-2"></div>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-700">Any week</div>
                </div>
                <div className="border border-gray-300 h-6 mx-2"></div>
                <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-700">Add guests</div>
                </div>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full transition-transform duration-200 transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>

            <Link to={"/login"} className="flex items-center gap-3 bg-gray-100 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="w-8 h-8 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            </Link>
        </header>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-green-800 bg-green-900/95 shadow-[0_0_60px_-15px_rgba(96,165,259,0.3)] backdrop-blur-2xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-[4rem] flex-wrap items-center justify-between gap-x-4 gap-y-3 py-2 md:min-h-[5rem]">
                    {/* logo */}
                    <Link
                        to="/"
                        className="dynamic-gradient relative order-1 overflow-hidden rounded-2xl p-1 transition-transform duration-300 hover:scale-105 md:order-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            background: isHovered
                                ? `radial-gradient(circle at var(--mouse-x) var(--mouse-y), #3b82f6, #1d4ed8)`
                                : "linear-gradient(45deg, #10b981, #059669)",
                        }}
                    >
                        <div className="rounded-xl bg-green-900/80 p-2 backdrop-blur-sm">
                            <h1 className="bg-gradient-to-r from-cyan-300 via-green-400 to-green-300 bg-clip-text text-lg font-bold text-transparent md:text-2xl">
                                📚 Book Club
                            </h1>
                        </div>
                    </Link>

                    {/* CTA Button */}
                    <div className="order-4">
                        <Link
                            to="/login"
                            className="rounded bg-gradient-to-r from-green-500 to-green-700 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-800 hover:to-green-700"
                        >
                            Login
                        </Link>{" "}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="order-2 md:hidden">
                        <button className="text-green-100 transition-colors duration-200 hover:text-cyan-300">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

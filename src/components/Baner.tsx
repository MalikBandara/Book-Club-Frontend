
import { Link } from "react-router-dom";
import bannerImage from "../assets/imgbg.png";

const Banner = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-white text-gray-800">
            {/* Optional soft glowing background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300/10 via-white/10 to-transparent"></div>

            <div className="relative z-10 container mx-auto flex min-h-screen items-center px-6">
                <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Left Text Content */}
                    <div className="flex flex-col justify-center space-y-6 pl-[250px]">
                        <h1 className="font-serif text-3xl leading-tight font-extrabold text-green-700 md:text-4xl">
                            Welcome to Book Club <br /> <span className="text-emerald-600">Library</span>
                        </h1>

                        <p className="text-md max-w-md text-gray-700">
                            This is the official homepage of our Book Club Library — your gateway to a world of books, ideas, and shared reading
                            experiences. Whether you're a staff member managing records or a reader diving into new titles, everything starts here.
                        </p>

                        <p className="max-w-md text-lg text-gray-600">Explore our collection with dynamic previews and immersive interaction.</p>

                        <Link to='/signup' className="flex w-fit items-center gap-2 rounded bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-2 font-medium text-white shadow-md transition hover:scale-105 hover:from-green-700 hover:to-emerald-800">
                            <i className="fa-solid fa-user-shield"></i>
                            Continue as Staff
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={bannerImage}
                            alt="Book"
                            className="w-[400px] drop-shadow-[0_0_25px_rgba(34,197,94,0.5)] md:w-[500px] lg:w-[600px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

import React from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Baner";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-green-900">
            <NavBar />
            <Banner />
        </div>
    );
};

export default HomePage;

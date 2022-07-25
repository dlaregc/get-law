import React from "react";
import { Link } from "react-router-dom";


function Slider() {
    return (
        <div className="bg-zinc-800 h-screen w-screen flex justify-center overflow-y-hidden overflow-x-hidden">
            <div className="translate-y-1/2 text-center">
                <h1 className="text-9xl font-bold text-white drop-shadow-lg uppercase">
                    GETLAW
                </h1>
                <p className="text-5xl font-bold text-white drop-shadow-lg mt-20">
                    Matching you with the best lawyers
                </p>
                <div className="space-x-96 mt-64">
                    <Link to="/login" className="text-white text-4xl font-bold drop-shadow-xl">
                        Login
                    </Link>
                    <Link to="/register" className="text-white text-4xl font-bold drop-shadow-xl">
                        Register
                    </Link>
                </div>
            </div>
            
        </div>
    );
}

export default Slider;
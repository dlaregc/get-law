import React from "react";
import Header from "../../nav/Header";
import Footer from "../../nav/Footer";
import { AcademicCapIcon, UserIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function RegistrationDirectory() {

    return (
        <>
            <Header/>
            <div className="grid grid-cols-8">
                <div className="row-span-full h-screen col-span-4 col-start-1 flex justify-center bg-slate-900 hover:bg-slate-700 transition ease-in delay-100">
                    <Link to="/client-registration" className="flex items-center justify-center w-full text-gray-500 text-7xl font-bold hover:scale-125 drop-shadow-lg hover:text-white hover:no-underline">
                        <span className="text-center">
                            Client
                        </span>
                        <UserIcon className="inline-flex align-text-bottom w-20 h-20 m-1"/>
                    </Link>
                </div>
                <div className="row-span-full h-screen col-span-4 col-start-5 flex justify-center bg-zinc-900 hover:bg-zinc-700 transition ease-in delay-100">
                    <Link to="/lawyer-registration" className="flex items-center justify-center w-full text-gray-500 text-7xl font-bold hover:scale-125 drop-shadow-lg hover:text-white hover:no-underline">
                        <span className="text-center">
                            Lawyer
                        </span>
                        <AcademicCapIcon className="inline-flex align-text-bottom w-20 h-20 m-1"/>
                    </Link>
                </div>
                <div className="row-span-full col-span-2 col-start-4 text-center p-20 drop-shadow-lg">
                    <h1 className="text-white font-bold text-6xl">
                        What are you?
                    </h1>
                </div>
            </div>
            <Footer/>   
        </>
    );
}

export default RegistrationDirectory;
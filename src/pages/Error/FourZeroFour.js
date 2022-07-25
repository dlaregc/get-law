import React from "react";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";

export default function FourZeroFour() {
    return (
        <>
            <Header/>
                <div className="h-screen w-screen flex justify-center bg-stone-700 overflow-hidden">
                    <p className="text-center translate-y-1/2 text-5xl font-bold text-white drop-shadow-lg">
                        404 Error: Page does not exist :(
                    </p>
                </div>
            <Footer/>
        </>
        
    )
}
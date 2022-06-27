import React from "react";

import Header from "../../nav/Header";
import Footer from '../../nav/Footer';
import LoginWindow from "./LoginWindow";

function Login() {
    return (
        <>
            <Header/>
            <div className="flex h-screen">
                <div className="grid grid-cols-2">
                    <div className="col-span-1">
                        <LoginWindow/>
                    </div>
                    <img className="object-cover col-span-1 h-screen w-screen" src="/images/login1.jpg" alt="" />
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Login;
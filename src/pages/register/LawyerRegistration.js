import React, {useState, useEffect} from "react";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";


function LawyerRegistration() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPasswordl] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    return (
        <>
            <Header/>
            <div className="flex h-screen w-screen bg-zinc-800" >
                <img className="relative flex bg-cover grayscale mix-blend-overlay w-screen" src="/images/lawyer-registration-bg.jpg" alt="" />
                <div className="absolute p-3">
                    <h1 className="text-white w-screen text-center text-4xl font-bold drop-shadow-lg"> 
                        Lawyer
                    </h1>
                </div>
                <div className="flex absolute h-screen w-screen items-center justify-center">
                    <div className="mt-4">
                        <div className="rounded-md">
                            <div>
                                <label className="text-white">
                                    First Name
                                </label>
                                <input
                                    placeholder="First Name"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LawyerRegistration;
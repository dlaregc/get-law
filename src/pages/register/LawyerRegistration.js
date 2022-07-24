import React, {useState, useEffect} from "react";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";
import { registerLawyer, registerWithEmailAndPassword } from "../../firebase";


function LawyerRegistration() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    
    // Booleans to check password and email's match
    const [passwordsMatch, setPasswordMatch] = useState(false);
    const [emailMatch, setEmailMatch] = useState(false);

    // useEffect for password match
    // useEffect(() => {
    //     if (password !== "" && confirmPassword !== "") {

    //     } else {
    //         setPasswordMatch(false);
    //     }
    // })

    const register = () => {
        registerLawyer(firstName, lastName, email, password);
    }


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
                                    type="text"
                                    placeholder="First Name"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Confirm Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Confirm Email"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="Confirm Email"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    autoComplete="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div>
                                <button
                                type=""
                                onClick={() => registerLawyer(firstName, lastName, email, password)}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Register
                                </button>
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
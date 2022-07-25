import React, {useState, useEffect} from "react";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";
import { registerLawyer } from "../../firebase";
import ReactModal from "react-modal";


function LawyerRegistration() {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [company, setCompany] = useState("")
    
    // Booleans to check password and email's match
    const [passwordsMatch, setPasswordMatch] = useState(false);
    const [emailMatch, setEmailMatch] = useState(false);

    // Booleans for react modal
    const [showModal, setShowModal] = useState(false);

    // useEffect for password match
    useEffect(() => {
        if (password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                setPasswordMatch(true);
            } else {
                setPasswordMatch(false);
            }
        } else {
            setPasswordMatch(false);
        }
    }, [confirmPassword, password])

    // useEffect for email match
    useEffect(() => {
        if (email !== "" && confirmEmail !== "") {
            if (email === confirmEmail) {
                setEmailMatch(true);
            } else {
                setEmailMatch(false);
            }
        } else {
            setEmailMatch(false);
        }
    }, [email, confirmEmail])

    return (
        <>
            <Header/>
            <div className="flex h-screen w-screen bg-zinc-800" >
                <div className="absolute p-3">
                    <h1 className="text-white w-screen text-center text-4xl font-bold drop-shadow-lg"> 
                        Lawyer
                    </h1>
                </div>
                <div className="flex absolute h-screen w-screen items-center justify-center">
                    <div className="mt-4">
                        <div className="rounded-md space-y-4">
                            <div>
                                <label className="text-white">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
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
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                    autoComplete="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    placeholder="Company"
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                    autoComplete="Company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)} />
                            </div>
                            <div>
                                <label className="text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
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
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                    autoComplete="Confirm Email"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)} />
                                <div className="">
                                    <p className="font-bold text-red-500">{emailMatch ? "" : "Email's do not match"}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
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
                                    className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                    autoComplete="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                <div className="">
                                    <p className="font-bold text-red-500">{passwordsMatch ? "" : "Password's do not match"}</p>
                                </div>
                            </div>
                            <div>
                                <button
                                type=""
                                onClick={() => {
                                    if (firstName !== "" && lastName !== "" && company !== "" && passwordsMatch && emailMatch) {
                                        registerLawyer(firstName, lastName, company, email, password);
                                    } else {
                                        setShowModal(true)
                                    }}}
                                className="appearance-none relative w-full px py-2 bg-white border-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-sm my-3 hover:font-bold hover:border-cyan-300">
                                    Register
                                </button>
                            </div>
                        </div>
                        <ReactModal isOpen={showModal} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => setShowModal(false)} className="bg-zinc-800 border-4 border-slate-500 w-1/2 h-1/2 flex justify-center translate-x-1/2 translate-y-1/2">
                            <div className="flex place-items-center">
                                <div className="flex place-content-center">
                                    <p className="font-bold text-center text-4xl text-white drop-shadow-lg">
                                        Your registration details are incomplete.
                                    </p>
                                    <button type="" onClick={() => setShowModal(false)} className="bg-white absolute text-2xl rounded-sm hover:border-4 hover:border-x-gray-500 w-16 h-12 font-bold translate-y-36">
                                        Ok!
                                    </button>
                                </div>   
                            </div>
                        </ReactModal>                      
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default LawyerRegistration;
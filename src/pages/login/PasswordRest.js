import { sendPasswordReset } from "../../firebase"
import ReactModal from "react-modal"
import {React, useState} from "react"
import Header from "../../nav/Header"
import Footer from "../../nav/Footer"

export default function PasswordReset() {

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");

    return (
        <>
            <Header/>
            <div className="bg-zinc-800 h-screen w-screen flex justify-center overflow-hidden">
                <div className=" translate-y-1/2">
                    <label className="text-white font-bold drop-shadow-lg">
                        Enter email
                    </label>
                    <input
                        type="email"
                        placeholder="Confirm Email"
                        className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                        autoComplete="Confirm Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <button type="" 
                            onClick={() => {
                                if (email === "") {
                                    alert("Please enter email")
                                } else {
                                    sendPasswordReset(email);
                                }
                            }}  
                            className="text-xl translate-y-4 w-20 bg-white border-2 border-gray-500 placeholder-gray-500 text-gray-900 rounded-sm my-3 hover:font-bold hover:border-cyan-300">
                        Reset
                    </button>
                </div>  
            </div>
            <Footer/>
        </>
    )
}
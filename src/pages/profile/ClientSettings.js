import React from "react";
import { useState, useEffect } from "react";
import { useAuthState, useUpdateEmail, useUpdatePassword } from "react-firebase-hooks/auth";
import { auth, getUserInfo, updateEmailDocs } from "../../firebase";
import Unauthorised from "../Error/Unauthorised";
import ReactModal from "react-modal";

export default function ClientSettings() {

    const [snap, setSnap] = useState([]);
    const [user, loading, error1] = useAuthState(auth)
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailUpdated, setEmailUpdated] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [updateEmail, updating1, error2] = useUpdateEmail(auth);
    const [updatePassword, updating2, error3] = useUpdatePassword(auth);

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                const data = await getUserInfo(user.uid);
                setSnap(data);
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        if (user !== null) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [user])

    useEffect(() => {
        if (password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                setPasswordsMatch(true);
            }
        }
    }, [password, confirmPassword])

    useEffect(() => {
        if (error1 || error2 || error3) {
            setShowError(true)
        }
    }, [error1, error2, error3])


    return (
        <>
            {userLoggedIn ? 
                <div className="h-screen w-screen bg-neutral-800 overflow-y-scroll overflow-x-hidden pb-52">
                <div className="translate-y-10 translate-x-20">
                    <p className="text-white text-3xl font-bold">
                        Hello {snap.fullName}!
                    </p>
                </div>
                <div className="space-y-20 translate-x-20 w-3/4 translate-y-20">
                    <div className="space-y-6">
                        <div>
                            <label className="text-white">
                                Change password
                            </label>
                            <input
                                type="password"
                                placeholder="Change password"
                                className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                autoComplete="Change password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-white">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                autoComplete="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="" 
                                    onClick={async() => {
                                        if (passwordsMatch) {
                                            await updatePassword(confirmPassword).then(() => {
                                                if (!error3 && !updating2) {
                                                    setPasswordUpdated(true);
                                                } 
                                            })
                                        } else {
                                            alert("Password's do not match")
                                        }
                                    }}
                                    className="bg-white text-black rounded-sm w-52 h-10 translate-y-5 text-bold hover:border-4 hover:border-x-gray-500 hover:font-bold">
                                Update password
                            </button>
                            <div className="translate-y-5">
                                <p className="font-bold text-red-500">{passwordsMatch ? "" : "Password's do not match"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-white">
                                Update email
                            </label>
                            <input
                                type="email"
                                placeholder="Update email"
                                className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                autoComplete="Update email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <button type="" 
                                    onClick={async(email) => {
                                        if (email === "") {
                                            alert("please enter email");
                                            return;
                                        }
                                        await updateEmail(email).then(() => {
                                            if (!error2 && !updating1) {
                                                updateEmailDocs(email, user.uid).then(() => {
                                                    setEmailUpdated(true);
                                                })   
                                            } 
                                        });
                                        
                                    }}
                                    className="bg-white text-black rounded-sm w-52 h-10 translate-y-5 text-bold hover:border-4 hover:border-x-gray-500 hover:font-bold">
                                Update email
                            </button>
                        </div>
                    </div>
                </div>
                <ReactModal isOpen={emailUpdated || passwordUpdated} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => {
                    setEmailUpdated(false)
                    setPasswordUpdated(false)
                    }} className="bg-zinc-800 border-4 border-slate-500 w-1/2 h-1/2 flex justify-center translate-x-1/2 translate-y-1/2">
                            <div className="flex place-items-center">
                                <div className="flex place-content-center">
                                    <p className="font-bold text-center text-4xl text-white drop-shadow-lg">
                                        Update successful!
                                    </p>
                                    <button type="" onClick={() => {
                                                            setEmailUpdated(false)
                                                            setPasswordUpdated(false)
                                                            }} className="bg-white absolute text-2xl rounded-sm hover:border-4 hover:border-x-gray-500 w-16 h-12 font-bold translate-y-36">
                                        Ok!
                                    </button>
                                </div>   
                            </div>
                </ReactModal>

                <ReactModal isOpen={showError} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => {setShowError(false)}} className="bg-zinc-800 border-4 border-slate-500 w-1/2 h-1/2 flex justify-center translate-x-1/2 translate-y-1/2">
                            <div className="flex place-items-center">
                                <div className="flex place-content-center">
                                    <p className="font-bold text-center text-4xl text-white drop-shadow-lg">
                                        An error occured. Please try again.
                                    </p>
                                    <button type="" onClick={() => {setShowError(false);}} className="bg-white absolute text-2xl rounded-sm hover:border-4 hover:border-x-gray-500 w-16 h-12 font-bold translate-y-36">
                                        Ok!
                                    </button>
                                </div>   
                            </div>
                </ReactModal>
            </div>
                
            :                 
            <Unauthorised/>
            }
        </>
    )
}
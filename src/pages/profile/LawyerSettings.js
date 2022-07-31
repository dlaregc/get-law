import React from "react";
import { useAuthState, useUpdatePassword, useUpdateEmail } from "react-firebase-hooks/auth";
import { auth, getUserInfo, updateCompanyAndBio, updateEmailDocs, uploadProfilePicture, updateExpertiseList, getLawyerExpertise, getLawyers } from "../../firebase";
import { useState, useEffect } from "react";
import Unauthorised from "../Error/Unauthorised";
import ReactModal from "react-modal";
import { async } from "@firebase/util";

function LawyerSettings() {

    // const expertiseList = [
    //     {type: "Alternative Dispute Resolution", bool: false},
    //     {type: "Building & Construction", bool: false},
    //     {type: "Civil", bool: false},
    //     {type: "Conveyancing", bool: false},
    //     {type: "Corporate", bool: false},
    //     {type: "Criminal Law", bool: false},
    //     {type: "Cybersecutity & Data Protection", bool: false},
    //     {type: "Family Law", bool: false},
    //     {type: "Intellectual Property", bool: false},
    //     {type: "Family Law", bool: false},
    //     {type: "Insolvency", bool: false},
    //     {type: "Muslim Law", bool: false},
    //     {type: "Personal Injury & Property Damage", bool: false},
    //     {type: "Probate & Succession Planning", bool: false},
    // ]
    
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [file, setFile] = useState("");
    
    const [snap, setSnap] = useState([]);
    const [canUpdate, setCanUpdate] = useState(false)
    const [emailUpdated, setEmailUpdated] = useState(false);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const [user, loading, error1] = useAuthState(auth)
    const [updateEmail, updating1, error2] = useUpdateEmail(auth);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [updatePassword, updating2, error3] = useUpdatePassword(auth);

    const [expertiseList, setExpertiseList] = useState([]);
    const [expertiseUpdated, setExpertiseUpdated] = useState(false);

    useEffect(() => {
        if (user !== null) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [user])

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                const data = await getUserInfo(user.uid);
                const expertise = await getLawyerExpertise(user.uid);
                setSnap(data);
                setExpertiseList(expertise);
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        if (error1 || error2 || error3) {
            setShowError(true)
        }
    }, [error1, error2, error3])

    useEffect(() => {
        if (password !== "" && confirmPassword !== "") {
            if (password === confirmPassword) {
                setPasswordsMatch(true);
            }
        }
    }, [password, confirmPassword])

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
                    <div>
                        <div className="space-y-6 inline">
                            <label className="text-white flex align-text-bottom">
                                Upload profile picture
                            </label>
                            <div className="h-1/5 w-1/5">
                                <img 
                                    src={snap.photoURL}
                                    alt=""
                                    className="object-scale-down"
                                />
                            </div>
                            <input
                                type="file"
                                accept=".jpg"
                                id="uploadJPG"
                                className="appearance-none relative px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm bg-slate-50 flex align-text-bottom"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setFile(e.target.files[0])
                                    }}} />
                            <button type="" 
                                onClick={() => uploadProfilePicture(file, user.uid)}
                                className="bg-white text-black rounded-sm w-52 h-10 text-bold hover:border-4 hover:border-x-gray-500 hover:font-bold">
                                Update profile picture
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-white">
                                Change company
                            </label>
                            <input
                                type="text"
                                placeholder="Change company"
                                className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                autoComplete="Change company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-white">
                                Change bio
                            </label>
                            <input
                                type="text"
                                placeholder="Change bio"
                                className="appearance-none relative w-full px py-2 focus:border-cyan-300 border-2 placeholder-gray-500 text-gray-900 rounded-sm"
                                autoComplete="Change bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)} />
                            <button type="" 
                                    onClick={() => {
                                        const res = updateCompanyAndBio(company, bio, user.uid)
                                        console.log(res);
                                        setCanUpdate(res);
                                    }}
                                    className="bg-white text-black rounded-sm w-52 h-10 translate-y-5 text-bold hover:border-4 hover:border-x-gray-500 hover:font-bold">
                                Update details
                            </button>
                        </div>
                    </div>

                    <div className="">
                        <label className="text-white">
                                Legal Expertise
                        </label>
                        <form>
                            {expertiseList.map((x, index) => (
                                    <div key={index}>
                                        <input
                                            type="checkbox"
                                            defaultChecked={x.bool}
                                            className="appearance-none relative placeholder-gray-500 text-gray-900 rounded-sm"
                                            onChange={() => {x.bool = !x.bool}}
                                            />
                                        <label className="text-white ml-3">
                                            {x.type}
                                        </label>
                                    </div>  
                                ))}      
                        </form>
                        <button className="bg-white text-black rounded-sm w-52 h-10 translate-y-5 text-bold hover:border-4 hover:border-x-gray-500 hover:font-bold"
                                onClick={() => {
                                    updateExpertiseList(expertiseList, user.uid).then((x) => setExpertiseUpdated(x))
                                }}>
                            Update expertise
                        </button>
                    </div>

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
                                    onClick={async() => {
                                        if (email==="") {
                                            alert("Please enter email!");
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
                <ReactModal isOpen={emailUpdated || canUpdate || passwordUpdated || expertiseUpdated} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} onRequestClose={() => {
                    setEmailUpdated(false)
                    setCanUpdate(false)
                    setPasswordUpdated(false)
                    setExpertiseUpdated(false)
                    }} className="bg-zinc-800 border-4 border-slate-500 w-1/2 h-1/2 flex justify-center translate-x-1/2 translate-y-1/2">
                            <div className="flex place-items-center">
                                <div className="flex place-content-center">
                                    <p className="font-bold text-center text-4xl text-white drop-shadow-lg">
                                        Update successful!
                                    </p>
                                    <button type="" onClick={() => {
                                                            setEmailUpdated(false)
                                                            setCanUpdate(false)
                                                            setPasswordUpdated(false)
                                                            setExpertiseUpdated(false)
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
    );
}

export default LawyerSettings
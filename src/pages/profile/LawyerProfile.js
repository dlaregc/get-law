import { React, useState, useEffect } from "react";
import { getUserInfo } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function LawyerProfile() {

    const [snap, setSnap] = useState([]);
    const [user, loading, error1] = useAuthState(auth)

    useEffect(() => {
        const fetch = async() => {
            const data = await getUserInfo(user.uid);
            setSnap(data);
        }
        fetch();
    }, [])

    return (
        <>
            <div className="w-screen overflow-y-scroll overflow-x-hidden pb-20 bg-zinc-800">
                <div>
                    <div className="translate-x-20 space-y-8 translate-y-10">
                        <img 
                            src={snap.photoURL} 
                            alt=""
                            className="border-2 h-80 w-64"
                        />
                        <div classname="">
                            <h1 className="text-white font-bold text-7xl">
                                {snap.fullName}
                            </h1>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-white font-bold text-xl">
                               Company: {snap.company}
                            </h1>
                        </div>
                        <div className="mt-5">
                            <h1 className="text-white text-xl">
                                Contact me at: {snap.email}
                            </h1>
                        </div>
                        <div>
                            <p className="w-1/2 text-white">
                                Bio: {snap.bio}
                            </p>
                        </div>
                        <div className="mt-5">
                            <Link to="/profile/settings" className="text-zinc-800 font-bold hover:no-underline border-4 hover:border-x-gray-500 bg-white hover:text-zinc-800 text-2xl p-2">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
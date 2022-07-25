import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";
import { getUserInfo } from "../../firebase";

export default function ProductProfile() {

    const {uid} = useParams();
    const [snap, setSnap] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const data = await getUserInfo(uid);
            setSnap(data);
        }
        fetch();
    }, [])

    return (
        <>
            <Header/>
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
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
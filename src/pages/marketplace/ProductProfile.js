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
            <div className="w-screen min-h-screen overflow-y-scroll bg-zinc-800">
                <div classname="">
                    <div className="h-80 w-64 mt-10 ml-14">
                        {/* <img 
                            src={snap.photoURL} 
                            alt=""
                            className="border-2"
                        /> */}
                        <div classname="">
                            <h1 className="text-white font-bold text-4xl">
                                {snap.fullName}
                            </h1>
                        </div>
                    </div>
                    <div classname="">
                        <div>
                            <h1 classname="text-white font-bold text-4xl">
                                {snap.company}
                            </h1>
                        </div>
                        <div>
                            <h1 classname="text-white font-bold text-4xl">
                                {snap.email}
                            </h1>
                        </div>
                        <div>
                            <p classname="text-white font-bold text-4xl">
                                {snap.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
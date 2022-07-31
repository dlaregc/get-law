import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../nav/Footer";
import Header from "../../nav/Header";
import { getUserInfo, getLawyerExpertise } from "../../firebase";

export default function ProductProfile() {

    const {uid} = useParams();
    const [snap, setSnap] = useState([]);
    const [expertiseList, setExpertiseList] = useState([]);

    useEffect(() => {
        const fetch = async() => {
            const data = await getUserInfo(uid);
            const e = await getLawyerExpertise(uid);
            setSnap(data);
            setExpertiseList(e)
        }
        fetch();
    }, [])

    return (
        <>
            <Header/>
            <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden pb-20 bg-zinc-800">
                <div className="space-y-20">
                    <div className="flex px-28 pt-20">
                        <div className="w-1/2 h-4/6">
                            <img 
                                src={snap.photoURL} 
                                alt=""
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-72 w-1/2 h-auto flex-col text-center">
                            <div classname="">
                                <h1 className="text-white font-bold uppercase text-5xl drop-shadow-lg">
                                    {snap.fullName}
                                </h1>
                            </div>
                            <div className="text-white text-xl drop-shadow-lg">
                                <h1 className="font-bold">
                                    Company: 
                                </h1>
                                <h2>
                                    {snap.company}
                                </h2>
                            </div>
                            <div className="text-white text-xl drop-shadow-lg">
                                <h1 className="font-bold">
                                    Contact me at:
                                </h1>
                                <h2>
                                    {snap.company}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="align-top px-28 space-y-20">
                        <div>
                            <h1 className="text-white text-xl drop-shadow-lg font-bold">
                                Expertise:
                            </h1>
                            <div className="space-y-5">
                                {
                                    expertiseList.filter((x) => x.bool).map((y) => (
                                        <h2 className="text-white">
                                            {y.type} 
                                        </h2>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className="text-white text-xl drop-shadow-lg font-bold">
                                Bio:     
                            </h1>
                            <p className="text-white">
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
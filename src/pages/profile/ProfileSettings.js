import Header from "../../nav/Header";
import Footer from "../../nav/Footer";
import LawyerSettings from "./LawyerSettings";
import { React, useState, useEffect } from "react";
import { getUserInfo, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Unauthorised from "../Error/Unauthorised";
import ClientSettings from "./ClientSettings";

export default function ProfileSettings() {

    const [snap, setSnap] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isLawyer, setIsLawyer] = useState(false);

    useEffect(() => {
        const fetch = async() => {
            const data = await getUserInfo(user.uid);
            setSnap(data);
            if (data.lawyer) {
                setIsLawyer(true);
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

    return (
        <>
            <Header />
                {userLoggedIn ? 
                    isLawyer ? <LawyerSettings/> : <ClientSettings/>
                    :
                    <Unauthorised />
                }
            <Footer />
        </>
        
    )
}
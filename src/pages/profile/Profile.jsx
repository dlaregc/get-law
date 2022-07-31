import {React, useState, useEffect} from "react"
import Unauthorised from "../Error/Unauthorised";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import LawyerProfile from "./LawyerProfile";
import Header from "../../nav/Header";
import Footer from "../../nav/Footer";
import { getUserInfo } from "../../firebase";
import ClientProfile from "./ClientProfile";

export default function Profile() {

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
            <Header/>
            {userLoggedIn ?
                isLawyer ? <LawyerProfile defer/> : <ClientProfile defer/>
            :
            <Unauthorised/>}
            <Footer/>
        </>
    )
}
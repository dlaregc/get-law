import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {auth, logout} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {BookOpenIcon} from "@heroicons/react/solid"; // put into header later

function Header() {

    const [user, loading, error] = useAuthState(auth);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        if (user == null) {
            setUserLoggedIn(false);
        } else {
            setUserLoggedIn(true);
        }
    }, [user])

    return (
        <div className="static w-full flex justify-between p-4 items-center bg-gradient-to-b from-neutral-800 to-stone-900">
            <div className="hover:scale-110">
                <NavLink to="/" className="hover:no-underline">
                    <span className="text-5xl text-white font-bold text-center uppercase drop-shadow-lg align-middle">
                        getlaw
                    </span>
                    <BookOpenIcon className="inline-flex align-middle h-20 w-20 text-white m-1" />
                </NavLink>
            </div>

            <nav>

                <ul className="static gap-8 p-6">
                    <li className="space-x-4 uppercase text-2xl text-white font-bold drop-shadow-lg">
                        <NavLink to = "/" className="hover:text-cyan-300 hover:no-underline">Home</NavLink>
                        <NavLink to = "/marketplace" className="hover:text-cyan-300 hover:no-underline">Marketplace</NavLink>
                        {
                            userLoggedIn ? 
                            <>
                                <NavLink to = "/profile" className="hover:text-cyan-300 hover:no-underline">Profile</NavLink>
                                <NavLink to = "/" onClick={logout} className="hover:text-cyan-300 hover:no-underline">Logout</NavLink>
                            </> :
                            <>
                                <NavLink to="/login" className="hover:text-cyan-300 hover:no-underline">Login</NavLink>
                                <NavLink to="/register" className="hover:text-cyan-300 hover:no-underline">Register</NavLink>
                            </>
                        }
                    </li>
                </ul>

            </nav>
        </div>
    );
}

export default Header;
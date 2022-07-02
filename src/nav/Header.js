import React, {useContext, createContext} from "react";
import {NavLink} from "react-router-dom";
import {auth, logout} from "../firebase";
import {BookOpenIcon} from "@heroicons/react/solid"; // put into header later

function Header() {

    let user = auth.currentUser;

    return (
        <div className="static w-full flex justify-between p-4 items-center bg-blue-400">
            <div>
                <NavLink to="/" className=" text-5xl text-white font-bold text-center uppercase drop-shadow-lg hover:no-underline hover:text-6xl">
                    getlaw
                </NavLink>
            </div>

            <nav>

                <ul className="static gap-8 p-6">
                    <li className="space-x-4 uppercase text-2xl text-white font-bold drop-shadow-lg">
                        <NavLink to = "/" className="hover:text-blue-600 hover:no-underline">Home</NavLink>
                        <NavLink to = "/marketplace" className="hover:text-blue-600 hover:no-underline">Marketplace</NavLink>
                        {
                            user &&
                            <>
                                <NavLink to = "/profile" className="hover:text-blue-600 hover:no-underline">Profile</NavLink>
                                <NavLink to = "/" onClick={logout} className="hover:text-blue-600 hover:no-underline">Logout</NavLink>
                            </>
                        }
                        {
                            !user && 
                            <>
                                <NavLink to="/login" className="hover:text-blue-600 hover:no-underline">Login</NavLink>
                                <NavLink to="/register" className="hover:text-blue-600 hover:no-underline">Register</NavLink>
                            </>
                        }
                    </li>
                </ul>

            </nav>
        </div>
    );
}

export default Header;
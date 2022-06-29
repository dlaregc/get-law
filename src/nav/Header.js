import React, {useContext, createContext} from "react";
import {NavLink} from "react-router-dom";
import {auth, logout} from "../firebase";

function Header() {

    let user = auth.currentUser;

    return (
        <div className="static w-full flex justify-between p-4 items-center bg-blue-400">
            <div className="text-5xl font-bold text-center uppercase text-white drop-shadow-lg">
                <h1>
                    <span>
                        getlaw
                    </span>
                </h1>
            </div>

            <nav>

                <ul className="gap-8 p-6">
                    <li className="text-2xl space-x-4 uppercase text-white font-bold drop-shadow-lg">
                        <NavLink to = "/">Home</NavLink>
                        <NavLink to = "/marketplace">Marketplace</NavLink>
                        {
                            user &&
                            <>
                                <NavLink to = "/profile">Profile</NavLink>
                                <NavLink to = "/" onClick={logout}>Logout</NavLink>
                            </>
                        }
                        {
                            !user && 
                            <>
                                <NavLink to="/login">Login</NavLink>
                                <NavLink to="/register">Register</NavLink>
                            </>
                        }
                    </li>
                </ul>

            </nav>
        </div>
    );
}

export default Header;
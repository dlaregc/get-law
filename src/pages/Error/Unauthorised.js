import React from "react";

export default function Unauthorised() {
    return (
        <div className="h-screen w-screen flex justify-center bg-stone-700">
            <p className="text-center translate-y-1/2 text-5xl font-bold text-white drop-shadow-lg">
                An error occured: You are not authorised to view this page :(
            </p>
        </div>
    )
}
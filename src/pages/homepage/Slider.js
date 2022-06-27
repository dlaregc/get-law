import React, {setState} from "react";

const slider = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
];

function Slider() {
    return (
        <div>
            <img src={slider[0]} alt="" />
            <img src={slider[1]} alt="" />
            <img src={slider[2]} alt="" />
        </div>
    );
}

export default Slider;
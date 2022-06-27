import React from "react";

import Footer from "../../nav/Footer";
import Header from "../../nav/Header";
import Slider from "./Slider";

function Home() {
    return (
       <div>
            <Header />
            <Slider />
            <Footer />
       </div>
    );
}

export default Home;
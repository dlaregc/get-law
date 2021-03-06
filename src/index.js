import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createRoot } from 'react-dom/client';

import App from "./App";
import Marketplace from "./pages/marketplace/Marketplace";
import Login from "./pages/login/Login";
import RegistrationDirectory from "./pages/register/RegistrationDirectory";
import LawyerRegistration from "./pages/register/LawyerRegistration";
import ClientRegistration from "./pages/register/ClientRegistration";
import Profile from "./pages/profile/Profile";
import ProductProfile from "./pages/marketplace/ProductProfile";
import FourZeroFour from "./pages/Error/FourZeroFour";
import ProfileSettings from "./pages/profile/ProfileSettings";
import PasswordReset from "./pages/login/PasswordRest";

// ReactDOM.render(
//     <Router>
//       <Routes>
//         <Route path = "/" element = {<App />} />
//         <Route path = "/marketplace" element = {<Marketplace />} />
//         <Route path = "/login" element = {<Login />} />
//         <Route path = "/register" element = {<Register/>} />
//       </Routes>
//     </Router>,

//   document.getElementById('root')
// );


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
      <Routes>
        <Route path = "/" element = {<App />} />
        <Route path = "/marketplace" element = {<Marketplace />} />
        <Route path = "marketplace/:uid" element={<ProductProfile/>}/>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/register" element = {<RegistrationDirectory/>} />
        <Route path = "/register/lawyer" element={<LawyerRegistration/>} />
        <Route path = "/register/client" element={<ClientRegistration/>} />
        <Route path = "*" element={<FourZeroFour/>}/>
        <Route path = "/profile/settings" element = {<ProfileSettings/>} /> 
        <Route path = "reset" element={<PasswordReset/>} />
      </Routes>
    </Router>,
  );
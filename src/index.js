import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createRoot } from 'react-dom/client';

import App from "./App";
import Marketplace from "./pages/marketplace/Marketplace";
import Login from "./pages/login/Login";
import RegistrationDirectory from "./pages/register/RegistrationDirectory";
import LawyerRegistration from "./pages/register/LawyerRegistration";
import ClientRegistration from "./pages/register/ClientRegistration";

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
        <Route path = "/login" element = {<Login />} />
        <Route path = "/registration-directory" element = {<RegistrationDirectory/>} />
        <Route path = "/lawyer-registration" element={<LawyerRegistration/>} />
        <Route path = "/client-registration" element={<ClientRegistration/>} />
      </Routes>
    </Router>,
  );
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/routes/Home";
import Login from "./views/routes/Login";
import Register from "./views/routes/Register";
import AdminCrud from "./views/routes/adminCrud";
import Test from "./views/test";
import Perfil from "./views/services/Perfil";
import Catalogo from "./views/services/Catalogo";
import Facturas from "./views/services/Facturas";
import Citas from "./views/services/Citas";

import AdminDashboard from "./views/profiles/AdminDashBoard";
import UserDashboard from "./views/profiles/UserDashBoard";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/adminCrud" element={<AdminCrud />} />
    //     {/* Servicios de usuario: currently testing: */}
    //     <Route path="/userDashboard" element={<UserDashboard />} />
    //     <Route path="/perfil" element={<Perfil />} />
    //     <Route path="/catalogo" element={<Catalogo/>}/>
    //     <Route path="/facturas" element={<Facturas/>}/>
    //     <Route path="/citas" element={<Citas/>} />
    //     <Route path="/adminDashboard" element={<AdminDashboard/>}/>
    //   </Routes>
    // </Router>
    <>Hola</>
  );
}

export default App;


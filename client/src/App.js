import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminCrud from "./views/adminCrud";
import Test from "./views/test";
import UserDashBoard from "./views/profiles/user/UserDashBoard";
import Perfil from "./views/services/Perfil";
import Catalogo from "./views/services/Catalogo";
import Facturas from "./views/services/Facturas";
import Citas from "./views/services/Citas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminCrud" element={<AdminCrud />} />
        {/* Servicios de usuario: currently testing: */}
        <Route path="/userDashboard" element={<UserDashBoard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/catalogo" element={<Catalogo/>}/>
        <Route path="/facturas" element={<Facturas/>}/>
        <Route path="/citas" element={<Citas/>} />
      </Routes>
    </Router>
  );
}

export default App;


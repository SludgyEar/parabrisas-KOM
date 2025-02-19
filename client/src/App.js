import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import DashBoard from "./views/DashBoard";
import AdminCrud from "./views/adminCrud";
import Test from "./views/test";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/adminCrud" element={<AdminCrud />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import DashBoard from "./views/DashBoard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;


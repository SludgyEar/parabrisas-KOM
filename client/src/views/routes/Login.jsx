import React, { useState, useEffect } from "react";
import "../styles/loginStyle.css"; // Asegúrate de tener el archivo CSS en la misma carpeta
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useAuth } from "../providers/UserProvider";

function App() {
    const [email, setEmail] = useState({
        email: ""
    });
    const [passwd, setPasswd] = useState({
        passwd: ""
    });
    
    const handlePasswd = (e) => {
        setPasswd(e.target.value);
    };
    
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAuth) {
            if (auth.isAdmin) {
                navigate("/adminDashboard");
            } else {
                navigate("/userDashboard");
            }
        }
    }, [auth.isAuth, auth.isAdmin, auth.user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const encryptedPasswd = CryptoJS.SHA256(passwd).toString();
        try {   // res contiene  NOMBRE_USR, CORREO_USR, STATUS_USR, PERFIL_USR
            const res = await axios.post("http://localhost:5000/login", { correo: email, passwd: encryptedPasswd }); 
            if (res.status === 201) {
                auth.handleAuth(true);
                if(res.data.PERFIL_USR === 'C'){
                    auth.handleAdmin(true);
                }
                auth.handleUser(res.data);
            }
        } catch (err) {console.log(err);}
    };
    

    return (
        <div>

            <header className="header">
                <div className="logo">
                    <Link to="/">Parabrisas KOM</Link>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Productos</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </nav>
            </header>


            <main className="main">
                <div className="login-box">
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Ingresa tu correo"
                            required
                            onChange={handleEmail}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="passwd"
                            placeholder="Ingresa tu contraseña"
                            required
                            onChange={handlePasswd}
                        />

                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <button id="register-button" onClick={() => navigate("/register")}>¿No tienes una cuenta?</button>
                    <button id="forgot-button" onClick={() => navigate("/register")}>¿Olvidaste tu contraseña?</button>
                </div>
            </main>

            <footer className="footer">
                <strong>
                    <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                    <p><a href="#">Términos y Condiciones</a></p>
                </strong>
            </footer>
        </div>
    );
}

export default App;

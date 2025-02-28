import React, { useState } from "react";
import "./styles/loginStyle.css"; // Asegúrate de tener el archivo CSS en la misma carpeta
import { useNavigate, Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

function App() {
    const [email, setEmail] = useState({
        email: ""
    });
    const [passwd, setPasswd] = useState({
        passwd: ""
    });
    const [error, setError] = useState();
    
    const navigate = useNavigate();

    const handlePasswd = (e) => {
        setPasswd(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const encryptedPasswd = CryptoJS.SHA256(passwd).toString();
        try {
            const res = await axios.post("http://localhost:5000/login", { correo: email, passwd: encryptedPasswd });
            if (res.status === 201) {
                navigate("/dashboard");
            }
        } catch (err) {console.log(err);}
    };
    
    return (
        <div>

            <header>
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


            <main>
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

            <footer>
                <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                <p><a href="#">Términos y Condiciones</a></p>
            </footer>
        </div>
    );
}

export default App;

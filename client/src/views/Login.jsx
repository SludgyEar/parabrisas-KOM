import React, { useState } from "react";
import "./loginStyle.css"; // Asegúrate de tener el archivo CSS en la misma carpeta
import { Link } from "react-router-dom";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Usuario:", email);
        console.log("Contraseña:", password);
        // Aquí puedes agregar la lógica para enviar los datos al backend
    };

    return (
        <div>
            <header>
                <div className="logo">Parabrisas KOM</div>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingresa tu contraseña"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <button id="register-button"><Link to="/Register">¿No tienes una cuenta?</Link></button>
                    <button id="forgot-button"><Link to="#">¿Olvidaste tu contraseña?</Link></button>
                    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
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

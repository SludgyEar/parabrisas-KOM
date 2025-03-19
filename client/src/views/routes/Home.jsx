import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/homeStyle.css"; // Archivo CSS para estilos

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <header className="header">
                <div className="logo" id="logo">
                    <h1 className="logo" id="nombre-logo">Parabrisas Kom</h1>
                </div>
            </header>

            <main>
                <div className="welcome-box">
                    <h1>Bienvenido a Parabrisas KOM</h1>
                    <p>Somos tu mejor opción en reparación y reemplazo de parabrisas.</p>
                    <p>Regístrate ahora para recibir promociones exclusivas y agendar tu cita en línea.</p>

                    <button onClick={() => navigate("/register")}>Registrarse</button>
                    <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
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

export default Home;

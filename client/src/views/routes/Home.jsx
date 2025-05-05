import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/homeStyle.css"; // Archivo CSS para estilos
import { useAuth } from "../providers/UserProvider";
import FeedBack from "../services/FeedBack";

function Home() {
    const navigate = useNavigate();
    const auth = useAuth();
                       
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
                {auth.feedback && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <h2>¡Gracias por tu visita!</h2>
                            <p>Tu opinión es importante para nosotros. ¿Podrías contestar una encuesta de satisfacción?</p>
                            <button onClick={ () => {
                                auth.handleFeedback();
                                console.log("Feedback: ", auth.feedback);
                                
                                navigate('/feedback');
                            } }>Aceptar</button>
                            <button onClick={() => auth.handleFeedback()}>Cerrar</button>
                        </div>
                    </div>
                )}
                
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

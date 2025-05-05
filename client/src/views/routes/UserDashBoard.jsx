import React, {useState} from "react";
import "../styles/userDashBoard.css"; // Importa el archivo CSS
// import Catalogo from "./services/Catalogo.jsx"; // Importa el componente Catálogo
import Catalogo from "../services/Catalogo";
import Perfil from "../services/Perfil";
import Citas from "../services/Citas";
import Ventas from "../services/Ventas";
import { useAuth } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const UserDashBoard = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [selectedService, setSelectedService] = useState("catálogo"); // Estado para el servicio seleccionado

    // Función para cambiar el servicio seleccionado
    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        auth.handleLogout();
        auth.handleFeedback();
        navigate("/");

    };

    return (
        <div className="dashboard">
            {/* Barra superior */}
            <header className="header">
                <h1>Parabrisas Kom</h1>
                <div className="userMenu">
                    <span>{auth.user.NOMBRE_USR}</span>
                    <div className="userDropdown">
                        <button>Perfil</button>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </div>
            </header>
            <div className="mainContainer">
                <aside className="sidebar">
                    <button
                        className={selectedService === "catálogo" ? "active" : ""}
                        onClick={() => handleServiceClick("catálogo")}
                    >
                        Catálogo
                    </button>
                    <button
                        className={selectedService === "perfil" ? "active" : ""}
                        onClick={() => handleServiceClick("perfil")}
                    >
                        Perfil
                    </button>
                    <button
                        className={selectedService === "ventas" ? "active" : ""}
                        onClick={() => handleServiceClick("ventas")}
                    >
                        Ventas
                    </button>
                    <button
                        className={selectedService === "citas" ? "active" : ""}
                        onClick={() => handleServiceClick("citas")}
                    >
                        Citas
                    </button>
                </aside>

                <main className="content">
                    {selectedService === "catálogo" && 
                    <div >
                        <h1>Parabrisas disponibles !</h1>
                        <Catalogo/>
                    </div>}

                    {selectedService === "perfil" &&
                    <div id="perfil-main-container">
                        <Perfil/>
                    </div>}

                    {selectedService === "ventas" &&
                    <div id="ventas-main-container">
                        <Ventas />
                    </div>}

                    {selectedService === "citas" &&
                    <div id="citas-main-container">
                        
                        <Citas/>
                    </div>}

                </main>
            </div>

            {/* Pie de página */}
            <footer className="footer">
                <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                <p>Términos y Condiciones</p>
            </footer>
        </div>
    );
};

export default UserDashBoard;
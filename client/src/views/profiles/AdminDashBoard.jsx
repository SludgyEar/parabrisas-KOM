import React, { useState } from 'react';
import "../styles/adminDashBoard.css"; // Importa el archivo CSS
import Catalogo from "../services/Catalogo";
import ImportarPortal from '../services/ImportarPortal';


function AdminDashBoard(){
    const [selectedService, setSelectedService] = useState("catálogo"); // Estado para el servicio seleccionado

    // Función para cambiar el servicio seleccionado
    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    return (
        <div className="dashboard">
            {/* Barra superior */}
            <header className="header">
                <h1>Parabrisas Kom</h1>
                <div className="userMenu">
                    <span>Administrador!</span>
                    <div className="userDropdown">
                        <button>Perfil</button>
                        <button>Cerrar sesión</button>
                    </div>
                </div>
            </header>
            <div className="mainContainer" id='mainContainer'>
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
                        className={selectedService === "facturas" ? "active" : ""}
                        onClick={() => handleServiceClick("facturas")}
                    >
                        Facturas
                    </button>
                    <button
                        className={selectedService === "citas" ? "active" : ""}
                        onClick={() => handleServiceClick("citas")}
                    >
                        Citas
                    </button>
                </aside>

                <main className="content" id='content'>
                    {selectedService === "catálogo" &&
                        <div id='catalogo-container'>
                            <h1>Parabrisas disponibles !</h1>
                            <Catalogo />
                            
                        </div>}
                    {selectedService === "perfil" &&
                        <div>
                            Contenido del Perfil
                        </div>}
                    {selectedService === "facturas" &&
                        <div>
                            Contenido de Facturas
                        </div>}
                    {selectedService === "citas" &&
                        <div>
                            Contenido de Citas
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
}

export default AdminDashBoard;
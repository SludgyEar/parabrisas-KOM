import React, { useState } from 'react';
import "../styles/adminDashBoard.css"; // Importa el archivo CSS
import Catalogo from "../services/Catalogo";
import { useAuth } from "../providers/UserProvider";
import Perfil from '../services/Perfil';
import { useNavigate } from 'react-router-dom';


function AdminDashBoard(){
    const [selectedService, setSelectedService] = useState("catálogo"); // Estado para el servicio seleccionado
    const user = useAuth(); // Hook para obtener el usuario autenticado

    // Función para cambiar el servicio seleccionado
    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    const navigate = useNavigate();

    return (
        <div className="dashboard">
            {/* Barra superior */}
            <header className="header">
                <h1>Parabrisas Kom</h1>
                <div className="userMenu">
                    <span>Administrador {user.user.NOMBRE_USR}!</span>
                    <div className="userDropdown">
                        <button>Cerrar sesión</button>
                        <button onClick={() => { navigate('/adminCrud') }}>Administrador</button>
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
                        <div className='catalogo'>
                            <h1>Parabrisas disponibles !</h1>
                            <Catalogo />
                        </div>}
                    {selectedService === "perfil" &&
                        <div>
                            <Perfil />
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
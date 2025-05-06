import React, { useState, useEffect } from 'react';
import '../styles/citasStyle.css';
import { useAuth } from '../providers/UserProvider';
import axios from 'axios';
import Modal from '../services/Modal';

const Citas = () => {
    const auth = useAuth();
    // Selección de servicio
    const [selectedCitaService, setSelectedCitaService] = useState("crear"); // Estado para el servicio seleccionado
    const handleServiceCita = (service) => {
        setSelectedCitaService(service);
    };
    //  Recepcionista
    const dateTimeLocalNow = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16).replace("T", " ");

    const [fechaCita, setFechaCita] = useState(dateTimeLocalNow);
    const handleSetFechaCita = (e) => {
        setFechaCita(e.target.value);
    };
    const [disponible, setDisponible] = useState(null);
    const handleSetDisponible = async () => {
        try {
            let response = await axios.get(`http://localhost:5000/citas/${fechaCita}`);
            setDisponible(response.data);
        } catch (err) { console.log(err) }
    };

    const [motivo, setMotivoCita] = useState("cambio");
    const handleSetMotivoCita = (e) => {
        setMotivoCita(e.target.value);
    };
    
    const handleCreateCita = async (e) => {
        e.preventDefault();
        try {
            if (disponible) {
                // const usuario = await axios.get("http://localhost:5000/clientCita", {params})
                await axios.post("http://localhost:5000/crearCita", { id_usr: auth.user.ID_USR, fecha: fechaCita, motivo: motivo });
            }
            setIsModalOpen(true);
        } catch (err) { console.log(err) }
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        handleSetDisponible();
        // eslint-disable-next-line
    }, [fechaCita, disponible,setIsModalOpen, handleSetDisponible]);
    return (
        <div className="citas-container">
            <h1>Citas</h1>
            {(auth.user.PERFIL_USR === 'D') ? (
                <div className="recepcionista-citas-container">

                    <div className="tabs-container">
                        <div className="tabs-header">
                            <button
                                className={selectedCitaService === "crear" ? "active" : ""}
                                onClick={() => { handleServiceCita("crear") }}
                            >
                                Crear
                            </button>
                            <button
                                className={selectedCitaService === "borrar" ? "active" : ""}
                                onClick={() => { handleServiceCita("borrar") }}
                            >
                                Borrar
                            </button>

                            <button
                                className={selectedCitaService === "actualizar" ? "active" : ""}
                                onClick={() => { handleServiceCita("actualizar") }}
                            >
                                Actualizar</button>
                        </div>
                        {/* Contenido */}
                        <div className="tabs-content">
                            {selectedCitaService === "crear" &&
                                <div className='crear-cita'>
                                    <form onSubmit={handleCreateCita}>
                                        <div className='date-picker'>
                                            <h2>Selecciona una fecha</h2>
                                            <input
                                                id='date-input'
                                                type="datetime-local"
                                                defaultValue={dateTimeLocalNow}
                                                onChange={handleSetFechaCita}
                                            />
                                            <h2>Datos del Cliente</h2>
                                            <input type="text" placeholder='Nombre Completo' id='cliente-nombre'/>
                                            <input type="text" placeholder='Email - Correo Electrónico' id='cliente-email' />
                                        
                                        </div>
                                        <div className='motivo-cita'>
                                            <h2>Motivo de la cita</h2>
                                            <select name="motivo" className='motivo-select' onChange={handleSetMotivoCita}>
                                                <option value="cambio">Cambio</option>
                                                <option value="reparacion">Reparación</option>
                                                <option value="garantia">Garantía</option>
                                            </select>
                                            <label style={{
                                                color: disponible ? "green" : "red",
                                                fontWeight: "bold",
                                                fontSize: "1.2rem",
                                                marginBottom: "20px"
                                            }}>
                                                {disponible ? "Disponible" : "No disponible"}
                                            </label>
                                            <button type='submit'>Agendar</button>
                                        </div>
                                    </form>
                                    <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} message={disponible ? "Cita creada Exitosamente" : "Cupo Lleno, error al crear cita"} />
                                </div>}

                            {selectedCitaService === "borrar" &&
                                <div>
                                    Borrar
                                </div>}

                            {selectedCitaService === "actualizar" &&
                                <div>
                                    Update
                                </div>}
                        </div>
                    </div>


                </div>

            ) : (
                <div className="user-citas-container">
                    <div className="citas-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray([]) && [].map((cita) => (
                                    <tr key={cita.id}>
                                        <td>{cita.fecha_cita}</td>
                                        <td>{cita.motivo_cita}</td>
                                        <td>{cita.status_cita}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}


        </div>
    );
};
export default Citas;
import React, { useEffect, useState } from 'react';
import { FaRegUserCircle, FaPencilAlt, FaRegWindowClose } from "react-icons/fa";
import { useAuth } from '../providers/UserProvider';
import '../styles/perfilStyle.css';

const Perfil = () => {
    const auth = useAuth();
    const [usuario, setUsuario] = useState({});

    const handleEditUsuario = (e) =>{
        setUsuario(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    useEffect(() => {
        const handleSetUsuario = () => {
            setUsuario(auth.user);
        };
        
        handleSetUsuario();
    },[]);

    const [showModal, setShowModal] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="perfil-container">
        {(showModal) ? (
            <div className='perfil'>
                <div className="edit-container">
                    <button onClick={() => { setShowModal(prev => !prev) }}> <FaPencilAlt /> </button>
                </div>
                <div className="top-container">
                    <FaRegUserCircle size={100} />
                </div>
                <div className="info-container">
                    <h1>Nombre: {usuario.NOMBRE_USR}</h1>
                    <h3>Telefono: </h3>
                    <h3>Correo: {usuario.CORREO_USR}</h3>
                    <h3>Status: {(usuario.STATUS_USR = '1') ? "Activo" : "Inactivo"}</h3>
                </div>
            </div>
        ):(    
            <div id="edit-perfil-modal">
                <div className="top-modal">
                    <div className='label-modal'>
                        <h2>Edición:</h2>
                    </div>
                    <div className='close-modal'>
                    <button onClick={() => { setShowModal(prev => !prev); setShowConfirm(false) }}> <FaRegWindowClose/> </button>
                    </div>
                </div>
                <form className='edit-form'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name='name' placeholder={usuario.NOMBRE_USR} onChange={handleEditUsuario} />

                    <label htmlFor="tel">Teléfono:</label>
                    <input type="numeric" name='tel' onChange={handleEditUsuario} />

                    <label htmlFor="correo">Correo</label>
                    <input type="email" name='correo' placeholder={usuario.CORREO_USR} onChange={handleEditUsuario} />
                
                    {!showConfirm && <button id='guardar-edit' onClick={() => { setShowConfirm(prev => !prev) }} type='button'> Guardar</button>}
                    {showConfirm && <button id='confirm-edit'  >Confirmar</button>} {/* Editar usuario en la BD*/}
                    
                    
                </form>
            </div>
        )}
        </div>
    );
};
export default Perfil;
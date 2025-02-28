import React from 'react';

const Perfil = () => {
    

    return (
        <div className="user-profile-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800">Perfil del Usuario</h2>
            <div className="mt-6 space-y-4">
                <p><strong>Nombre:</strong> {/* Aquí va el nombre del usuario */}</p>
                <p><strong>Correo:</strong> {/* Aquí va el correo del usuario */}</p>
                <p><strong>Teléfono:</strong> {/* Aquí va el teléfono del usuario */}</p>
                <p><strong>Dirección:</strong> {/* Aquí va la dirección del usuario */}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Editar Perfil</button>
            </div>
        </div>
    );
};
export default Perfil;
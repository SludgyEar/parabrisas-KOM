import React, { useState, useEffect } from 'react';
import '../styles/ventasStyle.css';
import { useAuth } from '../providers/UserProvider';
import axios from 'axios';
import ReporteVentas from './ReporteVentas';
const apiUrl = process.env.REACT_APP_API_URL;

function Ventas() {
    const auth = useAuth();
    /**Ingreso nombre del cliente y correo, su teléfono y su RFC se agrega automáticamente*/
    const [client, setClient] = useState({
        nombreClient: '',
        emailClient: '',
        telClient: '',
        rfcClient: ''

    });
    const handleSetClient = (e) => {
        setClient(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFetchClient = async () => {
        try {
            /*
             *  Esto se ejecuta cuando se llena el nombre y el correo del cliente
            *   Se hace una petición al back para obtener el RFC y el teléfono
            *   Es decir, esta función se ejecuta en un useEffect[client.emailClient]
            */
            const response = await axios.get(`${apiUrl}/clientData`, {
                params: { nombreClient: client.nombreClient, emailClient: client.emailClient }
            });
            if (response.status === 201) {
                const { TEL_USR, RFC_USR } = response.data;
                setClient(prev => ({ ...prev, telClient: TEL_USR, rfcClient: RFC_USR }));
            }
        } catch (err) { console.log("Error en el front"); }
    };

    useEffect(() => {
        handleFetchClient();

    }, [client.emailClient, client.nombreClient]);

    return (
        <div className='ventas-container-top'>
            {(auth.user.PERFIL_USR === 'D' || auth.user.PERFIL_USR === 'C') ? (
                <div className='ventas-container'>
                    <h1>Ventas</h1>
                    <form className='ventas-form'>
                        <div className="input-top-wrapper">
                            <label htmlFor="nombreClient">Cliente</label>
                            <input type="text" name="nombreClient" placeholder='Nombre Completo' onChange={handleSetClient} />
                            <label htmlFor="emailClient">Correo</label>
                            <input type="email" id='ventas-email-input' name='emailClient' placeholder='Email del Cliente' onChange={handleSetClient} />
                        </div>
                        <div className="input-top-wrapper">
                            <label htmlFor="telClient">Teléfono</label>
                            <input type="text" name='telClient' placeholder='Ingrese el Número de Tel.' value={client.telClient} />
                            <label htmlFor="rfcClient">RFC</label>
                            <input type="text" name='rfcClient' placeholder='Ingrese RFC del cliente' value={client.rfcClient} />
                        </div>
                        <div className="input-bottom-wrapper">
                            <label htmlFor="clavePbs">Clave Pbs</label>
                            <input type="text" name="clavePbs" placeholder="Ingrese la Clave Pbs" />
                            <label htmlFor="marcaPbs">Marca</label>
                            <input type="text" name="marcaPbs" placeholder="Ingrese la Marca" />
                            <label htmlFor="precioPbs">Precio</label>
                            <input type="text" name="precioPbs" placeholder="Ingrese el Precio" id='precioPbs' />
                        </div>
                            <label>Disponible</label>
                            <button>Comprar</button>
                        
                    </form>
                    <div className='input-bottom-wrapper' style={ { paddingLeft: '20px' } }>
                        <ReporteVentas/>
                    </div>
                </div>
            ) : (
                <div>
                    Hola {auth.user.NOMBRE_USR}, no tienes permisos para acceder a esta sección.
                </div>
            )}
        </div>
        
    );
}

export default Ventas;

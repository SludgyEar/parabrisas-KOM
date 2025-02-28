import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/catalogo.css';

const Catalogo = () => {
    
    const  [pbs, setPbs] = useState([]);

    const getPbs = async () => {
        try{   
            const response = await axios.get('http://localhost:5000/parabrisas');
            setPbs(response.data);
        }catch (err) { console.log(err); }
    };

    useEffect(() => {
        getPbs();
        // Obtiene los pbs al abrir la página
    }, []);



    return (
        <div className="container">
            {pbs.slice(0, 3).map((product, index) => (
                <div key={index} className="card">
                    <h2 className="title">{product.marca_pbs}</h2>
                    <p className="info">Clave: {product.clave_pbs}</p>
                    <p className="info">Precio: ${product.precio_pbs}</p>
                    <p className="info">Stock: {product.stock_pbs}</p>
                    <p className="info">Estado: {product.estado_pbs}</p>
                </div>
            ))}
        </div>
    );
};
export default Catalogo;
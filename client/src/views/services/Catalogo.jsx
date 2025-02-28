import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/catalogo.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

    const exportToPDF = (pbs) => {
        // Función para exportar a PDF
        const doc = new jsPDF();

        const head = [['Clave', 'Marca', 'Precio', 'Stock']];

        const body = pbs.map(parabrisas => [
            parabrisas.clave_pbs,
            parabrisas.marca_pbs,
            parabrisas.precio_pbs,
            parabrisas.stock_pbs
        ]);

        autoTable(doc, {
            head: head,
            body: body,           
            startY: 20,               // Comienza a 20 unidades del tope del documento
            margin: { horizontal: 10 }, // Márgenes horizontales
            styles: { fontSize: 10 },    // Estilo general de la tabla
            headStyles: { fillColor: [68, 68, 68] } // Color del encabezado
        });
        doc.save('Catalogo.pdf');
    };

    // Siguientes 3 pbs
    const [currtPage, setCurrPage] = useState(0);
    const pbsPerPage = 2;

    const handleNext = () => {
        if(currtPage < Math.floor(pbs.length / pbsPerPage)){
            setCurrPage(currtPage + 1);
        }
    };
    const handlePrev = () =>{
        if(currtPage > 0){
            setCurrPage(currtPage - 1);
        }
    };
    const startIndex = currtPage * pbsPerPage;
    const selectedPbs = pbs.slice(startIndex, startIndex + pbsPerPage);

    return (
        <div className="container">
            {selectedPbs.slice(0, 2).map((product, index) => (
                <div key={index} className="card">
                    <h2 className="title">{product.marca_pbs}</h2>
                    <p className="info">Clave: {product.clave_pbs}</p>
                    <p className="info">Precio: ${product.precio_pbs}</p>
                    <p className="info">Stock: {product.stock_pbs}</p>
                    <p className="info">Estado: {product.estado_pbs}</p>
                </div>
            ))}
            <div className='navegationContainer'>
                <form>
                    <input className="searchInput" type="text" placeholder="Buscar" />
                    <button className="searchSubmit" type="submit">Buscar</button>
                </form>
                <button className='navegation' onClick={handlePrev} disabled={currtPage === 0}>Anterior</button>
                <button className='navegation' onClick={handleNext} disabled={startIndex + pbsPerPage >= pbs.length}>Siguiente</button>
                <button id='export-btn' onClick={() => exportToPDF(pbs)}>Exportar</button>
            </div>
        </div>
    );
};
export default Catalogo;
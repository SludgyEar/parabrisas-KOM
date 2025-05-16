import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/test2Style.css';
import '../styles/catalogo.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import ImportarPortal from './ImportarPortal';
import { useAuth } from '../providers/UserProvider';

const apiUrl = process.env.REACT_APP_API_URL;

const Catalogo = () => {
    const auth = useAuth();
    
    const  [pbs, setPbs] = useState([]);

    const getPbs = async () => {
        try{   
            const response = await axios.get(`${apiUrl}/parabrisas`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            setPbs(response.data);
            console.log("Objeto recibido en el cliente: ", response.data);
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
// Búsqueda y Filtrado
    const [filtro, setFiltro] = useState({tipo: "marca"});
    const handleFiltro = (e) => {
        const tipo = e.target.name;
        setFiltro({tipo});
    };
    const [chosenPbs, setChosen] = useState({
        value: ""
    });
    const handleChoice = (e) => {
        setChosen(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            let response = null;
            if(chosenPbs.value){
                response = await axios.get(`${apiUrl}/parabrisas`,{
                    params: { [filtro.tipo]: chosenPbs.value},
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                setPbs(response.data);
            }else {
                await getPbs();
            }
            setChosen({value: ""});
        } catch (error) { console.log(error); }
    };

    return (
        <div className="container-catalogo">
            <div className='card-container'>
                {Array.isArray(selectedPbs) && (
                    selectedPbs.slice(0, 2).map((product, index) => (
                        <div key={index} className="card">
                            <h2 className="title">{product.marca_pbs}</h2>
                            <p className="info">Clave: {product.clave_pbs}</p>
                            <p className="info">Precio: ${product.precio_pbs}</p>
                            <p className="info">Stock: {product.stock_pbs}</p>
                            <p className="info">Estado: {product.estado_pbs}</p>
                        </div>
                    ))
                )}
            </div>
            <div className='navegationContainer' id='navegationContainer'>
                {/* botones de filtrado */}
                <button className="filtro-select" onClick={handleFiltro} name="clave">Clave</button>
                <button className="filtro-select" onClick={handleFiltro} name="marca">Marca</button>
                <button className="filtro-select" onClick={handleFiltro} name="estado">Estado</button>
                <form onSubmit={handleSearch}>
                    <input className="searchInput" name='value' type="text" placeholder={`Buscar por ${filtro.tipo}`} onChange={handleChoice} />
                    <button className="searchSubmit" type="submit">Buscar</button>
                </form>
                <button className='navegation' onClick={handlePrev} disabled={currtPage === 0}>Anterior</button>
                <button className='navegation' onClick={handleNext} disabled={startIndex + pbsPerPage >= pbs.length}>Siguiente</button>
                <button id='export-btn' onClick={() => exportToPDF(pbs)}>Exportar</button>
                {auth.isAdmin && <ImportarPortal />}
            </div>
        </div>
    );
};
export default Catalogo;
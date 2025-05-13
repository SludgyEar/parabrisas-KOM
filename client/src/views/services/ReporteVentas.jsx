import React, { useState } from 'react';
import '../styles/reporteVentasStyle.css'
import { useAuth } from '../providers/UserProvider'
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { exportPdf } from '../utils/exportPdf';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const apiUrl = process.env.REACT_APP_API_URL;

const ReporteVentas = () => {
    // Datos
    const [cantVentas, setCantVentas] = useState({});
    const [ingresos, setIngresos] = useState({});
    const [claveMasVendida, setClaveVendida] = useState({});
    const [clienteFrecuente, setClienteFrecuente] = useState({});
    const [detalleTable, setDetalleTable] = useState([]);
    // Graficas
    const [barData, setBarData] = useState(null);
    const [pieData, setPieData] = useState(null);
    // Usuario que genera el reporte
    const auth = useAuth();
    // Manejo de estado para el overlay
    const [shOverlay, setShOverlay] = useState(false);
    const toggleOverlay = () => {
        setShOverlay(!shOverlay);
    };
    const [shOverlayReport, setOverlayReport] = useState(false);
    const toggleOverlayReport = () => {
        setOverlayReport(!shOverlayReport);
    };
    // Obtención de parámetros para la obtención de datos
    const dateTimeLocalNow = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60_000).toISOString().slice(0, 16).replace("T", " ");
    const [fecha, setFecha] = useState({
        fecha: dateTimeLocalNow.slice(0, 10)
    });
    const handleSetFecha = (e) => {
        setFecha({ fecha: e.target.value.replace("T", " ").slice(0, 10) });
    };
    const [tipoGrafica, setTipoGrafica] = useState('bar');
    const handleSetTipoGrafica = (e) => {
        setTipoGrafica(e.target.value);
    };
    // Obtención de datos para la gráfica
    const handleFetchData = async () => {
        try {
            const ventas = await axios.get(`${apiUrl}/cantVentasPbsMes`, { params: fecha });
            const ingr = await axios.get(`${apiUrl}/totalVentasPbsMes`, { params: fecha });
            const clave = await axios.get(`${apiUrl}/claveMasVendida`, { params: fecha });
            const cliente = await axios.get(`${apiUrl}/clienteFrecuente`, { params: fecha });
            const dataGraph = await axios.get(`${apiUrl}/cantVentasGrafica`, { params: fecha });
            const detalle = await axios.get(`${apiUrl}/concentradoVentas`, { params: fecha });

            setCantVentas(ventas.data);
            setIngresos(ingr.data);
            setClaveVendida(clave.data);
            setClienteFrecuente(cliente.data);
            setDetalleTable(detalle.data);
            if (tipoGrafica === 'pie') {
                const mesesPieTemp = dataGraph.data.map(item => item?.MES);
                const ventasPieTemp = dataGraph.data.map(item => item?.TOTAL_VENTAS);
                setPieData({
                    labels: mesesPieTemp,
                    datasets: [
                        {
                            label: 'Ventas',
                            data: ventasPieTemp,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });

            } else {
                const mesesBarTemp = dataGraph.data.map(item => item?.MES);
                const ventasBarTemp = dataGraph.data.map(item => item?.TOTAL_VENTAS)
                setBarData({
                    labels: mesesBarTemp,
                    datasets: [
                        {
                            label: 'Ventas por Mes',
                            data: ventasBarTemp,
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                            borderColor: 'rgb(53, 162, 235)',
                            borderWidth: 1,
                        },
                    ],
                });
            }



        } catch (err) { console.log("Oh oh, ocurrió un error", err) }
    };






    return (
        <div style={{ overflowY: 'auto'}}>
            <button className="toggle-button" onClick={toggleOverlay} style={{ fontSize: '12px', padding: '5px 10px' }}>Generar Reporte</button>

            {shOverlay && (
                <div>
                    <div className='overlay'>
                        <div className="overlay-content">
                            <div className="input-wrapper">
                                <label >Seleccione un periodo de tiempo</label>

                                <input type="datetime-local" defaultValue={dateTimeLocalNow} onChange={handleSetFecha} />
                                <label>Seleccione el tipo de gráfico</label>
                                <select onChange={handleSetTipoGrafica}>
                                    <option value="bar">Seleccione un tipo de gráfico</option>
                                    <option value="bar">Barras</option>
                                    <option value="pie">Pastel</option>
                                </select>
                                <button onClick={() => {
                                    handleFetchData();
                                    toggleOverlayReport();
                                }}>Visualizar</button>
                            </div>
                            <button onClick={toggleOverlay}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {shOverlayReport && (
                <div className='overlay'>
                    <div className="overlay-content">
                        <div className="reporteVentas" id='reporteVentasPage'>
                            <h2>Reporte Mensual Ventas de Parabrisas del Periodo {fecha.fecha}</h2>
                            <h3>Reporte Generado el día: {dateTimeLocalNow}</h3>
                            <h3>Responsable: {auth.user.NOMBRE_USR}. Quien desempeña el puesto de {(auth.user.PERFIL_USR === 'C') ? "Administrador" : "Recepcionista"}</h3>
                            <p>En el presente informe se analiza el volumen de ventas presentado en el mes de {fecha.fecha}.
                                Se incluyen diversos apoyos visuales para facilitar la comprensión de los datos.
                                Se espera que este informe sirva como base para la toma de decisiones y la planificación de estrategias futuras.
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Total Ventas</th>
                                        <th>Ingresos Totales</th>
                                        <th>Clave más Vendida</th>
                                        <th>Cliente más Frecuente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> {cantVentas[0]?.TOTAL}</td>
                                        <td>${ingresos[0]?.VENTAS}</td>
                                        <td> {(claveMasVendida[0]?.CLAVE_PBS)}</td>
                                        <td> {(clienteFrecuente[0]?.NOMBRE)}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>En la presente tabla se puede observar el total de ventas en el periodo dado, así como los ingresos totales generados por las ventas de parabrisas.
                                Además, se incluye la clave del parabrisas más vendido con una cantidad de piezas vendidas de <strong>{claveMasVendida[0]?.VENDIDOS}</strong> y el
                                cliente que ha realizado más compras en el periodo dado, acumulando un total de <strong>{clienteFrecuente[0]?.COMPRAS}</strong> compras.
                                <br />A continuación se presenta un gráfico que ilustra compara las ventas de este mes con el semestre anterior.
                            </p>
                            <br />
                            <br />
                            <div className="grafica-report" >
                                {tipoGrafica === 'pie' && pieData ? (
                                    <Pie data={pieData} options={{
                                        responsive: true,
                                        plugins: {
                                            legend: { display: true },
                                            title: {
                                                display: true,
                                                text: 'Distribución de Ventas'
                                            }
                                        }
                                    }} />
                                ) : ( tipoGrafica === 'bar' && barData ? (
                                        <Bar data={barData} options={{
                                            responsive: true,
                                            plugins: {
                                                legend: { display: true },
                                                title: {
                                                    display: true,
                                                    text: 'Ventas por Mes'
                                                }
                                            }
                                        }} />
                                    ) : ( "Crgando datos..." ))}
                            </div>
                            <br />
                            <br />
                            <p>En resumen, los resultados reflejan el desempeño en el periodo evaluado, destacando las tendencias clave de los
                                parabrisas y la identificación de patrones importantes en el comportamiento de compra de los clientes y el producto más solicitado.
                                <br />Estos datos proporcionan una base vaiolsa para comprender mejor el comportamiento del mercado y optimizar las estrategias futuras.
                                <br />El análisis gráfico complementa el reporte al ofrecer una perspectiva clara sobre cómo las ventas actuales se relacionan con el comportamiento
                                observado el semestre anterior. La información aquí presentada permite tomar decisiones informadas que impulsen el crecimiento contínuo del área comercial.
                            </p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => { exportPdf('reporteVentasPage', auth, detalleTable) }}>Guardar</button>
                            <button id="cancelar-button" onClick={toggleOverlayReport}>Cancelar</button>
                            <h4>Nota: Se incorpora una tabla con el concentrado a detalle de las ventas realizadas este mes.</h4>
                        </div>
                            <div className="table-detalle-content">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Marca</th>
                                            <th>Clave</th>
                                            <th>Piezas Vendidas</th>
                                            <th>Piezas Restantes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(detalleTable) && detalleTable.map((detail, index) => (
                                            <tr key={index}>
                                                <td>{detail?.MARCA}</td>
                                                <td>{detail?.CLAVE}</td>
                                                <td>{detail?.PZAS_VENDIDAS}</td>
                                                <td>{detail?.PZAS_RESTANTES}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReporteVentas;
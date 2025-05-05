import { useState } from 'react';
import "../styles/feedBackStyle.css"; // Archivo CSS para estilos
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function FeedBack() {
    const navigate = useNavigate();
    const preguntas = [
        "¿La interfaz te parece atractiva?",
        "¿La interfaz es fácil de usar?",
        "¿El sistema funciona correctamente?",
        "¿La información es accesible?",
        "¿Qué tanto te gusta el sistema?",
        "¿Tienes alguna sugerencia?"
    ];

    const [preguntaActual, setPreguntaActual] = useState(0);
    const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill("")); // 
    const [encuestaCompletada, setEncuestaCompletada] = useState(false);

    const handleRespuesta = (valorRespuesta) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[preguntaActual] = valorRespuesta;
        setRespuestas(nuevasRespuestas);
    };

    const handleTextInput = (e) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[preguntaActual] = e.target.value;
        setRespuestas(nuevasRespuestas);
    };

    const handleSiguiente = () => {
        if (preguntaActual < preguntas.length - 1) {
            setPreguntaActual(preguntaActual + 1);
        } else {
            setEncuestaCompletada(true);
        }
    };

    const handleAnterior = () => {
        if (preguntaActual > 0) {
            setPreguntaActual(preguntaActual - 1);
        }
    };

    const handleSendFeedBack = () => {
        try{
            axios.post("http://localhost:5000/feedback", respuestas);
        }catch(err){ console.error(err) }
    };

    const finalizarEncuesta = () => {
        handleSendFeedBack(); // Enviar las respuestas al servidor
        setPreguntaActual(0);
        setRespuestas(Array(preguntas.length).fill(""));
        setEncuestaCompletada(false);
        navigate("/"); // Redirigir a la página de inicio o donde desees
    };


    // Verificar si la pregunta actual requiere entrada de texto (la última pregunta)
    const esInputTexto = preguntaActual === preguntas.length - 1;

    // Calcular el porcentaje de progreso
    const porcentajeProgreso = Math.round((preguntaActual / (preguntas.length - 1)) * 100);

    if (encuestaCompletada) {
        return (
            <div className="completado-container">
                <h2 className="titulo-completado">¡Gracias por completar la encuesta!</h2>

                <div className="respuestas-container">
                    <h3 className="subtitulo-respuestas">Tus respuestas:</h3>
                    {preguntas.map((pregunta, index) => (
                        <div key={index} className="respuesta-item">
                            <p className="pregunta-texto">{pregunta}</p>
                            <p className="respuesta-texto">
                                {index === preguntas.length - 1 ?
                                    respuestas[index] || "Sin sugerencias" :
                                    `Calificación: ${respuestas[index] || "No respondida"}`}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={finalizarEncuesta}
                    className="boton-reiniciar"
                >
                    Finalizar
                </button>
            </div>
        );
    }

    return (
        <div className="encuesta-container">
            <div className="progreso-info">
                <span className="numero-pregunta">Pregunta {preguntaActual + 1} de {preguntas.length}</span>
                <span className="porcentaje-completado">{porcentajeProgreso}% completado</span>
            </div>

            <div className="barra-progreso-container">
                <div
                    className="barra-progreso"
                    style={{ width: `${porcentajeProgreso}%` }}
                ></div>
            </div>

            <h2 className="titulo-pregunta">
                {preguntas[preguntaActual]}
            </h2>

            {esInputTexto ? (
                <div className="area-texto">
                    <textarea
                        className="input-sugerencia"
                        placeholder="Escribe tu sugerencia aquí..."
                        value={respuestas[preguntaActual] || ""}
                        onChange={handleTextInput}
                    ></textarea>
                </div>
            ) : (
                <div className="botones-valoracion">
                    <div className="contenedor-botones">
                        {[1, 2, 3, 4, 5].map((valor) => (
                            <button
                                key={valor}
                                onClick={() => handleRespuesta(valor)}
                                className={`boton-valoracion ${respuestas[preguntaActual] === valor
                                        ? "boton-valoracion-seleccionado"
                                        : "boton-valoracion-no-seleccionado"
                                    }`}
                            >
                                {valor}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="botones-navegacion">
                <button
                    onClick={handleAnterior}
                    disabled={preguntaActual === 0}
                    className={`boton-anterior ${preguntaActual === 0
                            ? "boton-anterior-inactivo"
                            : "boton-anterior-activo"
                        }`}
                >
                    Anterior
                </button>

                <button
                    onClick={handleSiguiente}
                    className={`boton-siguiente ${esInputTexto && !respuestas[preguntaActual] ? "" : (!esInputTexto && !respuestas[preguntaActual] ? "boton-siguiente-inactivo" : "")
                        }`}
                    disabled={!esInputTexto && !respuestas[preguntaActual]}
                >
                    {preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
                </button>
            </div>
        </div>
    );
}
import React, { useState, useRef } from "react";
import "../styles/importar.css";
import axios from "axios";

export default function Importar({ onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.name.split('.').pop().toLowerCase();
            if (fileType !== 'csv' && fileType !== 'xlsx' && fileType !== 'xls') {
                setError("Por favor selecciona un archivo CSV o Excel (.xlsx, .xls)");
                setSelectedFile(null);
                return;
            }

            setError("");
            setSelectedFile(file);
            setSuccess("");
        }
    };

    const handleImport = async () => {
        if (!selectedFile) {
            setError("Por favor selecciona un archivo primero");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("archivo", selectedFile);

        try {
            // Aquí simularemos el proceso de carga
            // En una implementación real, enviarías el archivo al backend... el archivo esta contenido en selectedFile

            await axios.post('http://localhost:5000/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

            // Si todo sale bien:
            setSuccess(`Archivo "${selectedFile.name}" importado exitosamente`);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setLoading(false);
        } catch (err) {
            setError("Error al importar el archivo. Inténtalo de nuevo.");
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const fileType = file.name.split('.').pop().toLowerCase();

            if (fileType !== 'csv' && fileType !== 'xlsx' && fileType !== 'xls') {
                setError("Por favor selecciona un archivo CSV o Excel (.xlsx, .xls)");
                return;
            }

            setSelectedFile(file);
            setError("");
            setSuccess("");
        }
    };

    return (
        <div className="importar-container">
            <div className="importar-header">
                <h2 className="importar-title">Importar Datos de Parabrisas</h2>
                <p className="importar-subtitle">
                    Importa tu inventario desde archivos CSV o Excel
                </p>
            </div>

            <div
                className={`importar-dropzone ${selectedFile ? 'file-selected' : ''}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {selectedFile ? (
                    <div>
                        <div className="file-selected-label">
                            Archivo seleccionado:
                        </div>
                        <div className="file-selected-name">
                            <svg className="file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            <span>{selectedFile.name}</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="dropzone-text">
                            Arrastra y suelta tu archivo aquí, o
                        </p>
                        <label className="file-select-button">
                            Seleccionar archivo
                            <input
                                name="archivo"
                                type="file"
                                className="hidden-input"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </label>
                        <p className="dropzone-formats">
                            Formatos aceptados: CSV, Excel (.xlsx, .xls)
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {success && (
                <div className="success-message">
                    <p>{success}</p>
                </div>
            )}

            <div className="importar-actions">
                <button
                    className="cancel-button"
                    onClick={() => {
                        setSelectedFile(null);
                        setError("");
                        setSuccess("");
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                        onClose();
                    }}
                >
                    Cancelar
                </button>

                <button
                    className={`import-button ${!selectedFile || loading ? 'disabled' : ''}`}
                    onClick={handleImport}
                    disabled={!selectedFile || loading}
                >
                    {loading ? (
                        <span className="loading-text">
                            <svg className="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Importando...
                        </span>
                    ) : (
                        "Importar Archivo"
                    )}
                </button>
            </div>
        </div>
    );
}
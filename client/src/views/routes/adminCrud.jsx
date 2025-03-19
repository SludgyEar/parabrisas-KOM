import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/adminStyle.css";
import { Link } from "react-router-dom";

const AdminCrud = () => {
    // Cambio de divs por estado
    const [shFirst, setShFirst] = useState(true);   // En un principio se muestra el div de insert

    // Insert:
    const [user, SetUser] = useState({
        nombre: "",
        correo: "",
        passwd: "",
        perfil: "A",
        status: "1"
    });

    const handleUser = (e) =>{
        SetUser(prev => ({...prev, [e.target.name]: e.target.value}));
        // Usa la variable usuario para inicializar uno, este usuario será usado para crear uno nuevo o actualizar un usuario existente
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            await axios.post("http://localhost:5000/register", user);
            form.nombre.value = form.correo.value = form.passwd.value = '';
            form.perfil.value = "A";
            form.status.value = "1";
            SetUser({
                nombre: "",
                correo: "",
                passwd: "",
                perfil: "A",
                status: "1"
            });
            getCurrUsrs();
        } catch (err) { console.log(err); }
        // Inserta un nuevo usuario en la base de datos
    };

    // Update:
    const handleUpdate = async (e) => {
        e.preventDefault();
        try{
            const form = e.target;
            const usuario = user;
            form.nombre.value = form.correo.value = form.passwd.value = '';
            form.perfil.value = "A";
            form.status.value = "1";
            SetUser({
                nombre: "",
                correo: "",
                passwd: "",
                perfil: "A",
                status: "1"
            });
            await axios.put(`http://localhost:5000/update/${usuario.id}`, usuario);
            getCurrUsrs();

        }catch(err){ console.log(err); }
    };

    // Search:
    
    const [filtro, setFiltro] = useState({tipo: "nombre"});
    const handleFiltro = (e) => {
        const tipo = e.target.name;
        setFiltro({ tipo });
    };
    
    const [currUsrs, setCurrUsrs] = useState([]);   // Lista de usuarios a desplegar
    const getCurrUsrs = async () =>{
        try {
            const response = await axios.get("http://localhost:5000/usuarios"); // Se cambio la ruta de la petición de usuarios activos a todos los usuarios
            setCurrUsrs(response.data);
        } catch (err) { console.log(err); }
    };

    useEffect(() => {
        getCurrUsrs();
        // Obtiene todos los usuarios al cargar la página
    }, []);


    const [valueUsr, setValueUser] = useState({
        value: ""
    });   // Contiene el criterio de búsqueda para la tabla de usuarios {nombre, correo, id}
    const handleValueUser = (e) => {
        setValueUser(prev => ({...prev, [e.target.name]: e.target.value}));
        // Obtiene el criterio de búsqueda para la tabla de usuarios
    };
    const handleCurrUsrs = async (e) => {
        e.preventDefault();
        try {
            let response = null;
            if (valueUsr.value) {
                response = await axios.get("http://localhost:5000/usuarios", {
                    params: { [filtro.tipo]: valueUsr.value } // Usa el tipo de filtro como clave
                });
                setCurrUsrs(response.data); // Actualiza la lista de usuarios
            } else {
                await getCurrUsrs(); // Si no hay valor, obtén todos los usuarios
            }
            setValueUser({ value: "" });
        } catch (err) {
            console.log(err);
        }
    };
    // Una vez se busqué el usuario debe de limpiar el label de búsqueda


    return (
        <div>
            <header className="header">
                <div className="logo">
                    <Link><p>CRUD de Usuarios</p></Link>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Usuarios</a></li>
                    </ul>
                </nav>
            </header>

            <div className="container" id="contenedor">

                {/* Creación de usuarios */}
                {(shFirst) ? (
                    <div className="section" id="insert">
                        <h2>Agregar Usuario</h2>
                        <form onSubmit={handleInsert}>
                            <input type="text" placeholder="Nombre" id="input-nombre" name="nombre" onChange={handleUser} required />
                            <input type="text" placeholder="Correo" id="input-correo" name="correo" onChange={handleUser} required />
                            <input type="password" placeholder="Contraseña" name="passwd" onChange={handleUser} required />
                            <div className="select-container">
                                <select name="perfil" className="select-custom" value={user.perfil} onChange={handleUser}>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>

                                <select name="status" className="select-custom" value={user.status} onChange={handleUser}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>

                            <input type="submit" value="Agregar Usuario" id="insert-user" />
                        </form>
                    </div>
                ) : (
                    <div className="section" id="update">
                        <h2>Editar usuario</h2>
                        <form onSubmit={handleUpdate}>
                            <input type="text" placeholder="Nombre" id="input-edit-name" name="nombre" onChange={handleUser} value={user.nombre} required />
                            <input type="text" placeholder="Correo" id="input-edit-correo" name="correo" onChange={handleUser} value={user.correo} required />
                            <input type="password" placeholder="Contraseña" name="passwd" onChange={handleUser} />
                            <div className="select-container">
                                <select name="perfil" className="select-custom" value={user.perfil} onChange={handleUser}>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                </select>

                                <select name="status" className="select-custom" value={user.status} onChange={handleUser}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                            <input type="submit" value="Guardar" id="edit-user" />
                        </form>
                    </div>
                    )
                }

                {/* Búsqueda de usuarios */}

                <div className="section" id="tabla">
                    <h2>Filtrar Usuarios</h2>
                    <button className="filtro-select" onClick={handleFiltro} name="id">ID</button>
                    <button className="filtro-select" onClick={handleFiltro} name="nombre">Nombre</button>
                    <button className="filtro-select" onClick={handleFiltro} name="correo">Correo</button>
                    <button className="filtro-select" onClick={handleFiltro} name="status">Status</button>
                    <button className="filtro-select" onClick={handleFiltro} name="perfil">Perfil</button>
                    <form onSubmit={handleCurrUsrs}>
                        <input type="text" placeholder={`Buscar por ${filtro.tipo}`} name="value" id="input-search" onChange={handleValueUser}  />
                        <input type="submit" value="Buscar Usuario" id="buscar-usuario" />
                    </form>

                    <h2>Lista de Usuarios</h2>
                    <div id="tabla-container" className="section">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Perfil</th>
                                    <th>Status</th>
                                    <th>Alta</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(currUsrs) && currUsrs.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id_usr}</td>
                                        <td>{usuario.nombre_usr}</td>
                                        <td>{usuario.correo_usr}</td>
                                        <td>{usuario.passwd_usr}</td>
                                        <td>{usuario.perfil_usr}</td>
                                        <td>{usuario.status_usr}</td>
                                        <td>{usuario.alta_usr}</td>
                                        <td>

                                            <button 
                                                className="delete-edit"
                                                id="btn-delete"
                                                onClick={async (e) => {
                                                    e.preventDefault();
                                                    try{
                                                        let idToDelete = usuario.id_usr;
                                                        await axios.put(`http://localhost:5000/delete/${idToDelete}`);  // Así se busca un parámetro correctamente
                                                        getCurrUsrs();

                                                    }catch(err){console.log(err);}
                                                }}
                                                
                                            >
                                            Borrar
                                            </button>
                                            <button 
                                                className="delete-edit"
                                                id="btn-edit"
                                                onClick={ async (e) =>{
                                                    let userToUpdate = {
                                                        id : usuario.id_usr,
                                                        nombre: usuario.nombre_usr,
                                                        correo: usuario.correo_usr,
                                                        passwd: usuario.passwd_usr,
                                                        perfil: usuario.perfil_usr,
                                                        status: usuario.status_usr
                                                    }   // Obtiene los datos del usuario del botón
                                                    SetUser(userToUpdate);
                                                    setShFirst(prev => !prev);
                                                }}>
                                                Editar
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <footer className="footer">
                <strong>
                    <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                    <p><a href="#">Términos y Condiciones</a></p>
                </strong>
            </footer>
        </div>
    );
};

export default AdminCrud;

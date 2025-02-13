import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminStyle.css";

const AdminCrud = () => {

    const [newUser, setNewUser] = useState({
        nombre: "",
        correo: "",
        passwd: "",
        perfil: "",
        status: ""
    });

    const handleNewUser = (e) =>{
        setNewUser(prev => ({...prev, [e.target.name]: e.target.value}));
        // Crea un nuevo usuario y lo inicializa con las variables ingresadas por el usr
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", newUser);
            navigate("/adminCrud")
            // Envia la info del nuevo usuario al servidor
        } catch (err) {console.log(err);}
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <a href="#">CRUD de Usuarios</a>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Usuarios</a></li>
                    </ul>
                </nav>
            </header>

            <div className="container">
                <div className="section">
                    <h2>Filtrar Usuarios</h2>
                    <form >
                        <input
                            type="text"
                            placeholder="Buscar por correo"
                            
                            required
                        />
                        <input type="submit" value="Buscar Usuario" />
                    </form>

                    <h2>Lista de Usuarios</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                            /* {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.correo}</td>
                                    <td>{usuario.passwd}</td>
                                    <td>{usuario.perfil}</td>
                                    <td>{usuario.status}</td>
                                    <td>{usuario.alta}</td>
                                </tr>
                            ))} */
                            }
                        </tbody>
                    </table>
                </div>

                <div className="section">
                    <h2>Agregar Usuario</h2>
                    <form onSubmit={handleInsert}>
                        <input type="text" placeholder="Nombre" name="nombre" onChange={handleNewUser} required />
                        <input type="text" placeholder="Correo" name="correo" onChange={handleNewUser} required />
                        <input type="password" placeholder="Contraseña" name="passwd" onChange={handleNewUser} required />
                        <input type="text" placeholder="Perfil" name="perfil" onChange={handleNewUser} />
                        <input type="text" placeholder="Status" name="status" onChange={handleNewUser} />
                        <button type="submit">Agregar Usuario</button>
                    </form>

                    <h2>Modificar Usuario</h2>
                    <form >
                        <input type="text" placeholder="Nombre"  required />
                        <input type="text" placeholder="Nuevo correo"  />
                        <input type="password" placeholder="Nueva contraseña"  />
                        <input type="text" placeholder="Nuevo perfil (A/B)"  />
                        <input type="text" placeholder="Nuevo status (1/2)"  />
                        <input type="submit" value="Modificar Usuario" />
                    </form>
                </div>
            </div>
            <footer>
                <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                <p><a href="#">Términos y Condiciones</a></p>
            </footer>
        </div>
    );
};

export default AdminCrud;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminStyle.css";

const AdminCrud = () => {

    const [newUser, setNewUser] = useState({
        nombre: "",
        correo: "",
        passwd: "",
        perfil: "A",
        status: "1"
    });

    const handleNewUser = (e) =>{
        setNewUser(prev => ({...prev, [e.target.name]: e.target.value}));
        // Crea un nuevo usuario y lo inicializa con las variables ingresadas por el usr
    };
    const handleInsert = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", newUser);
            const form = e.target; 
            form.nombre.value = form.correo.value = form.passwd.value = form.perfil.value = form.status.value = '';
            setNewUser('');
        } catch (err) {
            console.log(err);
        }
        // Inserta un nuevo usuario en la base de datos
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
                Delimiter
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
                            Delimiter
                <div className="section">
                    <h2>Agregar Usuario</h2>
                    <form onSubmit={handleInsert}>
                        <input type="text" placeholder="Nombre" name="nombre" onChange={handleNewUser} value={newUser.nombre} required />
                        <input type="text" placeholder="Correo" name="correo" onChange={handleNewUser} value={newUser.correo} required />
                        <input type="password" placeholder="Contraseña" name="passwd" onChange={handleNewUser} value={newUser.passwd} required />
                        <div className="select-container">
                            <select name="perfil" className="select-custom" value={newUser.perfil} onChange={handleNewUser}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>

                            <select name="status" className="select-custom" value={newUser.status} onChange={handleNewUser}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>

                        <input type="submit" value="Agregar Usuario" id="insert-user"/>
                    </form>

                    <h2>Modificar Usuario</h2>
                    <form >
                        <input type="text" placeholder="Nombre" required />
                        <input type="text" placeholder="Nuevo correo" />
                        <input type="password" placeholder="Nueva contraseña" />
                        <input type="text" placeholder="Nuevo perfil (A/B)" />
                        <input type="text" placeholder="Nuevo status (1/2)" />
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

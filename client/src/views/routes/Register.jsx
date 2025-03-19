import React, {useState} from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import "../styles/registerStyle.css"; // Asegúrate de importar tu CSS
import { useAuth } from "../providers/UserProvider";

function Register() {

    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        passwd: "",
        perfil: "A",
        status: "1"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario(prev=>({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", usuario);
            if (res.status === 201) {
                navigate("/login");
            }
        } catch (err) {console.log(err);}
    };

    const auth = useAuth();
    if (auth.isAuth) {
        return <Navigate to="/userDashBoard" />;
    }

    return (
        <div>
            <header className="header">
                <div className="logo" id="logo">
                    <Link to="/"> <h1 className="logo" id="nombre-logo">Parabrisas Kom</h1> </Link>
                </div>
            </header>

            <main className="main">
                <div className="register-box">
                    <h1>Registro de usuario</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                        type="text"
                        onChange={handleChange}
                        name="nombre"
                        id="username"
                        placeholder="Ingresa tu nombre de usuario"
                        required
                        />

                        <label htmlFor="email">Email</label>
                        <input
                        type="text"
                        onChange={handleChange}
                        name="correo"
                        id="email"
                        placeholder="Ingresa tu correo"
                        required
                        />

                        <label htmlFor="password">Contraseña</label>
                        <input
                        type="password"
                        onChange={handleChange}
                        name="passwd"
                        id="password"
                        placeholder="Ingresa tu contraseña"
                        required
                        />
                        <button type="submit" >Registrarse</button>
                        <button type="button" onClick={() => navigate("/")}>Cancelar</button>
                    </form>
                </div>
            </main>

            <footer className="footer">
                <strong>
                    <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                    <p><a href="#">Términos y Condiciones</a></p>
                </strong>
            </footer>
        </div>
    );
}

export default Register;

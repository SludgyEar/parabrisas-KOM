import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosConfig";
import { useAuth } from "../providers/UserProvider";
import "../styles/registerStyle.css"

const apiUrl = process.env.REACT_APP_API_URL;

function Register() {
    const navigate = useNavigate();
    const auth = useAuth();
    if (auth.isAuth) {
        navigate("/");
    }

    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        passwd: "",
        tel: "",
        full_name: "",
        perfil: "A",
        status: "1"
    });
    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post(`${apiUrl}/register`, usuario);
            if (res.status === 201) {
                navigate("/login");
            }
        } catch (err) { console.log(err); }
    };


    return (
        <div>
            <header className='header-register'>
                <div className="logo" id="logo">
                    <Link to="/"> <h1 className="logo" id="nombre-logo">Parabrisas Kom</h1> </Link>
                </div>
            </header>
            <main>
                <div className="register-content">
                    <h1>Registro de Usuario</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="register-input-wrapper">
                            <input type="text" placeholder='UserName' onChange={handleChange} name="nombre" required />
                            <input type="text" placeholder='Nombre Completo' onChange={handleChange} name="full_name" required />
                        </div>
                        <div className='register-input-wrapper'>
                            <input type="email" placeholder='Correo Electrónico' onChange={handleChange} name="correo" required />
                            <input type="tel" placeholder='Teléfono' onChange={handleChange} name="tel" required />
                        </div>
                        <div className='register-input-wrapper'>
                            <input type="password" placeholder='Contraseña' onChange={handleChange} name="passwd" required />
                        </div>
                        <div className="register-input-wrapper">
                            <button type="submit" className="register-button">Registrar</button>
                            <button className='register-button' onClick={() => navigate("/")}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </main>
            <footer className='footer-register'>
                <strong>
                    <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                    <p><u>Términos y Condiciones</u></p>
                </strong>
            </footer>
        </div>
    );
}

export default Register;

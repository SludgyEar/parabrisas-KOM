import React from "react";
import "./registerStyle.css"; // Asegúrate de importar tu CSS

function Register() {
    return (
        <div>
            <header>
                <div className="logo">Parabrisas KOM</div>
            </header>

            <main>
                <div className="register-box">
                    <h1>Registro de usuario</h1>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder="Ingresa tu correo" required />

                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Ingresa tu nombre de usuario" required />

                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" required />

                        <button type="submit">Registrarse</button>
                        <button type="reset">Limpiar</button>
                        <button type="button">Cancelar</button>
                    </form>
                </div>
            </main>

            <footer>
                <p>Contacto: info@parabrisaskom.com | Tel: +52 123 456 7890</p>
                <p><a href="#">Términos y Condiciones</a></p>
            </footer>
        </div>
    );
}

export default Register;

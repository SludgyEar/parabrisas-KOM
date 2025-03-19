import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../providers/UserProvider";

export default function ProtectedRoutes() { // Tiene la característica que si el usuario está logeado puede navegar hacia otra ruta
    const auth = useAuth();

    return auth.isAuth ? <Outlet /> : <Navigate to="/" />;
}
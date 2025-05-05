import { useContext, createContext, useState } from "react";

const UserContext = createContext({ // Nuestro hooke
    isAuth: false,
    handleAuth : () => {},
    isAdmin : false,
    handleAdmin : () => {},
    user: {},
    handleUser: () => {},
    feedback: false,
    handleFeedback: () => {},
    handleLogout: () => {},
});

export function UserProvider( { children }){
    const [user, setUser] = useState({});
    const handleUser = (user) => {
        setUser(user);
    }
    
    const [isAdmin, setIsAdmin] = useState(false);
    const handleAdmin = (state = true) => {    // Setter
        setIsAdmin(state);
    }

    const [isAuth, setIsAuth] = useState(false);
    const handleAuth = (state = true) =>{
        setIsAuth(state);
    }

    // Esta función se usa al cerrar la sesión, activa una bandera que /home recibe y muestra una encuesta
    const [feedback, setFeedback] = useState(false);
    const handleFeedback = () => {
        setFeedback(!feedback);
    }
    
    const handleLogout = () => {
        setUser({});
        setIsAdmin(false);
        setIsAuth(false);
    };

    return(
        <UserContext.Provider value={{ isAuth, handleAuth, isAdmin, handleAdmin, user, handleUser, feedback, handleFeedback, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext); // Hook personalizado
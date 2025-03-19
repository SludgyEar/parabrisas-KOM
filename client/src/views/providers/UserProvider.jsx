import { useContext, createContext, useState } from "react";

const UserContext = createContext({ // Nuestro hooke
    isAuth: false,
    handleAuth : () => {},
    isAdmin : false,
    handleAdmin : () => {},
    user: {},
    handleUser: () => {},
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


    return(
        <UserContext.Provider value={{ isAuth, handleAuth, isAdmin, handleAdmin, user, handleUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext); // Hook personalizado
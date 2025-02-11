import React, {createContext, useState, useEffect} from 'react';

/* Exportation du contexte pour y avoir accès */
export const AuthContext  = createContext(null);

/* Création du provider pour la connexion et la deco */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Client
    const [token, setToken] = useState(null); // Token JWT

    // Stockage dans le LocalStorage pour la persistance des données
    // (c'est mieux dans le cookie plus sécurisé)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedUser && storedToken) {
            setToken(storedToken);
            setToken(JSON.parse(storedUser));
        }

    }, []);

    // Si le token ou l'email changent, on met à jour le localStorage
    useEffect(() => {
            if (user && token) {
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
    }, [token, user]);


    // Connexion (on recoit les données envoyées par l'API : token + infos client
    const login = (jwt, userData) => {
        setToken(jwt);
        setUser(userData);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
    }

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    )

}
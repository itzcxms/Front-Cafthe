import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate

/* Exportation du contexte pour y avoir accès */
export const AuthContext = createContext(null);

/* Création du provider pour la connexion et la déco */
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
            setUser(JSON.parse(storedUser));
        }
    }, []); // On ajoute navigate comme dépendance

    // Si le token ou l'email changent, on met à jour le localStorage
    useEffect(() => {
        if (user && token) {
            console.log("Mise à jour du localStorage avec :", token, user); // Vérifie les valeurs avant de les enregistrer
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            console.log("Suppression du localStorage"); // Vérifie que la suppression se fait bien
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [token, user]);

    // Connexion (on reçoit les données envoyées par l'API : token + infos client)
    const login = (jwt, userData) => {
        console.log("Login appelé avec :", jwt, userData); // Vérifie les données passées
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
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

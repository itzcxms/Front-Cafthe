import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login, logout, isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/mon-compte");
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/clients/login`, {
                email,
                mot_de_passe: motDePasse,
            });

            const { token, client } = res.data;
            login(token, client);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError(error.response?.data?.message || "Une erreur est survenue.");
        }
    };

    return (
        <div>
            {isAuthenticated ? (
                <>
                    <p>Bonjour, {user?.email || "Utilisateur"}</p>
                    <button onClick={handleLogout}>Déconnexion</button>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                    />

                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        name="mdp"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        autoComplete="off"
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input type="submit" value="Se connecter" />
                </form>
            )}
        </div>
    );
}

export default Login;

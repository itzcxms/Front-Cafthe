import React, { useContext, useState } from 'react';
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Login(props) {
    const {login, logout, isAuthenticated, user} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [mot_de_passe, setMot_de_passe] = useState("");
    const [error, setError] = useState("");

    /*const handleLogout = () => {
        logout();
    }*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // appel a la bdd
            const res = await axios.post("http://localhost:3000/api/clients/login",
                {
                    email,
                    mot_de_passe,
                },
            );

            const {token, client} = res.data;

            // on met a jour le contexte d'authentification
            login(token, client)

            navigate("/");

        } catch (error) {
            console.error("Erreur lors de la connexion : ", error);
            if (error.response.data.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Erreur");
            }
        }
    }
}

//Navigate("/mon-compte");

return (
    <div>
        {isAuthenticated ? (
            <>
                <p> Bonjour, {email} </p>
                <button onClick={handleLogout}>Deconnexion</button>
            </>
            // TODO : navigate vers mon-compte
        ) : (
            <form onSubmit={handleSubmit}>
                <label>
                    Email :
                </label>

                <input
                    type="text"
                    name="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>
                    Mot de passe :
                </label>
                <input
                    type="password"
                    name="mdp"
                    value={mot_de_passe || ""}
                    onChange={(e) => setMot_de_passe(e.target.value)}
                    required
                />
                <input type="submit" value="Envoyer"/>

            </form>
        )}
    </div>
);
}

export default Login;
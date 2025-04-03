import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/MonCompte.css";

function MonCompte() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (!user) {
            navigate("/connexion");
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/api/orders?user_id=${user.id}`)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error("Erreur chargement commandes :", error));
        }
    }, [user, navigate]);

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            setMessage("❌ Les mots de passe ne correspondent pas.");
            return;
        }

        if (!oldPassword || !password) {
            setMessage("❌ Remplissez tous les champs.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/clients/nouveauMdp/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ last_mdp: oldPassword, new_mdp: password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Mot de passe changé avec succès !");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage("❌ Erreur lors du changement de mot de passe.");
        }
    };

    return (
        <div className="mon-compte-container">
            <h1>Mon Compte</h1>
            <p><strong>Email :</strong> {user?.email}</p>

            <h2>Changer de mot de passe</h2>
            <div className="forms">
                <input
                    type="password"
                    placeholder="Ancien mot de passe"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <br/>

            <button
                className={"btn-primary"}
                onClick={handleChangePassword}
            >
                Modifier le mot de passe
            </button>

            {message && <p className="message">{message}</p>}

            <h2>Historique des commandes</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            Commande #{order.id} - {order.date} - {order.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune commande passée.</p>
            )}

            <button className="btn-primary" onClick={logout}>Déconnexion</button>
        </div>
    );
}

export default MonCompte;

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/MonCompte.css";

function MonCompte() {
    const { user, isAuthenticated, logout, checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    // Première vérification de l'authentification
    useEffect(() => {
        const verifyAuth = async () => {
            // Si checkAuth existe, l'appeler pour rafraîchir l'état d'authentification
            if (typeof checkAuth === 'function') {
                await checkAuth();
            }
            setAuthChecked(true);
        };

        verifyAuth();
    }, [checkAuth]);

    // Chargement des commandes une fois l'authentification vérifiée
    useEffect(() => {
        // Attendre que l'authentification soit vérifiée
        if (!authChecked) return;

        // Si pas d'utilisateur après vérification, rediriger
        if (!user) {
            navigate("/connexion");
            return;
        }

        // Charger les commandes si l'utilisateur est authentifié
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/orders?user_id=${user.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des commandes');
                }
                return response.json();
            })
            .then(data => {
                // Transformer les données pour regrouper les produits par commande
                const ordersMap = new Map();

                data.forEach(item => {
                    if (!ordersMap.has(item.id)) {
                        // Créer une nouvelle entrée de commande
                        ordersMap.set(item.id, {
                            id: item.id,
                            total: item.total,
                            statut: item.statut,
                            date_commande: item.date_commande,
                            produits: []
                        });
                    }

                    // Ajouter le produit à la commande
                    ordersMap.get(item.id).produits.push({
                        produit_id: item.produit_id,
                        nom: item.nom,
                        quantite: item.quantite
                    });
                });

                // Convertir la Map en tableau
                setOrders(Array.from(ordersMap.values()));
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur chargement commandes :", error);
                setLoading(false);
            });
    }, [user, navigate, authChecked]);

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ last_mdp: oldPassword, new_mdp: password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Mot de passe changé avec succès !");
                setOldPassword("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            setMessage("❌ Erreur lors du changement de mot de passe.");
        }
    };

    // Helper pour obtenir la classe CSS pour un statut
    const getStatusClass = (statut) => {
        const status = statut.toLowerCase();
        if (status.includes('livré') || status.includes('livree')) return 'status-livree';
        if (status.includes('en cours')) return 'status-en-cours';
        if (status.includes('annul')) return 'status-annulee';
        return 'status-en-attente';
    };

    // Formater la date
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Si l'authentification est en cours de vérification, afficher un message de chargement
    if (!authChecked) {
        return (
            <div className="mon-compte-container">
                <p>Vérification de votre session...</p>
            </div>
        );
    }

    // Si pas d'utilisateur après vérification, afficher un message (redirection déjà en cours)
    if (!user) {
        return (
            <div className="mon-compte-container">
                <p>Redirection vers la page de connexion...</p>
            </div>
        );
    }

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
                <button className="btn-primary" onClick={handleChangePassword}>
                    Modifier le mot de passe
                </button>
            </div>

            {message && <p className="message">{message}</p>}

            <h2>Historique des commandes</h2>

            {loading ? (
                <p>Chargement de vos commandes...</p>
            ) : orders.length > 0 ? (
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <p>
                                <strong>Commande #{order.id}</strong> - {formatDate(order.date_commande)}
                                <span className={`order-status ${getStatusClass(order.statut)}`} style={{marginLeft: '10px'}}>
                                    {order.statut}
                                </span>
                            </p>
                            <p><strong>Total :</strong> {parseFloat(order.total).toFixed(2)} €</p>

                            <h4>Produits</h4>
                            {order.produits && order.produits.length > 0 ? (
                                <ul className="products-list">
                                    {order.produits.map((produit) => (
                                        <li key={produit.produit_id}>
                                            {produit.nom} <strong>x{produit.quantite}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucun détail disponible pour cette commande.</p>
                            )}
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
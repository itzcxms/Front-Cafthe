import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user, isAuthenticated } = useContext(AuthContext);

    // Charger le panier depuis le localStorage au démarrage
    useEffect(() => {
        if (!isAuthenticated) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                const parsedCart = JSON.parse(storedCart);
                setCart(parsedCart);
                updateCartTotals(parsedCart);
            }
        } else if (user?.id) {
            // Si connecté, charger le panier depuis l'API
            fetchCartFromAPI();
        }
    }, [isAuthenticated, user]);

    // Mettre à jour le localStorage quand le panier change
    useEffect(() => {
        if (!isAuthenticated && cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartTotals(cart);
    }, [cart, isAuthenticated]);

    const fetchCartFromAPI = async () => {
        if (!user?.id) return;

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/panier/${user.id}`);
            setCart(response.data.items);
            setTotalPrice(response.data.total);
            setTotalItems(response.data.items.reduce((sum, item) => sum + item.quantite, 0));
        } catch (error) {
            console.error("Erreur lors du chargement du panier :", error);
        }
    };

    const updateCartTotals = (cartItems) => {
        const itemCount = cartItems.reduce((sum, item) => sum + item.quantite, 0);
        const price = cartItems.reduce((sum, item) => sum + (item.prix * item.quantite), 0);

        setTotalItems(itemCount);
        setTotalPrice(price);
    };

    const addToCart = async (product, variante, quantity) => {
        // Si connecté, ajouter à la base de données
        if (isAuthenticated && user?.id) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/panier/ajouter`, {
                    client_id: user.id,
                    produit_id: product.id,
                    variante_poids: variante.poids,
                    quantite: quantity,
                    prix: variante.prix
                });

                // Actualiser le panier depuis l'API
                fetchCartFromAPI();
                toggleCart(true);
                return response.data;
            } catch (error) {
                console.error("Erreur lors de l'ajout au panier :", error);
                return { error: true, message: "Erreur lors de l'ajout au panier" };
            }
        } else {
            // Si non connecté, ajouter au localStorage
            const existingItemIndex = cart.findIndex(
                item => item.produit_id === product.id && item.variante_poids === variante.poids
            );

            let newCart = [...cart];

            if (existingItemIndex !== -1) {
                // Produit existe déjà, mettre à jour la quantité
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantite: newCart[existingItemIndex].quantite + quantity
                };
            } else {
                // Ajouter le nouveau produit
                newCart.push({
                    produit_id: product.id,
                    variante_poids: variante.poids,
                    quantite: quantity,
                    prix: variante.prix,
                    nom: product.nom,
                    image: product.image
                });
            }

            setCart(newCart);
            toggleCart(true);
            return { message: "✅ Produit ajouté au panier" };
        }
    };

    const removeFromCart = async (produitId) => {
        if (isAuthenticated && user?.id) {
            try {
                console.log(`Suppression de l'article avec produit_id : ${produitId} et client_id : ${user.id}`);

                await axios.delete(`${process.env.REACT_APP_API_URL}/api/panier/${produitId}`, {
                    params: { client_id: user.id } // Envoi de client_id en paramètre
                });

                fetchCartFromAPI();
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        } else {
            const newCart = cart.filter(item => item.produit_id !== produitId);
            setCart(newCart);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        console.log(`🔄 Mise à jour de l'article ${itemId} avec quantité ${quantity}`);
        console.log("📦 Contenu du panier:", cart);

        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        if (isAuthenticated && user?.id) {
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/panier/${itemId}`, {
                    quantite: quantity,
                    client_id: user.id // Envoi de client_id dans le body
                });

                fetchCartFromAPI();
            } catch (error) {
                console.error("❌ Erreur lors de la mise à jour :", error);
            }
        } else {
            const newCart = cart.map(item =>
                item.produit_id === itemId ? { ...item, quantite: quantity } : item
            );
            setCart(newCart);
        }
    };

    const clearCart = () => {
        setCart([]);
        if (!isAuthenticated) {
            localStorage.removeItem('cart');
        }
    };

    const toggleCart = (forcedState = null) => {
        setIsCartOpen(forcedState !== null ? forcedState : !isCartOpen);
    };

    // Fusionner le panier local avec le panier du serveur lors de la connexion
    const mergeCartWithServer = async () => {
        if (isAuthenticated && user?.id && cart.length > 0) {
            try {
                // Pour chaque article du panier local, l'ajouter au serveur
                for (const item of cart) {
                    await axios.post(`${process.env.REACT_APP_API_URL}/api/panier/ajouter`, {
                        client_id: user.id,
                        produit_id: item.produit_id,
                        variante_poids: item.variante_poids,
                        quantite: item.quantite,
                        prix: item.prix
                    });
                }

                // Vider le panier local et recharger depuis le serveur
                localStorage.removeItem('cart');
                fetchCartFromAPI();
            } catch (error) {
                console.error("Erreur lors de la fusion des paniers :", error);
            }
        }
    };

    const value = {
        cart,
        totalItems,
        totalPrice,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        mergeCartWithServer
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
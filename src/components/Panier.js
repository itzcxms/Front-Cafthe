import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { X } from "lucide-react";

const Panier = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="relative p-2">
                🛒 <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">{cart.length}</span>
            </button>

            <div className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
                    <X size={24} />
                </button>
                <h2 className="text-lg font-bold mb-4">Votre Panier</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <span>{item.name} - {item.price}€</span>
                                <button onClick={() => removeFromCart(index)} className="text-red-500">❌</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Votre panier est vide.</p>
                )}
            </div>
        </div>
    );
};

export default Panier;
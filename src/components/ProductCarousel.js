import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/ProductCarousel.css";

function ProductCarousel({ api }) {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(api);
                setProduits(response.data);
            } catch (error) {
                console.error("Erreur de chargement des produits ", error);
            }
        };

        fetchProduits();
    }, [api]);

    return (
        <div className="product-carousel">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1440: { slidesPerView: 4 },
                }}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                {produits.map((produit) => (
                    <SwiperSlide key={produit.id}>
                        <Link to={`/produit/${produit.id}`} className="product-slide">
                            <img src={`/assets/images/${produit.image}`} alt={produit.nom} />
                            <h3 className="nomProduit">{produit.nom}</h3>
                            <p className="prixProduit">à partir de {produit.prix}€</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductCarousel;

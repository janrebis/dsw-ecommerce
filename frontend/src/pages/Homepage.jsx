import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import { productsApi } from "../api/products";
import styles from "../styles/Homepage.module.css";

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        productsApi
            .list()
            .then((res) => {
                console.log("PRODUCTS:", res.data); // <-- debug
                setProducts(res.data);
            })
            .catch((e) => {
                console.error("PRODUCTS ERROR:", e); // <-- debug
                setError(
                    e?.response?.data?.message ??
                    e?.message ??
                    "B³¹d pobierania produktów"
                );
            });
    }, []);

    return (
        <div className={styles.homepage}>
            <NavBar page_header="Nasze Produkty" />

            <main className={styles.mainContent}>
                {error && <div style={{ padding: 12 }}>{error}</div>}

                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className={styles.productLink}
                        >
                            <ProductCard
                                product_title={product.title}
                                product_price={product.price}
                                product_image={product.imageUrl}
                            />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
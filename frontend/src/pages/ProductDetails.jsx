import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { productsApi } from "../api/products";
import styles from "../styles/ProductDetails.module.css";
import { cartApi } from "../api/cart";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        productsApi
            .details(id)
            .then((res) => setProduct(res.data))
            .catch((e) => {
                setError(
                    e?.response?.status === 404
                        ? "Nie znaleziono produktu"
                        : (e?.message ?? "Błąd pobierania produktu")
                );
            });
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await cartApi.addItem({ productId: Number(id), quantity: 1 });
            alert("Dodano do koszyka ✅");
        } catch (e) {
            console.error(e);
            alert("Nie udało się dodać do koszyka");
        }
    };

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <NavBar />
                <main className={styles.contentWrapper}>
                    <p style={{ padding: 12 }}>{error}</p>
                </main>
            </div>
        );
    }

    if (!product) {
        return (
            <div className={styles.pageContainer}>
                <NavBar />
                <main className={styles.contentWrapper}>
                    <p style={{ padding: 12 }}>Ładowanie...</p>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.contentWrapper}>
                <div className={styles.productSection}>
                    <div className={styles.imageContainer}>
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.title} />
                        ) : (
                            <div className={styles.imagePlaceholder}>No Image</div>
                        )}
                    </div>

                    <div className={styles.infoContainer}>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productName}>{product.title}</h1>
                            <p className={styles.productPrice}>
                                {Number(product.price).toFixed(2)} zł
                            </p>

                            <Button placeholder="Dodaj do koszyka" onClick={handleAddToCart} />
                        </div>
                    </div>
                </div>

                <section className={styles.descriptionSection}>
                    <h2>Opis produktu</h2>

                    <ul className={styles.specificationList}>
                        {(product.specifications ?? []).map((spec, index) => (
                            <li key={index}>
                                <span className={styles.specLabel}>{spec.label}:</span>{" "}
                                {spec.value}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}
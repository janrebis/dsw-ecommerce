import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProductList from "../components/ProductList";
import Button from "../components/Button";
import { cartApi } from "../api/cart";
import styles from "../styles/Cart.module.css";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");
    const [busyProductId, setBusyProductId] = useState(null);

    const loadCart = async () => {
        try {
            const res = await cartApi.get();
            setCartItems(res.data.items ?? []);
            setError("");
        } catch (e) {
            console.error(e);
            setError("Błąd pobierania koszyka");
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.selectedQuantity, 0)
            .toFixed(2);
    };

    const increase = async (item) => {
        if (busyProductId) return;
        if (item.selectedQuantity >= item.stockQuantity) return;

        try {
            setBusyProductId(item.productId);
            await cartApi.updateItem(item.productId, { quantity: item.selectedQuantity + 1 });
            await loadCart();
        } finally {
            setBusyProductId(null);
        }
    };

    const decrease = async (item) => {
        if (busyProductId) return;
        if (item.selectedQuantity <= 1) return;

        try {
            setBusyProductId(item.productId);
            await cartApi.updateItem(item.productId, { quantity: item.selectedQuantity - 1 });
            await loadCart();
        } finally {
            setBusyProductId(null);
        }
    };

    const remove = async (item) => {
        if (busyProductId) return;

        try {
            setBusyProductId(item.productId);
            await cartApi.removeItem(item.productId);
            await loadCart();
        } finally {
            setBusyProductId(null);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar page_header="Koszyk" />

            <main className={styles.container}>
                <div className={styles.mainContent}>
                    <section className={styles.productsSection}>
                        <h2 className={styles.sectionTitle}>Twoje produkty</h2>

                        {error && <div style={{ padding: 12 }}>{error}</div>}

                        <div className={styles.productsList}>
                            {cartItems.map((item) => (
                                <ProductList
                                    key={item.productId}
                                    image={item.imageUrl}
                                    alt={item.title}
                                    product_name={item.title}
                                    product_price={item.price}
                                    product_quantity={item.stockQuantity}
                                    selectedQuantity={item.selectedQuantity}
                                    showDropdown={true}
                                    onIncrease={() => increase(item)}
                                    onDecrease={() => decrease(item)}
                                    onDelete={() => remove(item)}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.summary}>
                        <div className={styles.totalRow}>
                            <p className={styles.totalLabel}>Do zapłaty</p>
                            <p className={styles.totalPrice}>{calculateTotal()} zł</p>
                        </div>
                    </div>

                    <Link to="/delivery" className={styles.checkoutLink}>
                        <Button placeholder="Przejdź do dostawy" />
                    </Link>
                </aside>
            </main>
        </div>
    );
}
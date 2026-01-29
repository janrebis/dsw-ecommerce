import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import ProductHistory from "../components/ProductHistory";
import styles from "../styles/Summary.module.css";
import { cartApi } from "../api/cart";
import { ordersApi } from "../api/orders";

export default function Summary() {
    const [checkout] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("checkout") ?? "null");
        } catch {
            return null;
        }
    });

    const [items, setItems] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {
        cartApi.get()
            .then(res => setItems(res.data.items ?? []))
            .catch(() => setError("Błąd pobierania koszyka"));
    }, []);

    const calculateTotal = () =>
        items.reduce((t, i) => t + i.price * i.selectedQuantity, 0).toFixed(2);

    const handleCheckout = async () => {
        try {
            if (!checkout) {
                setError("Brak danych dostawy. Wróć do dostawy.");
                return;
            }

            const dto = {
                deliveryMethod: checkout.selectedDelivery,
                address: {
                    fullName: checkout.address.fullName,
                    address: checkout.address.address,
                    postalCode: checkout.address.postalCode,
                    city: checkout.address.city,
                    phone: checkout.address.phone,
                    email: checkout.address.email,
                },
            };

            const res = await ordersApi.create(dto);

            localStorage.removeItem("checkout");

            alert(`Zamówienie złożone ✅ ID: ${res.data.id}`);
        } catch (e) {
            console.error(e);
            setError(e?.response?.data?.message ?? "Nie udało się złożyć zamówienia");
        }
    };

    if (!checkout) {
        return (
            <div className={styles.pageContainer}>
                <NavBar page_header="Podsumowanie" />
                <main className={styles.container}>
                    <div style={{ padding: 12 }}>
                        Brak danych dostawy. Wróć do strony dostawy.
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <NavBar page_header="Podsumowanie" />

            <main className={styles.container}>
                <div className={styles.mainContent}>
                    {error && <div style={{ padding: 12 }}>{error}</div>}

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Adres dostawy</h2>

                        <ul className={styles.addressList}>
                            <li><span className={styles.addressLabel}>Imię i nazwisko:</span><span className={styles.addressValue}>{checkout.address.fullName}</span></li>
                            <li><span className={styles.addressLabel}>Adres:</span><span className={styles.addressValue}>{checkout.address.address}</span></li>
                            <li><span className={styles.addressLabel}>Miasto:</span><span className={styles.addressValue}>{checkout.address.postalCode}, {checkout.address.city}</span></li>
                            <li><span className={styles.addressLabel}>Telefon:</span><span className={styles.addressValue}>{checkout.address.phone}</span></li>
                            <li><span className={styles.addressLabel}>E-mail:</span><span className={styles.addressValue}>{checkout.address.email}</span></li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Produkty</h2>

                        <div className={styles.productsList}>
                            {items.map((item) => (
                                <ProductHistory
                                    key={item.productId}
                                    image={item.imageUrl}
                                    alt={item.title}
                                    product_name={item.title}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.totalSection}>
                        <div className={styles.totalRow}>
                            <p className={styles.totalLabel}>Do zapłaty</p>
                            <p className={styles.totalPrice}>{calculateTotal()} zł</p>
                        </div>
                    </div>

                    <Button placeholder="Kupuję i płacę" onClick={handleCheckout} />
                </aside>
            </main>
        </div>
    );
}
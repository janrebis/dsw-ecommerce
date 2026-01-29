import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import InputField from "../components/InputField";
import ProductHistory from "../components/ProductHistory";
import styles from "../styles/Delivery.module.css";
import { cartApi } from "../api/cart";

export default function Delivery() {
    const navigate = useNavigate();

    const [selectedDelivery, setSelectedDelivery] = useState("courier");
    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        postalCode: "",
        city: "",
        phone: "",
        email: "",
    });

    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("");

    const deliveryOptions = [
        { id: "courier", name: "Kurier", price: 0, eta: "jutro" },
        { id: "pickup", name: "Odbiór w salonie", price: 0, eta: "dzisiaj" },
    ];

    useEffect(() => {
        cartApi
            .get()
            .then((res) => setCartItems(res.data.items ?? []))
            .catch((e) => {
                console.error(e);
                setError("Nie udało się pobrać koszyka");
            });
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleGoSummary = () => {
        if (
            !formData.fullName ||
            !formData.address ||
            !formData.postalCode ||
            !formData.city ||
            !formData.phone ||
            !formData.email
        ) {
            setError("Uzupełnij wszystkie pola adresu dostawy.");
            return;
        }

        if (cartItems.length === 0) {
            setError("Koszyk jest pusty.");
            return;
        }

        localStorage.setItem(
            "checkout",
            JSON.stringify({
                selectedDelivery,
                address: formData,
            })
        );

        navigate("/summary");
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar page_header="Dostawa i płatność" />

            <main className={styles.container}>
                <div className={styles.mainContent}>
                    {error && <div style={{ padding: 12 }}>{error}</div>}

                    <section className={styles.deliverySection}>
                        <h2 className={styles.sectionTitle}>Sposób dostawy</h2>

                        <div className={styles.deliveryOptions}>
                            {deliveryOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className={`${styles.deliveryOption} ${selectedDelivery === option.id ? styles.selected : ""
                                        }`}
                                    onClick={() => setSelectedDelivery(option.id)}
                                >
                                    <div className={styles.optionHeader}>
                                        <h3>{option.name}</h3>
                                        <span className={styles.optionPrice}>{option.price} zł</span>
                                    </div>
                                    <p className={styles.optionEta}>
                                        Najwcześniej u ciebie: {option.eta}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.addressSection}>
                        <h2 className={styles.sectionTitle}>Adres dostawy</h2>

                        <form className={styles.addressForm} onSubmit={(e) => e.preventDefault()}>
                            <InputField
                                placeholder="Imię i nazwisko"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                required
                            />
                            <InputField
                                placeholder="Ulica i numer domu"
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                                required
                            />
                            <InputField
                                placeholder="Kod pocztowy"
                                type="text"
                                value={formData.postalCode}
                                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                                required
                            />
                            <InputField
                                placeholder="Miejscowość"
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleInputChange("city", e.target.value)}
                                required
                            />
                            <InputField
                                placeholder="Telefon"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                required
                            />
                            <InputField
                                placeholder="E-mail"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                required
                            />
                            <p className={styles.infoText}>
                                Na ten e-mail wyślemy informacje o zamówieniu
                            </p>
                        </form>
                    </section>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.productsSummary}>
                        <h3 className={styles.summaryTitle}>Twoje zamówienie</h3>

                        <div className={styles.productsList}>
                            {cartItems.map((item) => (
                                <ProductHistory
                                    key={item.productId}
                                    image={item.imageUrl}
                                    alt={item.title}
                                    product_name={item.title}
                                    price={item.price}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.checkoutLink}>
                        <Button placeholder="Przejdź do podsumowania" onClick={handleGoSummary} />
                    </div>
                </aside>
            </main>
        </div>
    );
}
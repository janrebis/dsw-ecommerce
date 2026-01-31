import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ProductHistory from "../components/ProductHistory";
import styles from "../styles/Admin_User_Dashboard.module.css";
import { ordersApi } from "../api/orders";

function safeParse(json) {
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export default function UserDashboard() {
    const checkout = useMemo(() => safeParse(localStorage.getItem("checkout") ?? "null"), []);
    const defaultEmail = checkout?.address?.email ?? "";

    const [userData, setUserData] = useState({
        username: "",
        email: defaultEmail,
        phone: "",
        password: "",
    });

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [error, setError] = useState("");

    const loadOrders = async (email) => {
        const e = (email ?? "").trim();
        if (!e) {
            setOrders([]);
            setError("Podaj e-mail, aby wczytać historię zamówień.");
            return;
        }

        try {
            setLoadingOrders(true);
            setError("");
            const res = await ordersApi.list({ email: e });
            setOrders(res.data ?? []);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message ?? "Nie udało się pobrać zamówień");
            setOrders([]);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        if (defaultEmail) loadOrders(defaultEmail);
    }, []);

    const handleInputChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert("Zapisano lokalnie ✅");
    };

    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return iso;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.dashboardWrapper}>
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Ustawienia konta</h1>

                        <form onSubmit={handleSave} className={styles.settingsForm}>
                            <InputField
                                placeholder="Login"
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                            />

                            <InputField
                                placeholder="E-mail"
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />

                            <InputField
                                placeholder="Telefon"
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => handleInputChange("phone", e.target.value)}
                            />

                            <InputField
                                placeholder="Hasło"
                                type="password"
                                value={userData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                            />

                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <Button placeholder="Zatwierdź zmiany" type="submit" />
                                <Button
                                    placeholder={loadingOrders ? "Ładowanie..." : "Pokaż zamówienia po e-mailu"}
                                    type="button"
                                    onClick={() => loadOrders(userData.email)}
                                    disabled={loadingOrders}
                                />
                            </div>
                        </form>

                        {error && <div style={{ padding: 12 }}>{error}</div>}
                    </section>

                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Historia zamówień</h1>

                        {loadingOrders && <div style={{ padding: 12 }}>Ładowanie zamówień...</div>}

                        {!loadingOrders && orders.length === 0 && !error && (
                            <div style={{ padding: 12 }}>Brak zamówień dla tego e-maila.</div>
                        )}

                        <div className={styles.ordersList}>
                            {orders.map((order) => (
                                <div key={order.id} style={{ marginBottom: 16 }}>
                                    <div style={{ padding: "0 4px 8px 4px", fontSize: 14, opacity: 0.8 }}>
                                        Zamówienie #{order.id} • {formatDate(order.createdAtUtc)} • {order.deliveryMethod} •{" "}
                                        {Number(order.total).toFixed(2)} zł
                                    </div>

                                    {(order.items ?? []).map((it, idx) => (
                                        <ProductHistory
                                            key={`${order.id}-${it.productId}-${idx}`}
                                            image={""} 
                                            alt={it.title}
                                            product_name={it.title}
                                            price={it.price}
                                            user_name={order.address?.fullName}
                                            address={order.address?.address}
                                            postal_code={order.address?.postalCode}
                                            city={order.address?.city}
                                            telephone={order.address?.phone}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
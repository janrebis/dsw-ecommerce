import { useState } from 'react';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import ProductHistory from '../components/ProductHistory';
import styles from '../styles/Admin_User_Dashboard.module.css';
import img from '../assets/ps5.jpg';

export default function UserDashboard() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });

    const mockOrderHistory = [
        {
            id: 1,
            image: img,
            alt: 'ps5',
            user_name: 'Andrzej',
            product_name: 'PlayStation 5 Pro',
            price: 1999.99,
            address: 'Warszawska 12',
            postal_code: '51-555',
            city: 'Wrocław',
            telephone: '123456789'
        },
        {
            id: 2,
            image: img,
            alt: 'ps5',
            user_name: 'Andrzej',
            product_name: 'PlayStation 5 Pro',
            price: 1999.99,
            address: 'Warszawska 12',
            postal_code: '51-555',
            city: 'Wrocław',
            telephone: '123456789'
        }
    ];

    const handleInputChange = (field, value) => {
        setUserData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating user data:', userData);
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.dashboardWrapper}>
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Ustawienia Konta</h1>

                        <form onSubmit={handleSubmit} className={styles.settingsForm}>
                            <InputField
                                placeholder="Login"
                                type="text"
                                value={userData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                            />
                            <InputField
                                placeholder="E-mail"
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                            <InputField
                                placeholder="Telefon"
                                type="tel"
                                value={userData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                            <InputField
                                placeholder="Hasło"
                                type="password"
                                value={userData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                            />
                            <Button placeholder="Zatwierdź zmiany" type="submit" />
                        </form>
                    </section>

                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Historia zamówień</h1>

                        <div className={styles.ordersList}>
                            {mockOrderHistory.map((order) => (
                                <ProductHistory
                                    key={order.id}
                                    image={order.image}
                                    alt={order.alt}
                                    user_name={order.user_name}
                                    product_name={order.product_name}
                                    price={order.price}
                                    address={order.address}
                                    postal_code={order.postal_code}
                                    city={order.city}
                                    telephone={order.telephone}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

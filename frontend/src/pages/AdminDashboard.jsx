import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import ProductHistory from '../components/ProductHistory';
import ProductList from '../components/ProductList';
import styles from '../styles/Admin_User_Dashboard.module.css';
import img from '../assets/ps5.jpg';

export default function AdminDashboard() {
    const navigate = useNavigate();

    const mockProducts = [
        {
            id: 1,
            image: img,
            alt: 'ps5',
            product_name: 'PlayStation 5 Pro',
            product_price: 1999.99,
            product_quantity: 50
        },
        {
            id: 2,
            image: img,
            alt: 'ps5',
            product_name: 'PlayStation 5 Pro',
            product_price: 1999.99,
            product_quantity: 50
        },
        {
            id: 3,
            image: img,
            alt: 'ps5',
            product_name: 'PlayStation 5 Pro',
            product_price: 1999.99,
            product_quantity: 50
        }
    ];

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

    const handleAddProduct = () => {
        console.log('Add new product');
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.dashboardWrapper}>
                    <section className={styles.section}>
                        <h1 className={styles.sectionTitle}>Lista produktów</h1>

                        <div className={styles.productsList}>
                            {mockProducts.map((product) => (
                                <ProductList
                                    key={product.id}
                                    image={product.image}
                                    alt={product.alt}
                                    product_name={product.product_name}
                                    product_price={product.product_price}
                                    product_quantity={product.product_quantity}
                                    showDropdown={false}
                                />
                            ))}
                        </div>

                        <Button
                            placeholder="Dodaj Produkt"
                            onClick={handleAddProduct}
                        />
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

import { useLocation } from 'react-router-dom';
import styles from '../styles/ProductHistory.module.css';

export default function ProductHistory({
    image,
    alt,
    product_name,
    user_name,
    price,
    address,
    postal_code,
    city,
    telephone
}) {
    const location = useLocation();
    const isAdminDashboard = location.pathname === '/admin_dashboard';

    const handleEdit = () => {
        console.log('Edit order');
    };

    return (
        <article className={styles.orderCard}>
            <div className={styles.productInfo}>
                <div className={styles.imageContainer}>
                    <img src={image} alt={alt} />
                </div>

                <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{product_name}</h3>
                    <p className={styles.productPrice}>{price} zł</p>
                </div>
            </div>

            {(user_name || address || postal_code || city || telephone) && (
                <div className={styles.deliveryInfo}>
                    <h4 className={styles.deliveryTitle}>Dane dostawy</h4>
                    <ul className={styles.deliveryList}>
                        {user_name && <li><strong>Imię:</strong> {user_name}</li>}
                        {address && <li><strong>Adres:</strong> {address}</li>}
                        {(postal_code || city) && (
                            <li>
                                <strong>Miasto:</strong> {postal_code}
                                {postal_code && city && ', '}
                                {city}
                            </li>
                        )}
                        {telephone && <li><strong>Telefon:</strong> {telephone}</li>}
                    </ul>
                </div>
            )}

            {isAdminDashboard && (
                <button className={styles.editButton} onClick={handleEdit}>
                    Edytuj
                </button>
            )}
        </article>
    );
}

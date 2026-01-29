import styles from '../styles/ProductCard.module.css';

export default function ProductCard({ product_title, product_price, product_image }) {
    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                {product_image ? (
                    <img src={product_image} alt={product_title} />
                ) : (
                    <div className={styles.placeholder}>No Image</div>
                )}
            </div>

            <div className={styles.details}>
                <h3 className={styles.title}>{product_title}</h3>
                <p className={styles.price}>{product_price} zł</p>
            </div>
        </article>
    );
}

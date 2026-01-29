import styles from "../styles/ProductList.module.css";

export default function ProductList({
    image,
    alt,
    product_name,
    product_price,
    product_quantity,
    selectedQuantity,
    showDropdown = true,
    onIncrease,
    onDecrease,
    onDelete,
}) {
    const qty = Number(selectedQuantity ?? 1);

    return (
        <article className={styles.productCard}>
            <div className={styles.imageContainer}>
                <img src={image} alt={alt} />
            </div>

            <div className={styles.productName}>
                <p>{product_name}</p>
            </div>

            <div className={styles.productPrice}>
                <p>{product_price} zł</p>
            </div>

            <div className={styles.quantitySection}>
                {showDropdown ? (
                    <div className={styles.quantityStepper}>
                        <button
                            type="button"
                            className={styles.qtyButton}
                            onClick={onDecrease}
                            disabled={qty <= 1}
                        >
                            −
                        </button>

                        <span className={styles.qtyValue}>{qty}</span>

                        <button
                            type="button"
                            className={styles.qtyButton}
                            onClick={onIncrease}
                            disabled={qty >= product_quantity}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <p className={styles.stockInfo}>{product_quantity} w magazynie</p>
                )}
            </div>

            <button className={styles.deleteButton} onClick={onDelete}>
                Usuń
            </button>
        </article>
    );
}
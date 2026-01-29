import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

export default function NavBar({ page_header }) {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <Link to="/" className={styles.logo}>
                        <h1>dsw-ecommerce</h1>
                    </Link>

                    <div className={styles.actions}>
                        <Link to="/login" className={styles.link}>
                            <button className={styles.profileButton} aria-label="Profile">
                                Profile
                            </button>
                        </Link>
                        <Link to="/cart" className={styles.link}>
                            <button className={styles.cartButton} aria-label="Shopping cart">
                                <span className={styles.cartIcon}></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {page_header && (
                <header className={styles.pageHeader}>
                    <div className={styles.container}>
                        <h1>{page_header}</h1>
                    </div>
                </header>
            )}
        </>
    );
}

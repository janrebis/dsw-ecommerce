import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import styles from '../styles/Login.module.css';

export default function PasswordReset() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Password reset request for:', email);
        setSubmitted(true);
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <h2 className={styles.formTitle}>Nie pamiętasz hasła?</h2>

                        <p className={styles.supportText}>
                            Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość
                        </p>

                        {submitted ? (
                            <div className={styles.successMessage}>
                                Jeśli konto istnieje, wiadomość została wysłana na podany adres e-mail.
                            </div>
                        ) : (
                            <>
                                <InputField
                                    placeholder="E-mail"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <Button
                                    placeholder="Odzyskaj hasło"
                                    type="submit"
                                />
                            </>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}

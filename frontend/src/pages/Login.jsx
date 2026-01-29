import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import styles from '../styles/Login.module.css';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        navigate('/user_dashboard');
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <h2 className={styles.formTitle}>Masz konto?</h2>

                        <InputField
                            placeholder="E-mail lub login"
                            type="text"
                            value={formData.emailOrUsername}
                            onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
                            required
                        />

                        <InputField
                            placeholder="Hasło"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                        />

                        <div className={styles.linksContainer}>
                            <Link to="/password_reset" className={styles.link}>
                                Nie pamiętam hasła
                            </Link>
                            <Link to="/register" className={styles.link}>
                                Nie masz konta?
                            </Link>
                        </div>

                        <Button
                            placeholder="Zaloguj się"
                            type="submit"
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}

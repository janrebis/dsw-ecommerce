import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import styles from '../styles/Login.module.css';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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
        console.log('Registration attempt:', formData);
        navigate('/login');
    };

    return (
        <div className={styles.pageContainer}>
            <NavBar />

            <main className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <h2 className={styles.formTitle}>Załóż konto</h2>

                        <InputField
                            placeholder="Login (wymagane)"
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            required
                            autoFocus
                        />

                        <InputField
                            placeholder="E-mail (wymagane)"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                        />

                        <InputField
                            placeholder="Hasło (wymagane)"
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                        />

                        <Link to="/login" className={styles.singleLink}>
                            Masz już konto?
                        </Link>

                        <Button
                            placeholder="Zarejestruj się"
                            type="submit"
                        />
                    </form>
                </div>
            </main>
        </div>
    );
}

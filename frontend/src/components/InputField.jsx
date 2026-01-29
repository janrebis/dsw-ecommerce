import styles from '../styles/InputField.module.css';

export default function InputField({ width, type = 'text', className = '', ...props }) {
    const style = width ? { width: `${width}px` } : {};

    return (
        <input
            className={`${styles.inputField} ${className}`}
            type={type}
            style={Object.keys(style).length > 0 ? style : undefined}
            {...props}
        />
    );
}

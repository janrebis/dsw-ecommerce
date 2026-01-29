import styles from '../styles/Button.module.css';

export default function Button({ width, height, placeholder, onClick, type = 'button', disabled = false, className = '' }) {
    const style = {};
    if (width) style.width = `${width}px`;
    if (height) style.height = `${height}px`;

    return (
        <button
            className={`${styles.button} ${className}`}
            style={Object.keys(style).length > 0 ? style : undefined}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {placeholder}
        </button>
    );
}

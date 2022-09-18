import styles from '../css_components/layout/Input.module.css'

const Input = ({ type, placeholder, name, id, min, htmlFor, textLabel, required, value, handleOnChange, autocomplete }) => {
    return (
        <div className={styles.divInput}>
            {htmlFor && (
                <label className={styles.label} htmlFor={htmlFor}>{textLabel}</label>
            )}
            <input className={styles.input}
                type={type}
                id={id} 
                name={name}
                placeholder={placeholder}
                min={min}
                required={required}
                defaultValue={value}
                onChange={handleOnChange}
                autoComplete={autocomplete}
            />
        </div>
    )
}

export default Input
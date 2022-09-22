import styles from '../css_components/layout/Input.module.css'

const Input = ({ type, className, placeholder, name, id, min, htmlFor, textLabel, required, value, handleOnChange, autocomplete, handleOnBlur }) => {
    return (
        <div className={styles.divInput}>
            {htmlFor && (
                <label className={styles.label} htmlFor={htmlFor}>{textLabel}</label>
            )}
            <input className={styles.input && className}
                type={type}
                id={id} 
                name={name}
                placeholder={placeholder}
                min={min}
                required={required}
                defaultValue={value}
                onChange={handleOnChange}
                autoComplete={autocomplete}
                onBlur={handleOnBlur}
            />
        </div>
    )
}

export default Input
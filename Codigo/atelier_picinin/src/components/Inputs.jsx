import styles from '../pages/css/css_components/Input.module.css'

const Input = ({ type, placeholder, name, id, min, htmlFor, textLabel, required, value }) => {
    return (
        <div className={styles.divInput}>
            {htmlFor && (
                <label className={styles.label} htmlFor={htmlFor}>{textLabel}</label>
            )}
            <input className={styles.input}
                type={type}
                id={id} 
                name={name}
                placeholder={placeholder && (placeholder)}
                min={ min && (min) }
                required={ required && (required) }
                defaultValue={value}
            />
        </div>
    )
}

export default Input
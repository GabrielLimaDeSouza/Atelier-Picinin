import styles from './css_components/Button.module.css'

const Button = ({ type, text, className, buttonClickEvent, buttonSubmitEvent}) => {
    return <button type={type}
                className={styles[className]}
                onClick={buttonClickEvent && (buttonClickEvent)}
                onSubmit={buttonSubmitEvent && (buttonSubmitEvent)}
            >
                {text}
            </button>
}

export default Button
import styles from './css_components/Button.module.css'

const Button = ({ type, text, className, onClickEvent, onSubmitEvent}) => {
    return <button type={type}
                className={styles[className]}
                onClick={onClickEvent && (onClickEvent)}
                onSubmit={onSubmitEvent && (onSubmitEvent)}
            >
                {text}
            </button>
}

export default Button
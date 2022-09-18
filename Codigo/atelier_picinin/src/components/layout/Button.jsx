import styles from '../css_components/layout/Button.module.css'

const Button = ({ type, children, className, buttonClickEvent, buttonSubmitEvent}) => {
    return <button type={type}
                className={styles[className]}
                onClick={buttonClickEvent && (buttonClickEvent)}
                onSubmit={buttonSubmitEvent && (buttonSubmitEvent)}>
                    
                {children}
            </button>
}

export default Button
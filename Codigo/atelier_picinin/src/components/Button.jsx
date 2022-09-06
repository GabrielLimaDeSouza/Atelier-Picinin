import styles from '../pages/css/css_components/Button.module.css'

const Button = ({ text, type, className, event, data_bs_target, data_bs_toggle, onSubmitEvent}) => {
    return <button type={type}
                className={styles[className]}
                onClick={event && (event)}
                onSubmit={onSubmitEvent && (onSubmitEvent)}
                data-bs-target={data_bs_target && (data_bs_target)}
                data-bs-toggle={data_bs_toggle && (data_bs_toggle)}>
                    {text}
            </button>
}

export default Button
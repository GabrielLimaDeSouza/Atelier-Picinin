import styles from '../pages/css/css_components/Button.module.css'

const Button = ({ text, type, className, event}) => {
    return <button type={type} className={styles[className]} onClick={event && (event)}>{text}</button>
}

export default Button
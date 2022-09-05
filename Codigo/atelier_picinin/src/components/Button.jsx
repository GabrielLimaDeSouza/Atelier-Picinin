const Button = ({ text, type, className, event}) => {
    return <button type={type} className={className} onClick={event}>{text}</button>
}

export default Button
import styles from '../css_components/layout/Button.module.css'

const Button = ({ type, id, children, className, buttonClickEvent, buttonSubmitEvent, disabled }) => {

    return <button type={ type }
                className={ styles[className] }
                onClick={ buttonClickEvent && (buttonClickEvent) }
                onSubmit={ buttonSubmitEvent && (buttonSubmitEvent) }
                disabled={ disabled }
                id={ id }
                title="button"  
            >
                    
                { children }
            </button>
}

export default Button
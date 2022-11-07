import '../css_components/layout/Button.module.css'

import { useNavigate } from 'react-router-dom'
import Button from './Button'

function LinkButton({ to, state, type, children, classNameButton, onClick }) {
    const navigate = useNavigate()

    const clickEvent = () => {
        onClick && onClick();
        navigate(to, { state: state })
    }

    return <Button type={ type }
        className={ classNameButton }
        buttonClickEvent={ clickEvent }>

        { children }
    </Button>
}

export default LinkButton
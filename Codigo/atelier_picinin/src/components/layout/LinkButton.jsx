import '../css_components/layout/Button.module.css'

import { useNavigate } from 'react-router-dom'
import Button from './Button'

function LinkButton({ to, state, type, text, classNameButton }) {
    const navigate = useNavigate()

    function clickEvent(){
        navigate(to, { state: state })
    }

    return <Button type={type}
        className={classNameButton}
        buttonClickEvent={clickEvent}>

        {text}
    </Button>
}

export default LinkButton
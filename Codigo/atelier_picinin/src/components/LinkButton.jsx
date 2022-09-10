import './css_components/Button.module.css'

import { Link } from 'react-router-dom'
import Button from './Button'

function LinkButton({ to, type, text, classNameButton, onSubmitEvent }) {
    return (
        <Link to={to}>
            <Button type={type}
                className={classNameButton}
                text={text}
                onSubmitEvent={onSubmitEvent}
            />
        </Link>
    )
}

export default LinkButton
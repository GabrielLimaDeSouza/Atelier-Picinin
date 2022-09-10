import './css_components/Button.module.css'

import { Link } from 'react-router-dom'
import Button from './Button'

function LinkButton({ to, type, text, classNameButton }) {
    return (
        <Link to={to}>
            <Button type={type}
                className={classNameButton}
                text={text}
            />
        </Link>
    )
}

export default LinkButton
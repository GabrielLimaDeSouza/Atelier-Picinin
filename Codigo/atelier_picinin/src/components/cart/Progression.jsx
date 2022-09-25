import styles from '../css_components/Progression.module.css'

import { BiCheck, BiChevronRight } from 'react-icons/bi'

const Progression = ({ elements, state }) => {

    function handleStateElements() {

    }

    return (
        <div className={ styles.divProgression }>
            { elements.map((element, index) => 
                <div className={ styles.divElements }>
                    { element[index] != 0 &&
                        state[index] ? <BiCheck className={ styles.checked } /> : <BiChevronRight />
                    }

                    <span className="element" key={ index }>{ element }</span>
                </div>
            )}
        </div>
    )
}

export default Progression
import '../css/Progression.css'

import { BiCheck, BiChevronRight } from 'react-icons/bi'
import { useEffect } from 'react'

const Progression = ({ elements, state }) => {

    useEffect(() => {
        const spans = document.querySelectorAll("span.element")

        spans.forEach((span, index) => {
            if(index < elements.indexOf(state)) {
                span.classList.add("checked")
            } else if(index == elements.indexOf(state)) {
                span.classList.add("inProgress")
            }
        })
    }, [elements])

    return (
        <div className="divProgression">
            { elements.map((element, index) => 
                <div className="divElements">
                    { index < elements.indexOf(state) ? 
                        <BiCheck className="checked" />
                    :
                        index != 0 && <BiChevronRight />
                    }

                    <span className="element" key={ index }>{ element }</span>
                </div>
            )}
        </div>
    )
}

export default Progression
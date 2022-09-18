import styles from '../css_components/layout/CollapseElement.module.css'

import Button from './Button'
import { Collapse } from 'react-collapse'
import { useState } from 'react'
import { BiChevronUp, BiChevronDown } from 'react-icons/bi'

const CollapseElement = ({ isOpened, text, buttonClickEvent, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    function handleOnClickEvent(){
        buttonClickEvent()
        setIsOpen(!isOpen)
    }

    return (
      <div className={styles.block}>
        <Button className="dropdown" buttonClickEvent={handleOnClickEvent}>
            {text}
            <em>
              { isOpen ? ( <BiChevronUp /> ) : ( <BiChevronDown /> )}
            </em>
        </Button>
        
        <Collapse layoutEffect isOpened={isOpened}>
          {children}
        </Collapse>
      </div>
    );
  }

  export default CollapseElement
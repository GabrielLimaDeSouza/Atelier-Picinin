import styles from './css_components/CollapseElement.module.css'

import Button from './Button'
import { Collapse } from 'react-collapse'

const CollapseElement = ({ isOpened, text, buttonClickEvent, children }) => {
    return (
      <div className={styles.block}>
        <Button className="dropdown" buttonClickEvent={buttonClickEvent} text={text} />
        <Collapse layoutEffect isOpened={isOpened}>
          {children}
        </Collapse>
      </div>
    );
  }

  export default CollapseElement
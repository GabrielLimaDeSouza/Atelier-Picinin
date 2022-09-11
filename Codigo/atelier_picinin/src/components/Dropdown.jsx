import styles from './css_components/Dropdown.module.css'

const Dropdown = ({ options, handleOnChange, textDefault }) => {
    return (
        <select className={styles.select} onChange={handleOnChange}>
            <option value=''>{textDefault}</option>
            { 
                options.map(option => 
                    <option key={option} value={option}>{option}</option>
                )
            }
        </select>
    )
}

export default Dropdown
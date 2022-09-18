import styles from '../css_components/SearchBar.module.css'

import Input from './Inputs'
import { BiSearch } from 'react-icons/bi'

const SearchBar = ({ handleOnChange, placeholder }) => {
    return <div className={styles.searchbar}>
            <BiSearch />
            <Input type="text"
                name="searchBarFilter"
                placeholder={placeholder}
                id="searchbar-input"
                handleOnChange={handleOnChange}
                autocomplete="off"/>
        </div>
}

export default SearchBar
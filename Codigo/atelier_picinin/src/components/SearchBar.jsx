import Input from './Inputs'

const SearchBar = ({ handleOnChange }) => {
    return (
        <Input type="text"
            name="searchBarFilter"
            placeholder="Pesquise um insumo"
            id="searchbar-input"
            handleOnChange={handleOnChange}
            textLabel="Pesquisar no estoque"
            htmlFor="searchbar-input"/>
    )
}

export default SearchBar
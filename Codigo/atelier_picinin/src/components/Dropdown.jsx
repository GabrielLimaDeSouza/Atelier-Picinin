const Dropdown = ({ options, handleOnChange, textDefault }) => {
    return (
        <select onChange={handleOnChange}>
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
const Dropdown = ({ options, handleOnChange, textDefault }) => {
    return (
        <select onChange={handleOnChange}>
            <option>{textDefault}</option>
            { 
                options.map(option => 
                    <option key={option} value={option}>{option}</option>
                )
            }
        </select>
    )
}

export default Dropdown
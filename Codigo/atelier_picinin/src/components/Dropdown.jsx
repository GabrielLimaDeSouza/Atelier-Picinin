import styles from './css_components/Dropdown.module.css'

import Button from './Button'
import Input from './Inputs'
import { useState, useEffect } from "react"

const Dropdown = ({ options, handleOnChange, textDefault, optionSelected, notSwitchValue, allowLabel }) => {
    const [selected, setSelected] = useState(optionSelected)
    const [newCategory, setNewCategory] = useState(false)

    useEffect(() => {
        setSelected(optionSelected)
    }, [optionSelected])

    function primeiraLetraMaiuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleInsertCategory() {
        setNewCategory(!newCategory)
    }

    function handleSelectOption(e) {
        handleOnChange(e)
        setSelected(e.target.value)
    }

    return (
        <div className={styles["body-dropdown"]}>
            { !newCategory ? 
                <div className={styles.divSelect}>
                    { allowLabel && <label className={styles.label} htmlFor='categoria'>Categoria</label>}
                    <select id="categoria" name="categoria" className={styles.select} onChange={handleSelectOption} value={selected}>
                        <option value=''>{textDefault}</option>
                        { 
                            options.map(option => 
                                <option key={option} value={option}>{primeiraLetraMaiuscula(option)}</option>
                            )
                        }
                    </select>
                </div>
                : 
                <Input type="text"
                    name="categoria"
                    id="categoria"
                    htmlFor="categoria"
                    textLabel="Adicionar categoria"
                    handleOnChange={handleSelectOption}
                    required
                    />
            }

            { !notSwitchValue &&
                <Button type="button" className="btnDropdown" buttonClickEvent={handleInsertCategory}>
                    { !newCategory ? "Adicionar categoria" : "Fechar"}
                </Button>
            }
        </div>
    )
}

export default Dropdown
import { useEffect } from 'react';
import '../css_components/inputBox.module.css'
// src/components/TagsInput.js
import { useState } from 'react'

function inputBox({handleSaboresProduto}){
const [sabor, setSabor] = useState("")
const [preco, setPreco] = useState("")
    const [tags, setTags] = useState([])
    
    useEffect(()=>{
        handleSaboresProduto(tags)
        console.log(tags)
    },[tags])

    function handleSabor(e){
        setSabor(e.target.value)
    }

    function handlePreco(e){
        setPreco(e.target.value)
    }
    function handleKeyDown(e){   
            setTags(tags =>[...tags, {sabor: sabor, preco: preco}])   
    }

    function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
        
        
    }

    return (
        <div className="tags-input-container">
            { tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag.sabor}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }
            <label htmlFor="">Nome do sabor:</label>
            <input  type="text" onChange={handleSabor} className="tags-input" id='sabor' name='sabor'/>
            <label htmlFor="">Preco do sabor:</label>
            <input  type="text" onChange={handlePreco} className="tags-input" id='preco' name= 'preco'/>

            <button type='button' onClick={handleKeyDown}>Confirmar</button>
        </div>
    )
}



export default inputBox
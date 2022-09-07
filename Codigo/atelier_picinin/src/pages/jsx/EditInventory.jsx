import Form from '../../components/FormCadastroInsumos'
import Button from '../../components/Button'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditInvetory = () => {
    const { id } = useParams()
    const [insumo, setInsumo] = useState({})
    const [insumoCarregado, setInsumoCarregado] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/api/viewInventoryById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setInsumo(data)
            setInsumoCarregado(true)
        })
        .catch(err => console.error(err))
    }, [])

    function editInventory (editedInput){
        editedInput.emEstoque = parseInt(editedInput.emEstoque)
        editedInput.quantidadeMin = parseInt(editedInput.quantidadeMin)

        if(editedInput.emEstoque < editedInput.quantidadeMin){
            console.log("Quantidade Inicial deve ser maior que a Quantidade Mínima")
            return false
        }

        fetch(`http://localhost:3000/api/updateInventory?id=${editedInput._id}`, {
            method: 'PATCH',
            body: JSON.stringify({name: "Teste"}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'aplication/json; charset=UTF-8'
            }
        }).then(resp => resp.json())
        .then(data => {
            setInsumo(data)
            console.log(JSON.stringify(editedInput))
        })
        .catch(err => console.error(err))
    }

    return (
        <>
        {insumoCarregado && (
            <>
                <Form id="form"
                    content={insumo}
                    handleSubmit={editInventory}
                    btnText="Cadastrar"
                    classNameButton="btnCadastrar"
                    onSubmitEvent={editInventory}
                    linkButton="estoque"
                />
                <Link to="/estoque">
                    <Button text="Voltar" type="button" className="btnBack"/>
                </Link>
            </>
        )}  
        </>
    )
}

export default EditInvetory
import '../css/inventory/CadastroInsumo.css'

import Form from '../../components/inventory/FormCadastroInsumos'
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
const url = "http://localhost:3000"

const CadastrarInsumo = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState(location.state.categories)

  useEffect(() => {
    setCategories(location.state.categories)
  }, [])

  function createSupplies(input) {
    if(input.validade)
      input.validade = new Date(input.validade).toISOString()

    fetch(`${url}/api/inputRegister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(resp => resp.json())
    .then(navigate('/estoque', { state: { message: "Insumo cadastrado com sucesso", type: "success" } }))
    .catch(err => console.error(err))
  }

  return (
    <div className="body-input-register">
        <h1 className="register-title">Cadastrar Insumo</h1>
        <Form id="form"
          handleSubmit={createSupplies}
          btnText="Cadastrar"
          classNameButton="btnCadastrar"
          selectOptions={categories}
          selectTextDefault="Selecione uma categoria"
          btnVoltar="/adm/estoque"
        />
    </div>
  )
}

export default CadastrarInsumo
import '../css/CadastroInsumo.css'

import Form from '../../components/FormCadastroInsumos'
import Cabecalho from '../../components/CabecalhoAdmin'
import LinkButton from '../../components/LinkButton'
import { useNavigate } from "react-router-dom"

const CadastrarInsumo = () => {
    const navigate = useNavigate()

  function createSupplies(input) {
    if(input.validade)
      input.validade = new Date(input.validade).toISOString()

    fetch('http://localhost:3000/api/inputRegister', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })
    .then(resp => resp.json())
    .then(navigate('/estoque'))
    .catch(err => console.error(err))
  }

  return (
    <>
      <Cabecalho />
      <div className="body-input-register">
        <h1 className="title">Cadastrar Insumo</h1>
        <Form id="form"
            handleSubmit={createSupplies}
            btnText="Cadastrar"
            classNameButton="btnCadastrar"
        />
        <LinkButton to="/estoque" text="Voltar" classNameButton="btnBack"/>
      </div>
    </>
  )
}

export default CadastrarInsumo
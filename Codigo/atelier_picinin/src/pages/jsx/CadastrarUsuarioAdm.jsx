import '../css/cadastrarUsuario/cadastrarUsuario.css'

import CompCadastroUser from '../../components/User/FormCadastroUsuario'
import Message from "../../components/layout/Message"

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cadastarUsuarioAdm = ({ id }) => {
    const [usuarios, setUsuarios] = useState([])
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const navigate = useNavigate()

    var tamanho
    const url = 'http://localhost:3000'
    useEffect(() => {
        fetch(`${url}/api/user/getAllUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
            .then(data => setUsuarios(data), tamanho = usuarios.length)
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (id) {
            navigate('/')
        }
    }, [])

    function cadastrar() {
        let achado = false
        for (let i = 0; i < tamanho; i++) {
            console.log(usuarios[i].email + "   :" + document.getElementById("email").value)
            if (usuarios[i].email == document.getElementById("email").value) {

                achado = true

            }
        }
        if (achado == false) {
            console.log("n existe")


            fetch(`${url}/api/user/registerUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    "nome": document.getElementById("nome").value,
                    "email": document.getElementById("email").value,
                    "senha": document.getElementById("senha").value,
                    "admin": "true"

                },
                    setTypeMessage("success"),
                    setMessage("Usuário cadastrado com sucesso!")),

            }).catch(err => console.error(err))


        } else {
            setTypeMessage("error")
            let string = "Esse usuário já é cadastrado no sistema"

            setMessage(string);
        }

    }
    return (!id &&
        <>
            {message && <Message type={typeMessage} message={message} />}
            <CompCadastroUser event={cadastrar} />
        </>
    )
}

export default cadastarUsuarioAdm
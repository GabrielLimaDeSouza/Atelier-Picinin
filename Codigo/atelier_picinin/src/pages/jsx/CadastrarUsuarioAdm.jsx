import '../css/cadastrarUsuario/cadastrarUsuario.module.css'
import { useEffect, useState } from 'react'
import CompCadastroUser from '../../components/User/FormCadastroUsuario'
import Message from "../../components/layout/Message"

const cadastarUsuarioAdm = () => {
    const [usuarios, setUsuarios] = useState([])
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    var tamanho
const url = 'http://localhost:3000'
    useEffect(() => {
        fetch(`${url}/api/user/getAllUsers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
            .then(data => setUsuarios(data), tamanho =usuarios.length)
            .catch(err => console.error(err))
    },[{}])

function cadastrar(){ 
    let achado = false
    for(let i=0; i<tamanho; i++){
        console.log(usuarios[i].email+ "   :" + document.getElementById("email").value)
        if(usuarios[i].email == document.getElementById("email").value){
            
            achado = true
            
        }
    }
    if(achado == false){
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
            
        
    }else{ 
        setTypeMessage("error")
        let string = "Esse usuário já é cadastrado no sistema"
        
        setMessage(string);
    }
    
}
    return (
        <>
        <div className='teste'>
            {message && <Message type={typeMessage} message={message} />}
            <CompCadastroUser event={cadastrar}/>
        </div>
        
           
        </>
    )
}

export default cadastarUsuarioAdm
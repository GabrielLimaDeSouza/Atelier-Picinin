import '../css/login/Login.css'

import LinkButton from '../../components/layout/LinkButton'
import Button from '../../components/layout/Button'
import Message from '../../components/layout/Message'

import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const url = "http://localhost:3000"

const Login = ({ isLogged }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [typeMessage, setTypeMessage] = useState("")
    const [notLogged, setNotLogged] = useState(false)
    const navigate = useNavigate()

    function getCookie(name) {
        let cookie = {}

        document.cookie.split(';').forEach((el) => {
            let [k, v] = el.split('=')
            cookie[k.trim()] = v
        })

        return cookie[name]
    }

    useEffect(() => {
        const id = getCookie("_id")
        if (id) {
            navigate('/')
        } else {
            setNotLogged(true)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await fetch(`${url}/api/user/getUserLogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        }).then(resp => resp.json())
            .then(data => authentication(data))
            .catch(err => console.log(err))
    }

    function authentication(user) {
        if (user.accept) {
            isLogged({ _id: user._id, isLogged: true })
            createCookie(user._id, 1000)
            navigate(-1, { replace: true })
        } else {
            setMessage("Email ou senha incorretos")
            setTypeMessage("error")
        }
    }

    function createCookie(idUser, days) {
        var date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        const expires = date.toUTCString()

        document.cookie = `_id=${idUser}; expires=${expires}`
    }

    return (notLogged &&
        <div className="body-login">
            <div className="img-lollipop mobile-hidden"></div>

            <div className="login">
                <div className="container-login">
                    <div className="title">
                        <h5>Logo</h5>
                        <div className="text-title">
                            <p>Bem vindo ao</p>
                            <h2 className="title-login">Atelier Picinin</h2>
                        </div>
                    </div>
                    <div className="form">
                        { message && <Message type={typeMessage} message={message} /> }
                        <form className="form-login" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="email"
                                className="input-email"
                                name="email"
                                placeholder="Insira seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                className="input-senha"
                                name="password"
                                placeholder="Insira sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <div className="recovery-password">
                                <Link id="recuperar-senha" to="/login">Recuperar senha</Link>
                            </div>
                            <Button type="submit" className="btnLogin">Entrar</Button>
                        </form>
                    </div>
                    <div className="cadastro">
                        <p className="text-cadastro">
                            <span>Não possui cadastro? </span>
                            <LinkButton to="/cadastrar" type="button" classNameButton="btnLink">Cadastrar</LinkButton>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
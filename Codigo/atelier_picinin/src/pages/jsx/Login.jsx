import '../css/login/Login.css'

import LinkButton from '../../components/layout/LinkButton'
import Button from '../../components/layout/Button'

import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import lollipop from '../img/lollipop-removebg.png'

const Login = () => {
    return (
        <div className="body-login">
            <div className="img-lollipop mobile-hidden">
                <img src={ lollipop } alt="Pirulito Atelier Picinin" className="img-login"/>
                <div className="bg-img"></div>
            </div>

            <div className="login">
                <div className="title">
                    <h5>Logo</h5>
                    <div className="text-title">
                        <p>Bem vindo ao</p>
                        <h2 className="title-login">Atelier Picinin</h2>
                    </div>
                </div>
                <div className="form">
                    <form className="form-login" onSubmit="">
                        <input type="text" id="email" className="input-email" name="email" placeholder="Insira seu email" required/>
                        <input type="password" id="password" className="input-senha" name="password" placeholder="Insira sua senha" required/>
                        
                        <div className="configs">
                            <div className="checkbox">
                                <input type="checkbox" id="keep-connected" className="input-keep-connected" name="keep-conected" />
                                <label htmlFor="keep-connected">Manter Conectado</label>
                            </div>
                            <Link to="/login">Recuperar senha</Link>
                        </div>
                        <Button type="submit" className="btnLogin">Entrar</Button>
                    </form>
                </div>
                <div className="login-social-media">
                    <div className="separador">
                        <div className="line"></div>
                        <span className="text-separador">ou entre com</span>
                        <div className="line"></div>
                    </div>
                    <div className="btns">
                        <button type="button" className="btn-google"><FcGoogle /></button>
                        <button type="button" className="btn-facebook"><FaFacebook /></button>
                    </div>
                </div>
                <div className="cadastro">
                    <p className="text-cadastro">
                        <span>Não possui cadastro? </span>
                        <LinkButton to="/" type="button" classNameButton="btnLink">Cadastrar</LinkButton>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
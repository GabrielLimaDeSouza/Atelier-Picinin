import '../../pages/css/cadastrarUsuario/cadastrarUsuario.css'

const compCadastroUser =({event})=>{
    return( 
    <><div className="divForm">
                <div className='divInput'>
                    <div className="campos">
                        <label htmlFor="nome">Nome do Usuário </label>
                        <input type="text" name="nome" id="nome" />
                    </div>

                    <div className="campos">
                        <label htmlFor="email">E-mail do Usuário: </label>
                        <input type="text" name="email" id="email" />
                    </div>

                    <div className="campos">
                        <label htmlFor="nome">Senha: </label>
                        <input type="text" name="senha" id="senha" />
                    </div>

                </div>
                <div>
                <button className="voltar">Cancelar</button>
                <button className="cadastrar" onClick={event}>Cofirmar</button>
                
                </div>
                
            </div>
    </>
    )
}

export default compCadastroUser;
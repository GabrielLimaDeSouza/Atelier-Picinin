import '../../pages/css/cadastrarUsuario/cadastrarUsuario.css'

const compCadastroUser = ({ event }) => {
    return (
        <>
            <div className="formCadastro">
                <div className="campos">
                    <label htmlFor="nome">Nome de Usuário:</label>
                    <input type="text" name="nome" id="nome" />

                    <label htmlFor="email">E-mail do Usuário:</label>
                    <input type="text" name="email" id="email" />

                    <label htmlFor="nome">Senha:</label>
                    <input type="password" name="senha" id="senhaCadastro" />
                </div>

                <div className="buttonsCadastro">
                    <button className="voltar">Cancelar</button>
                    <button className="cadastrar" onClick={event}>Confirmar</button>
                </div>
            </div>
        </>
    )
}

export default compCadastroUser;
import '../../pages/css/cadastrarUsuario/cadastrarUsuario.css'

const compCadastroUser = ({ event }) => {
    return (
        <>
            <div className="divForm">
                <div className="formCadastro">
                    <div className="campos">
                        <label htmlFor="nome">Nome de Usuário:</label>
                        <input type="text" name="nome" id="nome" />

                        <label htmlFor="email">E-mail do Usuário:</label>
                        <input type="text" name="email" id="email" />

                        <label htmlFor="nome">Senha:</label>
                        <input type="text" name="senha" id="senha" />
                    </div>

                    <div className="buttons">
                        <button className="voltar">Cancelar</button>
                        <button className="cadastrar" onClick={event}>Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default compCadastroUser;
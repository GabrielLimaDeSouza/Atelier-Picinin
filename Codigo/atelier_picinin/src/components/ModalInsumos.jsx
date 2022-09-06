import Form from './FormCadastroInsumos'

const Modal = ({ id }) => {
    return (
        <>
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrando Novo Insumo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form id="form" action="" method="" btnText="Cadastrar" classNameButton="cadastrar"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
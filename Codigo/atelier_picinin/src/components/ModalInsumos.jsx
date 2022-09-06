import Form from './FormCadastroInsumos'

const Modal = ({ id, title, action, insumo, onSubmitEvent }) => {
    return (
        <>
            <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form id="form" action={action} method="post" btnText="Cadastrar" classNameButton="cadastrar" insumo={insumo && (insumo) } onSubmitEvent={onSubmitEvent && (onSubmitEvent)}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
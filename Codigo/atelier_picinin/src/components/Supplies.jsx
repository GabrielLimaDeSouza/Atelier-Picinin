import styles from './css_components/Supplies.module.css'

function Supplies({ content }) {
    return (
        <div className={styles.supplies}>
            <p>Nome: {content.name}</p>
            <p>Quantidade em estoque: {content.emEstoque}</p>
            <p>Quantidade Mínima: {content.quantidadeMin}</p>
            <p>Validade: {
                content.validade ? ( new Date(content.validade).toLocaleDateString("pt-BR") ) : 
                ( <em className={styles.validade}>Sem validade</em> )
            }</p>
        </div>
    )
}

export default Supplies
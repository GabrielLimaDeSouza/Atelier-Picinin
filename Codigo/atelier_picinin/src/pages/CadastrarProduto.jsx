import './CadastrarProduto.css'
import { IoIosAddCircle } from "react-icons/io";
import Rodape from '../components/Rodape';
function CadastrarProduto() {

    return (
        <div>
            <div className='body'>
                <div className="CadastrarProdutoTitulo">
                    <div className='titulo'>
                        <h1>
                            Cadastro de produto
                        </h1>
                    </div>
                </div>

                <div className="CadastrarProutoFormulario">

                    <div className='nomeDoProduto'>
                        <label htmlFor="">Nome do produto:</label>
                        <input type="text" />
                    </div>

                    <div className='descricaoDoProduto '>
                        <label htmlFor="" className=''>Descrição do produto:</label>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>

                    <div className='sabores'>
                        <label htmlFor="">Sabores:</label>
                        <input type="text" />


                    </div>

                    <div >
                        <div className='CadastrarProutoFormularioValor'>
                            <div className='preco'>
                                <label htmlFor="">Preço:</label>
                                <input className='valor' type="number" name="" id="" />
                            </div>

                            <div className='preco'>
                                <label htmlFor="">Quantiadade</label>
                                <input className='valor' type="number" name="" id="" />
                                <IoIosAddCircle className='CadastrarProutoFormularioMore' />
                            </div>


                        </div>
                    </div>

                    <div >
                        <div className=''>
                            <div className='imgProduto'>
                                <label htmlFor="">Foto de capa:</label>
                                <input className='valor' type="file" name="" id="" />
                            </div>
                            <div className='imgProduto'>
                                <label htmlFor="">Foto secundária:</label>
                                <input className='valor' type="file" name="" id="" />
                            </div>
                            <div className='imgProduto'>
                                <label htmlFor="">Foto terciária:</label>
                                <input className='valor' type="file" name="" id="" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='botoes'>
                    <button className='botao'>Voltar</button>
                    <button className='botao'>Confirmar</button>
                </div>
              
            </div>
  <Rodape />
        </div>



    )
}

export default CadastrarProduto
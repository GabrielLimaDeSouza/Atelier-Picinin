import Sequelize, { STRING } from 'sequelize'
const sequelize = new Sequelize('atelier', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql'
})

const Produtos = sequelize.define('produtos', {
    NomeProduto: {
        type: STRING,
        primaryKey: true,
        allowNull: false,
      },
      DescricaoProduto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
})

//Produtos.sync({force:true})

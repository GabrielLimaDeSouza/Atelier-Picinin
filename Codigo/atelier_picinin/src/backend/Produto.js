import Sequelize, { STRING } from 'sequelize'
const sequelize = new Sequelize('atelier', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql'
})

const Produto = sequelize.define('produto', {
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

Produto.sync({force:true})

const {Sequelize} = require ('sequelize')
const sequelize = new Sequelize('atelier', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql'
})

const Produto = sequelize.define('produto', {
    NomeProduto: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      DescricaoProduto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
})

module.exports = Produto
//Produto.sync({force:true})

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

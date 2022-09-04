

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

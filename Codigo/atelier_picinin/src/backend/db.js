const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('atelier', 'root', '12345', { host: "localhost", dialect: 'mysql' });

try {
    sequelize.authenticate();
    console.log('Conexão estabelecida!');
} catch (error) {
    console.error('Falha ao conectar com o banco de dados:', error);
}



module.exports= {
    Sequelize: Sequelize,
    sequelize: sequelize
}
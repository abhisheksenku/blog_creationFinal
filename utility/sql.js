const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('testingdb','root','Abhi@211724',{
    host:'localhost',
    dialect:'mysql'
});
(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been created with SQL');
    } catch (error) {
        console.error('Unable to create connection');
    }
})();
module.exports = sequelize;

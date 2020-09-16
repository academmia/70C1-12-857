const Sequelize = require('sequelize');

let conn;
console.log('run db index');
// Initialize the connection 
(async function(){
    conn = new Sequelize('db', null, null, {
        dialect: 'sqlite',
        storage: 'db.sqlite'
    });

    try {
        await conn.authenticate(); 
        console.log('DB Connected...'); 

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}());

module.exports = {
    conn,
    Sequelize,
	models: {
		projects: require('../models/projects')(conn, Sequelize),
		tasks: require('../models/tasks')(conn, Sequelize)
	}
};


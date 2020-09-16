const Sequelize = require('sequelize');
// 5a - raw query
const { QueryTypes } = require('sequelize');

// 3
const db = require('./db.json');

let conn;




// Initialize the connection 
(async function(){
    conn = new Sequelize('db', null, null, {
        dialect: 'sqlite',
        storage: 'db.sqlite'
    });

    //2
    // MODELS/TABLES
    const Projects = conn.define('Projects', { 
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        code: Sequelize.STRING,
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        owner_id: Sequelize.INTEGER,
        owner_name: Sequelize.STRING,
        category_id: Sequelize.INTEGER,
        created_date: Sequelize.DATE,
        end_date: Sequelize.DATE

    });

    // 6
    const Tasks = conn.define('Tasks', { 
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        subject: Sequelize.STRING,
        description: Sequelize.STRING,
        status: Sequelize.STRING,
        owner_id: Sequelize.NUMBER,
        owner_name: Sequelize.STRING,
        project_id: Sequelize.NUMBER,
        project_code: Sequelize.STRING,
        asignee_id: Sequelize.NUMBER,
        asignee_name: Sequelize.STRING,
        created_date: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE
    });


    try {

        await conn.authenticate();      //1
        console.log('Connection has been established successfully.');  //1
        await conn.sync({ force: true });  //2
        console.log('Created the tables successfully.'); //2

        // 3 - add data
        console.log('Add test data...');
        await db.projects.forEach(project => {
            project.created_date = Date.now();
            Projects.create(project);
        });
        
        // 6 - add data
        console.log('Add test data...');
        await db.tasks.forEach(task => {
            task.created_date = Date.now();
            Tasks.create(task);
        });

        // 4 - query db - projects
        console.log('Query DB for all projects...');
        let projects = await Projects.findAll({
            attributes: ['code', 'name', 'description']
        });
        // re-write list without metadata fields
        projects = projects.map(p => ({ code: p.code, name: p.name, description: p.description }) );

        console.log('Projects Results: ', projects);
        
        // 5b - raw query
        let projectsRaw = await conn.query("SELECT id, code, description as Desc FROM `projects` WHERE id IN (2,8)", { type: QueryTypes.SELECT });
        console.log('Projects RAW Query: ', projectsRaw);

        // 6 - query db - tasks
        console.log('Query DB for all tasks...');
        let tasks = await Tasks.findAll({
            attributes: ['subject', 'status', 'description', 'created_date','end_date'],
            order:  [ ['subject','DESC'] ],
            limit: 3
        });
        tasks = tasks.map( task => task.dataValues )
        console.log('Tasks: ', tasks);

        // 7
        // get model reference from conn
        // findOne() returns a promise
        // dataValues - elimina metadata 
        console.log((await conn.models.Projects.findOne()).dataValues)

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}());



// module.exports = {
// 	connection: conn,
// 	models: {
// 		projectsTable: Projects
// 	}
// };


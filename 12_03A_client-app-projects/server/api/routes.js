const routes = require('express').Router();
const data = require('../db/db.json');
const db = require('../db');
const { check, validationResult } = require('express-validator/check');

// db queries
const findByProjectId = (id, cb) => {
	if (!data.projects[id]) {
		return cb(new Error('No Matching Id' + id));
	}

	return cb(null, data.projects[id]);
};

// Get a list of all projects
routes.get('/projects', (req, res) => {
	// res.status(200).json(data.projects);
	db.models.projects.findAll({})
		.then( items => {
			res.status(200).json(items)
		});
});

// find a project by id
routes.get('/projects/:id', (req, res, next) => {
	const id = req.params.id;

	db.models.projects
		.findOne({
			where: {
				id
			}
		})
		.then(project => {
			res.status(200).json(project);
		});
});

// add a new project
routes.post(
	'/projects',
	[
		// check('id')
		// 	.trim()
		// 	.matches(/\d/)
	],
	(req, res, next) => {
		const id = req.body.id;

		db.models.projects.create(req.body).then(newProject => {
			// const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.json({ error: errors.mapped() });
			} else {
				return res.status(201).json(newProject);
			}
		});
	}
);


// delete a project - DELETE /projects/:id
routes.delete('/projects/:id', (req, res) => {
	const id = req.params.id;

	db.models.projects
		.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(count => {
			console.log('Deleted response: ', count);
			if (count === 0) res.status(202).json({ 		// 202 -accepted
				error: false,
				message: 'No project to delete'
			 })
			res.status(200).json({
				error: false,
				message: 'Project has been deleted'
			})
		})
		.catch(error =>
			res.json({
				error: true,
				error: `${error}`
			})
		);
});

// update a project - PUT /projects/:id
routes.put('/projects/:id', (req, res) => {
	const id = req.params.id;

	db.models.projects
		.findOne({
			where: {
				id
			}
		})
		.then(project => {
			project
				.update({
					name: req.body.name,
					description: req.body.description
				})
				.then(updatedProject => {
					return res.status(200).json(updatedProject);
				});
		});
});


// Get a list of all tasks

routes.get('/tasks', (req, res) => {
	res.status(200).json(data.tasks);
});

module.exports = routes;

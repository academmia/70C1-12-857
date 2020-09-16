const routes = require('express').Router();
const data = require('../db/db.json');
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
	res.status(200).json(data.projects);
});

// find a project by id
routes.get('/projects/:id', (req, res, next) => {
	const id = req.params.id;

	findByProjectId(id, (error, project) => {
		if (error) {
			return next(error);
		}
		return res.status(200).json(project);
	});
});

// add a new project
routes.post(
	'/projects/add/project',
	[
		check('id')
			.trim()
			.matches(/\d/)
	],
	(req, res, next) => {
		const id = req.body.id;
		console.log(req.body);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ error: errors.mapped() });
		} else {
			return res.json(req.body);
		}
	}
);

// Get a list of all tasks

routes.get('/tasks', (req, res) => {
	res.status(200).json(data.tasks);
});

module.exports = routes;

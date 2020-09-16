module.exports = (conn, DataTypes) => {
	var Projects = conn.define(
		'Projects',
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			code: DataTypes.STRING,
			name: DataTypes.STRING,
			description: DataTypes.STRING,
			owner_id: DataTypes.INTEGER,
			owner_name: DataTypes.STRING,
			category_id: DataTypes.INTEGER,
			created_date: {
				type: DataTypes.DATE
			},
			end_date: {
				type: DataTypes.DATE
			}
        }, 
        {}
	);
	Projects.associate = function(models) {
		// associations can be defined here
	};
	return Projects;
};

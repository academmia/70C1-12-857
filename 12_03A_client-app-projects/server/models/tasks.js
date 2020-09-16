module.exports = (conn, DataTypes) => {
    var Tasks = conn.define('Tasks', {
      subject: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
      owner_name: DataTypes.STRING,
      project_id: DataTypes.INTEGER,
      project_code: DataTypes.STRING,
      asignee_id: DataTypes.INTEGER,
      asignee_name: DataTypes.STRING,
      created_date: DataTypes.DATE,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE
    }, {});
    Tasks.associate = function(models) {
      // associations can be defined here
    };
    return Tasks;
  };
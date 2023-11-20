const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_Juipter_Test1', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    seq: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_Juipter_Test1',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_Juipt__3213E83FB55A5DCB",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

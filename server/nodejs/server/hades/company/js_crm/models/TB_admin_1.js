const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_admin_1', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_jpt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    important: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '약칭': {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    jandi_id_map: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    depart: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    configuration: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    userSeq: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_admin_1',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__TB_admin__DDDFBCBED13B6CBC",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

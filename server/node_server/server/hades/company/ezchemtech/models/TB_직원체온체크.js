const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_직원체온체크', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    '일자': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '황인국': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '황갑성': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '최성철': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김연희': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '윤현경': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '유민영': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '이원미': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '심규정': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '최아련': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김하정': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '권태린': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '이현아': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김모아': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김지연': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '최윤석': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김신영': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '정지혜': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '김현선': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '최종규': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '이상현': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '유다현': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '이현정': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '이정민': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'TB_직원체온체크',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_직원체온체크",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

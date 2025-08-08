const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_구미_기아자동차_검수합격통보서_월', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    document_code: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '공장구분': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '품번수정': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '입고source': {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '입고구분': {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    '입고누계수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '입고누계금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '포장비누계': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      defaultValue: 0
    },
    '통화구분': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '계정코드': {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: "(NU551"
    }
  }, {
    sequelize,
    tableName: 'TB_구미_기아자동차_검수합격통보서_월',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_구미_기아__DDDFBCBE9AEDAD4F",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

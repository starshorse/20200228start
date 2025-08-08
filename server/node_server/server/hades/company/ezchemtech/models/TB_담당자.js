const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_담당자', {
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
    '거래처': {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    '성명': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    '직책': {
      type: DataTypes.STRING(14),
      allowNull: true
    },
    '부서': {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    '휴대전화': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    '전화': {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    FAX: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    email2: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    '가족관계': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '자택주소': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '배송주소': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '우편번호': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '예비3': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비4': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비5': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비6': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비7': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비8': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비9': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '예비10': {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    '수신거부': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('[dbo].[getdate]()')
    }
  }, {
    sequelize,
    tableName: 'TB_담당자',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_담당자",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_담당자",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_정기업무기본정보', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    '회사명': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '팀명': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '알림구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '담당자1': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '담당자2': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '담당자3': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '업무명': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '세부내용': {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    '업무등록일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '업무폐지일': {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    '업무주기_개월수': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '시작월': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '완료_구분': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '완료_특정일': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '알림_구분': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '몇일이전_알림일': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    '영업일_반영': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '보류여부': {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(500),
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
    tableName: 'TB_정기업무기본정보',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_TB_정기업무기본정보",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

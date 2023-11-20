const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_트랜시스1203_DCT강건화_검수실적', {
    seq: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    RegDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    UpdateDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '협력업체코드': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '협력업체': {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    '품번': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '구_품번': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '품번수정': {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    '품명': {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    '순번': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    '납입카드': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '수량': {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    '단위': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '단가': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '전기일': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '이동유형': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '입고금액': {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TB_트랜시스1203_DCT강건화_검수실적',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__TB_트랜시스1__DDDFBCBE406C123E",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

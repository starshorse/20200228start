const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TB_외화계좌거래내역_chem', {
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    },
    '회사구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '계좌명칭': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '계좌번호': {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    '거래일시': {
      type: DataTypes.DATE,
      allowNull: false
    },
    '거래일자': {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    '통화': {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    '거래구분': {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    '입금액': {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    '출금액': {
      type: DataTypes.DECIMAL(15,2),
      allowNull: true
    },
    '잔액': {
      type: DataTypes.DECIMAL(15,2),
      allowNull: false
    },
    '적요': {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    '수출계좌번호': {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '해외수입업자': {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    '환율': {
      type: DataTypes.DECIMAL(9,4),
      allowNull: true
    },
    '사용여부': {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    '원화환산금액': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Maker: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    '비고': {
      type: DataTypes.STRING(100),
      allowNull: true
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
    tableName: 'TB_외화계좌거래내역_chem',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_TB_외화계좌거래내역_chem",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "PK_TB_외화계좌거래내역_chem",
        unique: true,
        fields: [
          { name: "seq" },
        ]
      },
    ]
  });
};

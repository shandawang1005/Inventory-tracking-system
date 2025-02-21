'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventory.belongsTo(models.User, { foreignKey: "userId" })
      Inventory.hasMany(models.Order, { foreignKey: "inventoryId" })
    }
  }
  Inventory.init({
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'Inventory'
  });
  return Inventory;
};
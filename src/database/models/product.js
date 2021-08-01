'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // belongsTo
      Product.belongsTo(models.Brand);
      // belongsTo
      Product.belongsTo(models.User);

      // belongsToMany
      Product.belongsToMany(models.Color, {
        as: 'colors',
        through: 'colorProducts',
      });
      // belongsToMany
      Product.belongsToMany(models.Category, {
        as: 'categories',
        through: 'CategoryProducts',

      });
      // belongsToMany
      Product.belongsToMany(models.Size,{
        as: 'sizes',
        through: 'SizeProducts'
      });
    
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    keywords: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    sizeId: DataTypes.INTEGER,
    discount: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
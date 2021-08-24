"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product }) {
      // define association here
      this.hasOne(User, { foreignKey: "userId", as: "user" });
      this.belongsToMany(Product, {
        through: "product_category",
        as: "products",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "categories",
      modelName: "Category",
    }
  );
  return Category;
};

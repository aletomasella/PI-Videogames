const { DataTypes } = require("sequelize");

module.exports = (s) => {
  s.define(
    "Genre",
    {
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};

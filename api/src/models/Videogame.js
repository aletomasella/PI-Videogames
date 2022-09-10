const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID, //ID de tipo alfanumerico random para que no se pise con el id numerico de la API.
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      launchDate: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.STRING,
      },
      platforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inDb: {
        //Sirve para distinguir el personaje de la DB con el de API.
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://img.freepik.com/free-vector/cute-astronaut-waving-hand-game-controller-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3714.jpg?w=2000",
      },
    },
    {
      timestamps: false,
    }
  );
};

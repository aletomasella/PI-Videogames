const { Videogame, conn, videogameModel } = require("../../src/db.js");
const { expect } = require("chai");

describe("Modelo de Videojuegos", () => {
  const game = {
    name: "Mario",
    description: "Este juego es una masa, pero tiene unos años ya",
    platforms: "PC XBOX PS NINTENTO",
    launchDate: "03-27-1965",
    rating: "4.5",
  };
  beforeEach(() => {
    conn
      //Aca se comprueba que se puede conectar a la base de datos.
      .authenticate()
      .catch((err) => {
        console.error("No se puedo conectar a la base de datos : ", err);
      });
  });

  describe("Validaciones", () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe("Nombre", () => {
      it("Debe lanzar un error si el nombre esta vacio", () => {
        return Videogame.create({
          description: "Este juego es una masa, pero tiene unos años ya",
          platforms: "PC XBOX PS NINTENTO",
          launchDate: "03-27-1965",
          rating: "4.5",
        }).catch((err) => expect(err.errors[0].path).to.equal("name")); //Aca estoy accediendo dentro del error, al nombre de cual fue el atributo que genero el error.
      });
    });

    describe("Descripcion", () => {
      it("Debe lanzar un error si la descripcion esta vacia", () => {
        return Videogame.create({
          name: "Mario",
          platforms: "PC XBOX PS NINTENTO",
          launchDate: "03-27-1965",
          rating: "4.5",
        }).catch((err) => expect(err.errors[0].path).to.equal("description"));
      });
    });

    describe("Plataformas", () => {
      it("Debe lanzar un error si no se le asigno ninguna plataforma", () => {
        Videogame.create({
          name: "Mario",
          description: "Este juego es una masa, pero tiene unos años ya",
          launchDate: "03-27-1965",
          rating: "4.5",
        }).catch(() => expect(err.error[0].path.to.equal("platforms")));
      });
    });
  });
  //   describe("Asosociaciones", () => {
  //     it("Debe estar asociado correctamente con la tabla Genres", async () => {
  //       const model = await Videogame.create({
  //         name: "Mario",
  //         description: "Este juego es una masa, pero tiene unos años ya",
  //         launchDate: "03-27-1965",
  //         rating: "4.5",
  //         genres: ["RPG", "Action"],
  //       });
  //       expect(model.genreId).to.equal(seed.ca);
  //     });
  //   });
});

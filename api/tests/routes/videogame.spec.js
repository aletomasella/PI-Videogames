/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app); //Aca le estoy pasando mi app de express a supertest y lo que me devuelve lo guardo en agent que me va permitir hacer los pedidos a la api.
const videogame = {
  name: "Mario",
  description: "Este juego es una masa, pero tiene unos años ya",
  platforms: "PC XBOX PS NINTENTO",
  launchDate: "03-27-1965",
  rating: "4.5",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("GET /videogames", () => {
    it("Debe devolver un 200", () => agent.get("/videogames").expect(200));
    it("Debe devolver un array con los juegos", () =>
      agent
        .get("/videogames")
        .then((response) => expect(response.body.length).to.equal(100)));
  });
  describe("POST /videogames", () => {
    it("Debe devolver un error si no se pasan los parametros necesarios", () => {
      agent
        .post("/videogames")
        .send({
          description: "Este juego es una masa, pero tiene unos años ya",
          platforms: "PC XBOX PS NINTENTO",
          launchDate: "03-27-1965",
          rating: "4.5",
        })
        .expect(404);
    });
  });
});

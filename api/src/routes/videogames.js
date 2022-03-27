const { Router } = require("express");
const { apiKey } = require("../db.js");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const {
  filterGame,
  getIndex,
  createGames,
  findOrCreateGames,
  errorHandler,
} = require("./util");

//ME FALTARIA QUE FUNCIONE EL FIND OR CREATE NOMAS PARA NO ESTAR CARGANDO DATOS DE MAS PERO TODO LO DEMAS ESTA FUNCIONANDO Y BASTANTE MODULARIZADO.

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return next();
    const url = `https://api.rawg.io/api/games?page_size=15&${apiKey}&search=${name}`;
    const response = await axios.get(url);
    const games = response.data.results;
    if (games.lenght)
      return res
        .status(404)
        .send(
          "No se encontraron videojuegos que coincidan con el nombre pasado."
        );

    const gamesData = games.map((game) => filterGame(game));
    const gamesCreation = gamesData.map((game) => createGames(game));
    const gamesCreated = await Promise.all(gamesCreation);

    for (let i = 0; i < gamesData.length; i++) {
      await gamesCreated[i].addGenre(await getIndex(gamesData[i]));
    } // YA FUNCIONA!

    return res.json(gamesCreated);
  } catch (e) {
    errorHandler(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const url = `https://api.rawg.io/api/games?page_size=100&${apiKey}`;
    const response = await axios.get(url);
    const games = response.data.results;
    const gamesData = games.map((game) => filterGame(game));

    const gamesCreation = gamesData.map((game) => createGames(game));

    const gamesCreated = await Promise.all(gamesCreation);

    for (let i = 0; i < gamesData.length; i++) {
      await gamesCreated[i].addGenre(await getIndex(gamesData[i]));
    } // YA FUNCIONA!

    res.json(gamesCreated);
  } catch (e) {
    errorHandler(e, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.rawg.io/api/games/${id}?${apiKey}`;
    const response = await axios.get(url);
    const game = response.data;
    if (game) {
      const gameData = filterGame(game);
      const newGame = await createGames(gameData);

      await newGame.addGenre(await getIndex(gameData));

      return res.json(newGame);
    }
    return res.status(404).send("Juego no encontrado");
  } catch (e) {
    errorHandler(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, launchDate, rating, platforms } = req.body;
    if (!name || !description || !platforms)
      return res.status(404).send("No se brindaron los datos necesarios.");
    const newVideogame = Videogame.build({
      name,
      description,
      platforms,
    });
    if (launchDate) newVideogame.launchDate = launchDate;
    if (rating) newVideogame.rating = rating;
    await newVideogame.save();
    res.json(newVideogame);
  } catch (e) {
    errorHandler(e);
  }
});

module.exports = router;

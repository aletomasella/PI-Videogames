const { Router } = require("express");
const { apiKey } = require("../db.js");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const {
  filterGame,
  getIndex,
  errorHandler,
  getVideogamesInDb,
  getGamesInApi,
} = require("./util");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const videogamesInDb = await getVideogamesInDb();

      const gamesInApi = await getGamesInApi();

      const allGames = gamesInApi.concat(videogamesInDb);

      res.json(allGames);
    } else {
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

      const videogamesInDb = await getVideogamesInDb();
      const filterGamesInDb = videogamesInDb.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.json(gamesData.concat(filterGamesInDb));
    }
  } catch (e) {
    errorHandler(e, res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.includes("-")) {
      const url = `https://api.rawg.io/api/games/${id}?${apiKey}`;
      const response = await axios.get(url);
      const game = response.data;
      if (game) {
        const gameData = filterGame(game);

        return res.json(gameData);
      }
    } else {
      const gameInDb = await Videogame.findByPk(id);

      if (gameInDb) return res.json(gameInDb);
    }
    return res.status(404).send("Juego no encontrado");
  } catch (e) {
    res.status(404).send("El juego no ha sido encontrado.");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, launchDate, rating, platforms, genres } =
      req.body;
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

    const gameGenres = {
      genres,
    }; //Esto lo hago para poder utilizar mi funcion de getIndex que espera recibir un objecto con una propiedad genres que sea un arreglo.

    await newVideogame.addGenre(await getIndex(gameGenres));

    const newVideogameInDb = await Videogame.findAll({
      where: {
        id: newVideogame.id,
      },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.json(newVideogameInDb);
  } catch (e) {
    errorHandler(e, res);
  }
});

module.exports = router;

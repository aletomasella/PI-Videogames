const { Router } = require("express");
const { apiKey } = require("../db.js");
const axios = require("axios");
const { Videogame } = require("../db");

const router = Router();

router.get("/", (req, res, next) => {
  const { name } = req.query;
  if (!name) return next();
});

router.get("/", async (req, res) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games?page_size=100&${apiKey}`
  );
  const games = response.data.results;
  const gamesData = games.map((game) => {
    const description = game.tags.map((tag) => tag.name);
    const platforms = game.platforms.map((plat) => plat.platform.name);
    const genres = game.genres.map((genre) => genre.name);
    return {
      name: game.name,
      description: description.join(" "),
      launchDate: game.released,
      rating: game.rating,
      platforms: platforms.join(" "),
      genres,
    };
  });

  // Cargo los datos traidos y filtrados de la API a mi DB. Me falta configurar el tema de los generos.
  await gamesData.forEach((game) => {
    Videogame.create({
      name: game.name,
      description: game.description,
      launchDate: game.launchDate,
      rating: game.rating,
      platforms: game.platforms,
    });
  });

  res.json(gamesData);
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

module.exports = router;

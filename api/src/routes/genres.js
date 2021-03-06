const { default: axios } = require("axios");
const { Router } = require("express");
const { apiKey } = require("../db");
const { Genre, videogame_genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?page_size=100&${apiKey}`
    );
    const genres = response.data.results;
    const genresNames = genres.map((genre) => genre.name);
    await genresNames.forEach((name) => {
      Genre.findOrCreate({
        where: {
          name,
        },
      });
    });

    const genresInDb = await Genre.findAll();

    res.json(genresInDb);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});

module.exports = router;

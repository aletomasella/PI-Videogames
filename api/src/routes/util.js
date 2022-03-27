const { Genre, Videogame } = require("../db");

function filterGame(game) {
  const description = game.tags.map((tag) => tag.name);
  const platforms = game.platforms.map((plat) => plat.platform.name);
  const genres = game.genres.map((genre) => genre.name);

  return {
    name: game.name,
    description: description.slice(0, 5).join(" "),
    launchDate: game.released,
    rating: game.rating,
    platforms: platforms.join(" "),
    genres,
  };
}

async function getIndex(game) {
  const ids = [];
  const genres = await Genre.findAll();
  const filterGenres = genres.map((genre) => genre.toJSON());

  for (let i = 0; i < game.genres.length; i++) {
    const find = filterGenres.find((genre) => genre.name === game.genres[i]);
    if (find) {
      ids.push(find.id);
    }
  }
  console.log(ids);
  return ids;
}

function createGames(game) {
  return Videogame.create({
    name: game.name,
    description: game.description,
    launchDate: game.launchDate,
    rating: game.rating,
    platforms: game.platforms,
  });
}

function findOrCreateGames(game) {
  return Videogame.findOrCreate({
    where: {
      name: game.name,
      description: game.description,
      launchDate: game.launchDate,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres,
    },
  })[0];
}

function errorHandler(error, res) {
  console.log(error);
  return res.status(400).send("Algo salio mal.");
}

module.exports = {
  filterGame,
  getIndex,
  createGames,
  findOrCreateGames,
  errorHandler,
};

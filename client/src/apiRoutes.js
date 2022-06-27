const api = {
  getAllVideogames:
    "https://pi-videogames-production.up.railway.app/videogames",
  getAllVideogamesByName:
    "https://pi-videogames-production.up.railway.app/videogames?name=",
  getVideogamesById:
    "https://pi-videogames-production.up.railway.app/videogames/",
  createVideogame: "https://pi-videogames-production.up.railway.app/videogames",
  getAllGenres: "https://pi-videogames-production.up.railway.app/genres",
};

const localApi = {
  getAllVideogames: "http://localhost:3001/videogames",
  getVideogamesById: "http://localhost:3001/videogames/",
  getAllVideogamesByName: "http://localhost:3001/videogames?name=",
  getAllGenres: "http://localhost:3001/genres",
};

export default api;

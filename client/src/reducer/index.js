import {
  FILTER_BY_CREATION,
  FILTER_BY_GENRE,
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  ORDER_BY_NAME,
  ORDER_BY_RATING,
  VIDEOGAME_BY_ID,
} from "../action";

const inicialState = {
  videogames: [],
  allVideogames: [],
  videogame: {},
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };
    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      };
    case FILTER_BY_GENRE:
      if (action.payload !== "All") {
        const allVideogames = [...state.allVideogames];
        const gamesFiltered = allVideogames.filter(
          (game) => game.genres && game.genres.includes(action.payload)
        );
        return {
          ...state,
          videogames: gamesFiltered,
        };
      } else {
        return {
          ...state,
          videogames: [...state.allVideogames],
        };
      }

    case FILTER_BY_CREATION:
      if (action.payload === "All") {
        return {
          ...state,
          videogames: [...state.allVideogames],
        };
      } else {
        const allVideogames = [...state.allVideogames];
        const filteredGames =
          action.payload === "Db"
            ? allVideogames.filter((el) => el.inDb)
            : allVideogames.filter((el) => !el.inDb);
        return {
          ...state,
          videogames: filteredGames,
        };
      }
    case ORDER_BY_NAME:
      const sortedVideogamesByName =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });

      return {
        ...state,
        videogames: sortedVideogamesByName,
      };
    case ORDER_BY_RATING:
      const sortedVideogamesByRating =
        action.payload === "asc"
          ? state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return 1;
              if (b.rating > a.rating) return -1;
              return 0;
            })
          : state.videogames.sort((a, b) => {
              if (a.rating > b.rating) return -1;
              if (b.rating > a.rating) return 1;
              return 0;
            });

      return {
        ...state,
        videogames: sortedVideogamesByRating,
      };
    case VIDEOGAME_BY_ID:
      return {
        ...state,
        videogame: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;

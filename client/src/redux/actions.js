import axios from "axios"
const URL = process.env.REACT_APP_API_ENDPOINT


//"https://videogames-1.herokuapp.com"
//"http://192.168.0.242:3001"
// const URL = "https://videogames-1.herokuapp.com"

export const GET_ALL_GAMES = "GET_ALL_GAMES"
export const SEARCH_GAMES = "SEARCH_GAMES"
export const GET_GAME_DETAILS = "GET_GAME_DETAILS"
export const LOADING = "LOADING"
export const SET_PAGE = "SET_PAGE"
export const RESET_FILTERS = "RESET_FILTERS"
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN"
export const FILTER_BY_GENRE = "FILTER_BY_GENRE"
export const SORT = "SORT"

export const getAllGames = () => {
    console.log(process.env)
    return (dispatch) => {

        return axios.get(URL + "/videogames", {
        })
            .then(res => {
                dispatch({
                    type: GET_ALL_GAMES,
                    payload: res.data
                })
            })
    }
}


export const searchGames = (name) => {
    return async (dispatch) => {
        return axios.get(`${URL}/videogames?name=${name}`)
            .then(res => {
                dispatch({
                    type: SEARCH_GAMES,
                    payload: res.data
                })
            })
    }
}


export const getGameDetails = (id) => {
    return async (dispatch) => {
        return axios.get(`${URL}/videogame/${id}`)
            .then(res => {
                dispatch({
                    type: GET_GAME_DETAILS,
                    payload: res.data
                })
            })
    }
}

export const setLoading = (status) => {
    return {
        type: LOADING,
        payload: status
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    }
}

export const filterByOrigin = (bool) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: bool
    }
}

export const filterByGenre = (genre) => {
    return {
        type: FILTER_BY_GENRE,
        payload: genre
    }
}

export const sort = (sortParam) => {
    return {
        type: SORT,
        payload: sortParam
    }
}
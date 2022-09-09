import axios from 'axios'
import React, { useEffect } from 'react'
import styles from "./CreateGame.module.css"
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAllGames } from '../../redux/actions'

const URL = process.env.REACT_APP_API_ENDPOINT

export default function CreateGame() {

    const history = useHistory();
    const dispatch = useDispatch()


    //Values
    const [gameName, setGameName] = React.useState("")
    const [gameDescription, setGameDescription] = React.useState("")
    const [gameImage, setGameImage] = React.useState("")
    const [gameGenre, setGameGenre] = React.useState([])
    const [gamePlatform, setGamePlatform] = React.useState([])
    const [gameRating, setGameRating] = React.useState(null)


    //Alerts
    const [nameAlert, setNameAlert] = React.useState("")
    const [descriptionAlert, setDescriptionAlert] = React.useState("")
    const [imageAlert, setImageAlert] = React.useState("")
    const [genreAlert, setGenreAlert] = React.useState("")
    const [platformAlert, setPlatformAlert] = React.useState("")

    useEffect(() => {
        console.log(gameName, gameDescription, gameImage, gameGenre, gamePlatform)
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "gameName") {
            setNameAlert("")
            setGameName(value)
        } else if (name === "gameDescription") {
            setDescriptionAlert("")
            setGameDescription(value)
        } else if (name === "gameImage") {
            setImageAlert("")
            setGameImage(value)
        } else if (name === "gameRating") {
            setGameRating(value)
        }
    }

    const handleLists = (event) => {
        const { innerText, id } = event.target


        if (event.target.className === "") {
            event.target.className = styles.active
            if (id.includes("genre")) { setGameGenre([...gameGenre, parseInt(id.slice(6))]); setGenreAlert("") }
            if (id.includes("platform")) { setGamePlatform([...gamePlatform, parseInt(id.slice(9))]); setPlatformAlert("") }
        } else if (event.target.className === styles.active) {
            event.target.className = ""
            id.includes("genre") && setGameGenre(gameGenre.filter(genre => genre !== parseInt(id.slice(6))))
            id.includes("platform") && setGamePlatform(gamePlatform.filter(platform => platform !== parseInt(id.slice(9))))
        }


        console.log(innerText)
    }

    const handleSubmit = (event) => {
        let verified = true;

        if (!gameName) { setNameAlert("Please enter a name"); verified = false }
        if (!gameDescription) { setDescriptionAlert("Please enter a description"); verified = false }
        if (!gameImage) { setImageAlert("Please enter an image"); verified = false }
        else if (/(https?:\/\/.*\.(?:png|jpg))/i.test(gameImage) === false) { setImageAlert("Please enter a valid image url"); verified = false }
        if (!gameGenre.length) { setGenreAlert("Please select a genre"); verified = false }
        if (!gamePlatform.length) { setPlatformAlert("Please select a platform"); verified = false }


        if (verified) {
            console.log(gameName, gameDescription, gameImage, gameGenre, gamePlatform)
            console.log(gameImage)
            axios.post(`${URL}/videogame`, {
                name: gameName,
                description: gameDescription,
                image: gameImage,
                genres: gameGenre,
                platforms: gamePlatform,
                rating: gameRating
            }).then(res => { console.log(res); dispatch(getAllGames()); history.push("/main") }, err => console.log(err))
        }
    }


    return (
        <>
            <h1>Create Game</h1>
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Name*</label>
                    <input type="text" placeholder="Name" name='gameName' onChange={handleChange} autoComplete="none" />
                    <label className={styles.alert} >{nameAlert}</label>
                </div>
                <div className={styles.formGroup}>
                    <label>Description*</label>
                    <textarea className={styles.gameDescription} placeholder="Description" name='gameDescription' onChange={handleChange}></textarea>
                    <label className={styles.alert} >{descriptionAlert}</label>
                </div>
                <div className={styles.formGroup}>
                    <label>Image*</label>
                    <input type="text" placeholder="Image URL" name='gameImage' onChange={handleChange} />
                    <label className={styles.alert} >{imageAlert}</label>
                </div>
                <div className={styles.formGroup}>
                    <label>Rating</label>
                    <input type="number" placeholder="Rating" name='gameRating' onChange={handleChange} step="0.1" min="1" max="5" />
                    <label className={styles.alert} >{descriptionAlert}</label>
                </div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.dropdown}>
                        <button >Genres*</button>
                        <label className={styles.alert} >{genreAlert}</label>
                        <div className={styles.dropdownContent}>
                            <div className={styles.categoriesContainer}>
                                <p className={styles.categories} >Genres</p>
                                <span onClick={handleLists} id="genre-4" >Action</span>
                                <span onClick={handleLists} id="genre-3" >Adventure</span>
                                <span onClick={handleLists} id="genre-11" >Arcade</span>
                                <span onClick={handleLists} id="genre-28" >Board Games</span>
                                <span onClick={handleLists} id="genre-17" >Card</span>
                                <span onClick={handleLists} id="genre-40" >Casual</span>
                                <span onClick={handleLists} id="genre-34" >Educational</span>
                                <span onClick={handleLists} id="genre-19" >Family</span>
                                <span onClick={handleLists} id="genre-6" >Fighting</span>
                                <span onClick={handleLists} id="genre-51" >Indie</span>
                                <span onClick={handleLists} id="genre-59" >Massively Multiplayer</span>
                                <span onClick={handleLists} id="genre-83" >Platformer</span>
                                <span onClick={handleLists} id="genre-7" >Puzzle</span>
                                <span onClick={handleLists} id="genre-5" >RPG</span>
                                <span onClick={handleLists} id="genre-1" >Racing</span>
                                <span onClick={handleLists} id="genre-2" >Shooter</span>
                                <span onClick={handleLists} id="genre-15" >Sports</span>
                                <span onClick={handleLists} id="genre-14" >Simulation</span>
                                <span onClick={handleLists} id="genre-10" >Strategy</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dropdown}>
                        <button >Platforms*</button>
                        <label className={styles.alert} >{platformAlert}</label>
                        <div className={styles.dropdownContent}>
                            <div className={styles.categoriesContainer}>
                                <p className={styles.categories} >Platforms</p>
                                <span onClick={handleLists} id="platform-21" >Android</span>
                                <span onClick={handleLists} id="platform-26" >Game Boy</span>
                                <span onClick={handleLists} id="platform-24" >Game Boy Advance</span>
                                <span onClick={handleLists} id="platform-43" >Game Boy Color</span>
                                <span onClick={handleLists} id="platform-105" >GameCube</span>
                                <span onClick={handleLists} id="platform-3" >iOS</span>
                                <span onClick={handleLists} id="platform-6" >Linux</span>
                                <span onClick={handleLists} id="platform-5" >macOS</span>
                                <span onClick={handleLists} id="platform-49" >NES</span>
                                <span onClick={handleLists} id="platform-8" >Nintendo 3Ds</span>
                                <span onClick={handleLists} id="platform-83" >Nintendo 64</span>
                                <span onClick={handleLists} id="platform-9" >Nintendo DS</span>
                                <span onClick={handleLists} id="platform-13" >Nintendo DSi</span>
                                <span onClick={handleLists} id="platform-4" >PC</span>
                                <span onClick={handleLists} id="platform-19" >PS Vita</span>
                                <span onClick={handleLists} id="platform-17" >PSP</span>
                                <span onClick={handleLists} id="platform-27" >PlayStation</span>
                                <span onClick={handleLists} id="platform-15" >PlayStation 2</span>
                                <span onClick={handleLists} id="platform-16" >PlayStation 3</span>
                                <span onClick={handleLists} id="platform-18" >PlayStation 4</span>
                                <span onClick={handleLists} id="platform-187" >PlayStation 5</span>
                                <span onClick={handleLists} id="platform-79" >SNES</span>
                                <span onClick={handleLists} id="platform-11" >Wii</span>
                                <span onClick={handleLists} id="platform-10" >Wii U</span>
                                <span onClick={handleLists} id="platform-80" >Xbox</span>
                                <span onClick={handleLists} id="platform-14" >Xbox 360</span>
                                <span onClick={handleLists} id="platform-1" >Xbox One</span>
                                <span onClick={handleLists} id="platform-186" >Xbox Series S/X</span>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <p className={styles.required}>* Required Field</p>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}
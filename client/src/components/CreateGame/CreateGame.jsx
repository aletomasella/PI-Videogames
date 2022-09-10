import axios from "axios";
import React, { useEffect } from "react";
import styles from "./CreateGame.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllGames } from "../../redux/actions";

const URL = "https://pi-videogames-production.up.railway.app";

export default function CreateGame() {
  const history = useHistory();
  const dispatch = useDispatch();

  //Values
  const [gameName, setGameName] = React.useState("");
  const [gameDescription, setGameDescription] = React.useState("");
  const [gameImage, setGameImage] = React.useState("");
  const [gameGenre, setGameGenre] = React.useState([]);
  const [gamePlatform, setGamePlatform] = React.useState([]);
  const [gameRating, setGameRating] = React.useState(null);

  //Alerts
  const [nameAlert, setNameAlert] = React.useState("");
  const [descriptionAlert, setDescriptionAlert] = React.useState("");
  const [imageAlert, setImageAlert] = React.useState("");
  const [genreAlert, setGenreAlert] = React.useState("");
  const [platformAlert, setPlatformAlert] = React.useState("");

  useEffect(() => {
    console.log(gameName, gameDescription, gameImage, gameGenre, gamePlatform);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "gameName") {
      setNameAlert("");
      setGameName(value);
    } else if (name === "gameDescription") {
      setDescriptionAlert("");
      setGameDescription(value);
    } else if (name === "gameImage") {
      setImageAlert("");
      setGameImage(value);
    } else if (name === "gameRating") {
      setGameRating(value);
    }
  };

  const handleLists = (event) => {
    const { innerText, id } = event.target;

    if (event.target.className === "") {
      event.target.className = styles.active;
      if (id.includes("genre")) {
        setGameGenre([...gameGenre, innerText]);
        setGenreAlert("");
      }
      if (id.includes("platform")) {
        setGamePlatform([...gamePlatform, innerText]);
        setPlatformAlert("");
      }
    } else if (event.target.className === styles.active) {
      event.target.className = "";
      id.includes("genre") &&
        setGameGenre(gameGenre.filter((genre) => genre !== innerText));
      id.includes("platform") &&
        setGamePlatform(
          gamePlatform.filter((platform) => platform !== innerText)
        );
    }
  };

  const handleSubmit = (event) => {
    let verified = true;

    if (!gameName) {
      setNameAlert("Please enter a name");
      verified = false;
    }
    if (!gameDescription) {
      setDescriptionAlert("Please enter a description");
      verified = false;
    }
    // if (!gameImage) {
    //   setImageAlert("Please enter an image");
    //   verified = false;
    // } else if (/(https?:\/\/.*\.(?:png|jpg))/i.test(gameImage) === false) {
    //   setImageAlert("Please enter a valid image url");
    //   verified = false;
    // }
    if (!gameGenre.length) {
      setGenreAlert("Please select a genre");
      verified = false;
    }
    if (!gamePlatform.length) {
      setPlatformAlert("Please select a platform");
      verified = false;
    }

    if (verified) {
      const newGame = {
        name: gameName,
        description: gameDescription,
        img: gameImage,
        genres: gameGenre,
        platforms: gamePlatform.join(" "),
        rating: gameRating,
      };
      console.log(newGame);
      axios.post(`${URL}/videogame`, newGame).then(
        (res) => {
          console.log(res);
          dispatch(getAllGames());
          history.push("/main");
        },
        (err) => console.log(err)
      );
    }
  };

  return (
    <>
      <h1>Create Game</h1>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name*</label>
          <input
            type="text"
            placeholder="Name"
            name="gameName"
            onChange={handleChange}
            autoComplete="none"
          />
          <label className={styles.alert}>{nameAlert}</label>
        </div>
        <div className={styles.formGroup}>
          <label>Description*</label>
          <textarea
            className={styles.gameDescription}
            placeholder="Description"
            name="gameDescription"
            onChange={handleChange}
          ></textarea>
          <label className={styles.alert}>{descriptionAlert}</label>
        </div>
        <div className={styles.formGroup}>
          <label>Image*</label>
          <input
            type="text"
            placeholder="Image URL"
            name="gameImage"
            onChange={handleChange}
          />
          <label className={styles.alert}>{imageAlert}</label>
        </div>
        <div className={styles.formGroup}>
          <label>Rating</label>
          <input
            type="number"
            placeholder="Rating"
            name="gameRating"
            onChange={handleChange}
            step="0.1"
            min="1"
            max="5"
          />
          <label className={styles.alert}>{descriptionAlert}</label>
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.dropdown}>
            <button>Genres*</button>
            <label className={styles.alert}>{genreAlert}</label>
            <div className={styles.dropdownContent}>
              <div className={styles.categoriesContainer}>
                <p className={styles.categories}>Genres</p>
                <span onClick={handleLists} id="genre-4" name="Action">
                  Action
                </span>
                <span onClick={handleLists} id="genre-3" name="Adventure">
                  Adventure
                </span>
                <span onClick={handleLists} id="genre-11" name="Arcade">
                  Arcade
                </span>
                <span onClick={handleLists} id="genre-28" name="Board Games">
                  Board Games
                </span>
                <span onClick={handleLists} id="genre-17" name="Card">
                  Card
                </span>
                <span onClick={handleLists} id="genre-40" name="Casual">
                  Casual
                </span>
                <span onClick={handleLists} id="genre-34" name="Educational">
                  Educational
                </span>
                <span onClick={handleLists} id="genre-19" name="Family">
                  Family
                </span>
                <span onClick={handleLists} id="genre-6" name="Fighting">
                  Fighting
                </span>
                <span onClick={handleLists} id="genre-51" name="Indie">
                  Indie
                </span>
                <span
                  onClick={handleLists}
                  id="genre-59"
                  name="Massively Multiplayer"
                >
                  Massively Multiplayer
                </span>
                <span onClick={handleLists} id="genre-83" name="Platformer">
                  Platformer
                </span>
                <span onClick={handleLists} id="genre-7" name="Puzzle">
                  Puzzle
                </span>
                <span onClick={handleLists} id="genre-5" name="RPG">
                  RPG
                </span>
                <span onClick={handleLists} id="genre-1" name="Racing">
                  Racing
                </span>
                <span onClick={handleLists} id="genre-2" name="Shooter">
                  Shooter
                </span>
                <span onClick={handleLists} id="genre-15" name="Sports">
                  Sports
                </span>
                <span onClick={handleLists} id="genre-14" name="Simulation">
                  Simulation
                </span>
                <span onClick={handleLists} id="genre-10" name="Strategy">
                  Strategy
                </span>
              </div>
            </div>
          </div>
          <div className={styles.dropdown}>
            <button>Platforms*</button>
            <label className={styles.alert}>{platformAlert}</label>
            <div className={styles.dropdownContent}>
              <div className={styles.categoriesContainer}>
                <p className={styles.categories}>Platforms</p>
                <span onClick={handleLists} id="platform-21" name="Android">
                  Android
                </span>
                <span onClick={handleLists} id="platform-26" name="Game Boy">
                  Game Boy
                </span>
                <span
                  onClick={handleLists}
                  id="platform-24"
                  name="Game Boy Advance"
                >
                  Game Boy Advance
                </span>
                <span
                  onClick={handleLists}
                  id="platform-43"
                  name="Game Boy Color"
                >
                  Game Boy Color
                </span>
                <span onClick={handleLists} id="platform-105" name="GameCube">
                  GameCube
                </span>
                <span onClick={handleLists} id="platform-3" name="iOS">
                  iOS
                </span>
                <span onClick={handleLists} id="platform-6" name="Linux">
                  Linux
                </span>
                <span onClick={handleLists} id="platform-5" name="macOS">
                  macOS
                </span>
                <span onClick={handleLists} id="platform-49" name="NES">
                  NES
                </span>
                <span onClick={handleLists} id="platform-8" name="Nintento 3Ds">
                  Nintendo 3Ds
                </span>
                <span onClick={handleLists} id="platform-83" name="Nintento 64">
                  Nintendo 64
                </span>
                <span onClick={handleLists} id="platform-9" name="Nintento DS">
                  Nintendo DS
                </span>
                <span
                  onClick={handleLists}
                  id="platform-13"
                  name="Nintento DSi"
                >
                  Nintendo DSi
                </span>
                <span onClick={handleLists} id="platform-4" name="PC">
                  PC
                </span>
                <span onClick={handleLists} id="platform-19" name="PS Vita">
                  PS Vita
                </span>
                <span onClick={handleLists} id="platform-17" name="PSP">
                  PSP
                </span>
                <span onClick={handleLists} id="platform-27" name="PlayStation">
                  PlayStation
                </span>
                <span
                  onClick={handleLists}
                  id="platform-15"
                  name="PlayStation 2"
                >
                  PlayStation 2
                </span>
                <span
                  onClick={handleLists}
                  id="platform-16"
                  name="PlayStation 3"
                >
                  PlayStation 3
                </span>
                <span
                  onClick={handleLists}
                  id="platform-18"
                  name="PlayStation 4"
                >
                  PlayStation 4
                </span>
                <span
                  onClick={handleLists}
                  id="platform-187"
                  name="PlayStation 5"
                >
                  PlayStation 5
                </span>
                <span onClick={handleLists} id="platform-79" name="SNES">
                  SNES
                </span>
                <span onClick={handleLists} id="platform-11" name="Wii">
                  Wii
                </span>
                <span onClick={handleLists} id="platform-10" name="Wii U">
                  Wii U
                </span>
                <span onClick={handleLists} id="platform-80" name="Xbox">
                  Xbox
                </span>
                <span onClick={handleLists} id="platform-14" name="Xbox 360">
                  Xbox 360
                </span>
                <span onClick={handleLists} id="platform-1" name="Xbox One">
                  Xbox One
                </span>
                <span
                  onClick={handleLists}
                  id="platform-186"
                  name="Xbox Series S/X"
                >
                  Xbox Series S/X
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <p className={styles.required}>* Required Field</p>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

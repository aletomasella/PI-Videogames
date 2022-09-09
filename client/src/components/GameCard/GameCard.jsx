import React from 'react'
import styles from "./GameCard.module.css"
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/actions';
import { useHistory } from "react-router-dom"

function GameCard({ id, name, image, genres }) {

    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <>
            <div className={styles.card} onClick={() => { dispatch(setLoading(true)); history.push("/main/game/" + id) }}>

                {/* Card Image */}
                <div className={styles.imgContainer}>
                    <img src={image} alt="Game cover" className={styles.cardImg} />
                </div>

                {/* Card Info */}
                <div className={styles.infoContainer}>
                    <h2 className={styles.title}>{name}</h2>
                    <h3 className={styles.genres} >{genres.map((genre, i) => {
                        if (i === genres.length - 1) return (genre)
                        return (genre + " - ")
                    })}</h3>
                </div>

            </div>
        </>
    )
}

export default GameCard
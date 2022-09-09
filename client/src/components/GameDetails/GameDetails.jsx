import React, { useEffect } from 'react'
import { getGameDetails, setLoading } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./GameDetails.module.css"
import Loading from '../Loading/Loading'
import { useParams } from 'react-router'


function GameDetails() {

    const { id, name, rating, image, description, genres, platforms, launchDate } = useSelector(state => state.gameDetails)
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        dispatch(getGameDetails(params.id))
        window.scrollTo(0, 0)
    }, [dispatch, params.id])

    const imageLoaded = () => {
        if (id.toString() === params.id) dispatch(setLoading(false))
    }

    return (
        <>
            <div style={{ display: loading ? "flex" : "none" }} ><Loading /></div>

            <div className={styles.container} style={{ display: loading ? "none" : "flex" }}>

                <div className={styles.firstRow}>
                    <h1 className={styles.title}>{name}</h1>
                    <span className={styles.titles}>Rating:&nbsp;<p className={styles.rating}>{rating}/5</p></span>
                    <span className={styles.titles}>Launch Date:&nbsp;<p className={styles.launchDate}>{launchDate}</p></span>
                </div>

                <img src={image} alt="" className={styles.img} onLoad={imageLoaded} />

                <p dangerouslySetInnerHTML={{ __html: description }} className={styles.description} />

                <div className={styles.secondRow}>
                    <div className={styles.textContainer}><h4>Genres: </h4>{genres && genres.map((e, i) => <p key={i}>- {e}</p>)}</div>
                    <div className={styles.textContainer}><h4>Platforms: </h4>{platforms && platforms.map((e, i) => <p key={i} >- {e}</p>)}</div>
                </div>
            </div>
        </>
    )
}

export default GameDetails



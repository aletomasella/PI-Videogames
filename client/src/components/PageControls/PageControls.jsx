import React from 'react'
import styles from "./PageControls.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../redux/actions'

function PageControls() {

    const { loading, page, games } = useSelector(state => state)
    const dispatch = useDispatch()

    const previousPage = () => {
        dispatch(setPage(page - 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const nextPage = () => {
        dispatch(setPage(page + 1))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(games.length / 15); i++) {
        pageNumbers.push(i)
    }

    if (loading) return <></>
    return (
        <div className={styles.container}>
            <button onClick={previousPage} style={{ display: page > 1 ? "block" : "none" }} >&lt;</button>
            <p>{page}</p>
            <button onClick={nextPage} style={{ display: page < games.length / 15 ? "block" : "none" }} >&gt;</button>
        </div>
    )
}


export default PageControls
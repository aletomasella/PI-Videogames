import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByOrigin, resetFilters, filterByGenre, setPage, sort } from '../../redux/actions'
import styles from "./Filters.module.css"

export default function Filters() {

    const dispatch = useDispatch()
    const sorted = useSelector(state => state.sorted)
    const [lastClicked, setlastClicked] = useState(null)

    const handleClick = (e) => {
        console.log(e.target.innerText)
        const name = e.target.getAttribute("name")
        dispatch(setPage(1))

        if (["name", "rating"].includes(name)) return dispatch(sort(name))

        dispatch(resetFilters())

        setlastClicked(e)
        if (e.target.className === "") e.target.className = styles.active
        else return e.target.className = ""
        if (lastClicked && lastClicked.target !== e.target) lastClicked.target.className = ""


        if (["userCreated", "legacy"].includes(name)) dispatch(filterByOrigin(name))

        else dispatch(filterByGenre(e.target.innerText))

    }

    return (
        <>
            <div className={styles.dropdown}>
                <button className={styles.dropbtn} >FILTER BY</button>
                <div className={styles.dropdownContent}>
                    <div className={styles.categoriesContainer}>
                        <p className={styles.categories} >Genre</p>
                        <span onClick={handleClick} >Action</span>
                        <span onClick={handleClick} >Adventure</span>
                        <span onClick={handleClick} >Arcade</span>
                        <span onClick={handleClick} >Board Games</span>
                        <span onClick={handleClick} >Card</span>
                        <span onClick={handleClick} >Casual</span>
                        <span onClick={handleClick} >Educational</span>
                        <span onClick={handleClick} >Family</span>
                        <span onClick={handleClick} >Fighting</span>
                        <span onClick={handleClick} >Indie</span>
                        <span onClick={handleClick} >Massively Multiplayer</span>
                        <span onClick={handleClick} >Platformer</span>
                        <span onClick={handleClick} >Puzzle</span>
                        <span onClick={handleClick} >RPG</span>
                        <span onClick={handleClick} >Racing</span>
                        <span onClick={handleClick} >Shooter</span>
                        <span onClick={handleClick} >Sports</span>
                        <span onClick={handleClick} >Simulation</span>
                        <span onClick={handleClick} >Strategy</span>
                    </div>
                    <div className={styles.categoriesContainer}>
                        <p className={styles.categories} >Videogame Type</p>
                        <span onClick={handleClick} name="userCreated" >User Created</span>
                        <span onClick={handleClick} name="legacy" >Legacy</span>
                    </div>
                </div>
            </div>


            <div className={styles.dropdown}>
                <button className={styles.dropbtn} >SORT BY</button>
                <div className={styles.dropdownContent}>
                    <div className={styles.categoriesContainer}>
                        <span onClick={handleClick} name="name">Name {(sorted.match("name-a") && "↑") || (sorted.match("name-b") && "↓")}</span>

                    </div>
                    <div className={styles.categoriesContainer}>
                        <span onClick={handleClick} name="rating" >Rating {(sorted.match("rating-b") && "↑") || (sorted.match("rating-a") && "↓")}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

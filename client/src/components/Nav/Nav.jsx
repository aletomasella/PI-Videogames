import React from 'react'
import { Link, useHistory } from "react-router-dom"
import styles from "./Nav.module.css"
import logo from "../../resources/logo.png"
import { useDispatch } from 'react-redux'
import { resetFilters, setPage } from '../../redux/actions'

function Nav(props) {

    const history = useHistory()

    const dispatch = useDispatch()
    const handleLogoClick = () => {
        dispatch(resetFilters())
        dispatch(setPage(1))
        history.push("/main")
    }


    return (
        <nav className={styles.nav}>
            <img src={logo} alt="" className={styles.logo} onClick={handleLogoClick} />
            <Link to="/main/create-game" className={styles.link}>Add Game</Link>
        </nav>
    )
}

export default Nav
import React, { useState } from 'react'
import logo from "../../resources/logo.png"
import styles from "./Landing.module.css"

export default function Landing(props) {

    const [goHome, setgoHome] = useState(false)

    const redirectHome = () => {
        setgoHome(true)
        setTimeout(() => {
            props.history.push("/main")
        }, 2000)
    }


    return (
        <div className={styles.container}>
            <img src={logo} alt="" className={`${styles.logo} ${goHome && styles.goHome}`} />
            <button className={styles.button} onClick={redirectHome}>Home</button>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
        </div>
    )
}


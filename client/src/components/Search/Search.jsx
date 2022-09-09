import React, { useState } from 'react'
import styles from "./Search.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { setLoading } from '../../redux/actions'


function Search() {

    const [search, setSearch] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search === "") return
        dispatch(setLoading(true))
        history.push("/main?search=" + search)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e)
        }
    }

    if (loading) return <></>
    return (
        <div className={styles.container}>
            <input type="text" className={styles.input} value={search} onChange={e => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
            <button onClick={handleSubmit} >Search</button>
        </div>
    )
}

export default Search
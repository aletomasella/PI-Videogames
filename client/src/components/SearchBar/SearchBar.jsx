import React from 'react'
import styles from "./SearchBar.module.css"
import Search from '../Search/Search'
import Filters from '../Filters/Filters'
import { useSelector } from 'react-redux'

export default function SearchBar() {

    const loading = useSelector(state => state.loading)

    return (
        <div className={styles.container} style={{ display: loading ? "none" : "flex" }}>
            <Search />
            <Filters />
        </div>
    )
}

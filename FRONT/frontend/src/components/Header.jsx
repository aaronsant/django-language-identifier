import React, { useState, useContext } from "react"
import HeaderAuth from "./HeaderAuth"
import HeaderUnauth from "./HeaderUnauth"
import '../styles/Header.css'
import { AuthContext } from "../Contexts/AuthContext"

function Header(props) {
    const { user } = useContext(AuthContext)

    const headerContent = () => {
        if (user) {
            return (
                <HeaderAuth />
            )
        } else {
            return (
                <HeaderUnauth />
            )
        }
    }

    return (
        <nav className="navbar">
            {headerContent()}
        </nav>
    )
}

export default Header;
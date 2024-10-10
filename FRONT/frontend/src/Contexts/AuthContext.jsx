import React, {useState, createContext, useContext} from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = async (token=null) => {
        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token.access);
            localStorage.setItem(REFRESH_TOKEN, token.refresh);
        }

        try {
            const res = await api.get("/user-profile/");
            console.log(res.data)
            setUser(res.data)
        } catch (error) {
            console.log('Error fetching user details')
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}
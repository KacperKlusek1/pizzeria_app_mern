import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context){
        throw Error("useAuthContext musi być użyty w AuthContextProvider")
    }

    return context
}
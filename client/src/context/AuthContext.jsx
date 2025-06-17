import React from "react"
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        case "UPDATE_USER":
            const updatedUser = {
                ...state.user,
                ...action.payload
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));

            return {
                user: updatedUser
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const [loading, setLoading] = React.useState(true);

    const updateUser = (newUserData) => {
        dispatch({ type: "UPDATE_USER", payload: newUserData });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            dispatch({type: "LOGIN", payload: user})
        }
        setLoading(false);
    }, []);

    console.log("AuthContext state: ", state)

    return(
        <AuthContext.Provider value={{ ...state, dispatch, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
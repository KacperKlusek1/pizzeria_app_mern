import Swal from "sweetalert2";
import {useState} from "react";
import {useAuthContext} from "./useAuthContext.js";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const login = async(username, password) => {
        setIsLoading(true)
        setError(null)
        const response  = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            return false
        }

        // Sprawdzenie statusu konta
        if(json.status === 0){
            setIsLoading(false)
            setError("Konto jest zablokowane.")
            await Swal.fire({
                icon: "warning",
                title: "Konto zablokowane",
                text: "Twoje konto zostało zablokowane. Skontaktuj się z administratorem.",
                confirmButtonText: "OK"
            })
            return false
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: "LOGIN", payload: json})
            setIsLoading(false)
            return true
        }
    }
    return { login, isLoading, error}
}

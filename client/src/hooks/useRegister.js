import { useState } from "react";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const register = async(username, fullname, password, email) => {
        setIsLoading(true)
        setError(null)
        const response  = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, fullname, password, email})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            return false
        }
        if(response.ok){
            setIsLoading(false)
            return true
        }
    }
    return { register, isLoading, error}
}
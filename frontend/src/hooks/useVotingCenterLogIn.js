import { useState } from "react"
import { useVotingCenterAuthContext } from "./useVotingCenterAuthContext"


export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useVotingCenterAuthContext()

    const login = async (location, password) => {
        setIsLoading(true);
        setError(null)

        const res = await fetch('http://localhost:5000/api/v1/voting-centers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "votingCenterLocation": location,
                "votingCenterPassowrd": password
            })
        })

        const json = await res.json()

        if (!res.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (res.ok) {
            localStorage.setItem('votingCenter', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false);
            // Simulate an HTTP redirect:
            window.location.replace("http://localhost:3000/voting-center/validate");
        }
    }

    return { login, isLoading, error }
}

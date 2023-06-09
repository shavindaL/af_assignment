import { createContext, useEffect, useReducer } from "react";

export const VotingCenterAuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { location: action.payload }
        case 'LOGOUT':
            return { location: null }
        default:
            return state
    }
}

export const VotingCenterAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        location: null
    })

    useEffect(() => {
        const location = JSON.parse(localStorage.getItem('votingCenter'))

        if (location) {
            dispatch({ type: 'LOGIN', payload: location })
        }
    }, [])

    console.log("AuthContext state: ", state)

    return (
        <VotingCenterAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </VotingCenterAuthContext.Provider>
    )
}

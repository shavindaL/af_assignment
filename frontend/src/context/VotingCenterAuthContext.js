import { createContext, useReducer } from "react";

export const VotingCenterAuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return { user: action.paylod }
        }
        case 'LOGOUT': {
            return { user: null }
        }
        default:
            return state
    }
}

export const VotingCenterAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log("AuthContext state: ", state)

    return (
        <VotingCenterAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </VotingCenterAuthContext.Provider>
    )
}

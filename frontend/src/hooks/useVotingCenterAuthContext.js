import { useContext } from "react"
import { VotingCenterAuthContext } from "../context/VotingCenterAuthContext"


export const useVotingCenterAuthContext = () => {
    const context = useContext(VotingCenterAuthContext);

    if (!context)
        throw Error('useVotingCenterAuthContext must be used inside an VotingCenterAuthContextProvider')

    return context;
}
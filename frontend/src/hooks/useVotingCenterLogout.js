import { useVotingCenterAuthContext } from "./useVotingCenterAuthContext";

export const useVotingCenterLogout = () => {
    const { dispatch } = useVotingCenterAuthContext();

    const logout = () => {
        localStorage.removeItem('votingCenter');
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}
import {useAuthContext} from "./useAuthContext.js";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    return () => {
        localStorage.removeItem('user');
        dispatch({type: "LOGOUT"});
    };
}

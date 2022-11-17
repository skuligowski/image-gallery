import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { resetLayout } from "../../state/layout/layoutSlice";
import { selectUser, fetchUser, logoutUser, LoginData, loginUser } from "../../state/user/userSlice";

export function useAuthenticate() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, userError } = useAppSelector(selectUser);
    useEffect(() => {   
        if (!authenticated) {
            dispatch(fetchUser({ refLocation: location.pathname }));
        }    
    }, []);
    useEffect(() => {
        if (userError) {
            navigate('/login');
        }
    }, [userError]);
    return { authenticated };
}

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return async () => {
        await dispatch(logoutUser());
        await navigate('/login');
        await dispatch(resetLayout());
    };
}

export function useLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { authenticated, refLocation, loading, loginError } = useAppSelector(selectUser);
    useEffect(() => {
        if (authenticated) {
            const redirectUrl = params.get('redirectUrl');
            navigate(redirectUrl || refLocation || '/');
        }
    }, [authenticated]);
    const login = useCallback((loginData: LoginData) => {
        dispatch(loginUser(loginData));
    }, []);
    return { login, loading, error: loginError };
}
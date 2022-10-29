import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectUser, fetchUser, logoutUser, LoginData, loginUser } from "../../state/user/userSlice";

export function useAuthenticate() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, error } = useAppSelector(selectUser);
    useEffect(() => {
        dispatch(fetchUser({ refLocation: location.pathname }));
    }, []);
    useEffect(() => {
        if (error) {
            navigate('/login');
        }
    }, [error]);
    return { authenticated: !!user };
}

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return () => {
        dispatch(logoutUser()).then(() => navigate('/login'));
    };
}

export function useLogin() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, refLocation } = useAppSelector(selectUser);
    useEffect(() => {
        if (user) {
            navigate(refLocation || '/');
        }
    }, [user]);
    return (loginData: LoginData) => {
        dispatch(loginUser(loginData));
    }
}
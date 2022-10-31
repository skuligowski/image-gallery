import { useAuthenticate } from "../components/LoginPanel/useLogin";

export function withAuth<T extends object>(Component: React.ComponentType<T>): React.FC<T> {
    return (props: T) => {
        const { authenticated } = useAuthenticate();
        return authenticated ? <Component {...props as T} /> : <></>;
    }
}
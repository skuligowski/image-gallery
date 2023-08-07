import { useAuthenticate } from '../components/login/LoginPanel/useLogin';

export function withAdminAuth<T extends object>(Component: React.ComponentType<T>): React.FC<T> {
  return (props: T) => {
    const { authenticated, isAdmin } = useAuthenticate();
    return authenticated && isAdmin ? <Component {...(props as T)} /> : <></>;
  };
}

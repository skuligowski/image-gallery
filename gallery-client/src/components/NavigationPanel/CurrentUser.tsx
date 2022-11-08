
import UserButton from '../Buttons/UserButton';
import { useLogout } from '../LoginPanel/useLogin';
import style from './NavigationPanel.module.scss';

const CurrentUser: React.FC = () => {
    const logout = useLogout();
    return (
        <div className={style.currentUser}>
            <UserButton onClick={logout} />
        </div>
    );
}

export default CurrentUser;
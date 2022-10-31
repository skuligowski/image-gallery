
import LogoutButton from '../Buttons/LogoutButton';
import { useLogout } from '../../state/user/useLogin';
import style from './NavigationPanel.module.scss';

const CurrentUser: React.FC = () => {
    const logout = useLogout();
    return (
        <div className={style.user}>
            <LogoutButton onClick={logout} />
        </div>
    );
}

export default CurrentUser;
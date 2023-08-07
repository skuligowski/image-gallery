import { useLogout } from '../../login/LoginPanel/useLogin';
import UserButton from '../../shared/Buttons/UserButton';
import style from './ClientNavigationPanel.module.scss';

const CurrentUser: React.FC = () => {
  const logout = useLogout();
  return (
    <div className={style.currentUser}>
      <UserButton onClick={logout} />
    </div>
  );
};

export default CurrentUser;

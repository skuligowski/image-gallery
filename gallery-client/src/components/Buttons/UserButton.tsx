import { useAppSelector } from "../../state/hooks";
import IconButton, { IconButtonProps } from "./IconButton";
import style from './UserButton.module.scss';
import { selectUser } from '../../state/user/userSlice';

const UserButton: React.FC<IconButtonProps> = (props) => {
    const { user } = useAppSelector(selectUser);

    return (
        <IconButton {...props}>
            <div className={style.userButton} title={user?.username}>{user?.username[0].toUpperCase()}</div>
        </IconButton>
    )
}

export default UserButton;
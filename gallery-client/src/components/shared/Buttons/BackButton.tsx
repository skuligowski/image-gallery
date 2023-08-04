
import IconButton, { IconButtonProps } from "./IconButton";
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC<IconButtonProps & { href: string }> = (props) => {
    const navigate = useNavigate();
    return (
        <IconButton {...props} onClick={() => navigate(props.href)}>
            <svg width="20px" height="20px" viewBox="0 0 20 20" style={{ transform: 'scale(1.1)' }}>
                <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"/>
            </svg>
        </IconButton>
    )
}

export default  BackButton;
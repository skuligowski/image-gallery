
import IconButton, { IconButtonProps } from "./IconButton";
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC<IconButtonProps & { href: string }> = (props) => {
    const navigate = useNavigate();
    return (
        <IconButton {...props} onClick={() => navigate(props.href)} >
<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 472.615 472.615">
	<g>
		<polygon points="205.783,139.662 205.783,30.525 0,236.308 205.783,442.09 205.783,332.955 472.615,332.955 472.615,139.662"/>
	</g>
</svg>
        </IconButton>
    )
}

export default  BackButton;
import IconButton, { IconButtonProps } from "./IconButton";

function openFullscreen() {
    var elem = document.documentElement as any;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

const FullScreenButton: React.FC<IconButtonProps> = (props) => {

    return (
        <IconButton {...props} onClick={() => openFullscreen()}>
            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 32 32" style={{width: '14px', height: '14px'}}>
                <g>
                    <polygon points="27.414,24.586 22.828,20 20,22.828 24.586,27.414 20,32 32,32 32,20"/>
                    <polygon points="12,0 0,0 0,12 4.586,7.414 9.129,11.953 11.957,9.125 7.414,4.586"/>
                    <polygon points="12,22.828 9.172,20 4.586,24.586 0,20 0,32 12,32 7.414,27.414"/>
                    <polygon points="32,0 20,0 24.586,4.586 20.043,9.125 22.871,11.953 27.414,7.414 32,12"/>
                </g>
            </svg>
        </IconButton>
    )
}

export default FullScreenButton;
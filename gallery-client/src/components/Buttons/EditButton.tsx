
import IconButton, { IconButtonProps } from "./IconButton";
import { useAlbum } from "../AlbumPreview/useAlbum";
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

const EditButton: React.FC<IconButtonProps> = (props) => {
    const { album } = useAlbum();
    const navigate = useNavigate();
    const openAdmin = useCallback(() => {
        navigate(album ? `/admin/albums/${album?.id}` : `/admin/albums`);
    }, [album]);
    return (
        <IconButton {...props} onClick={openAdmin}>
            <svg version="1.1" x="0px" y="0px"viewBox="0 0 512 512">
                <g>
                    <path d="M498.125,92.38l-78.505-78.506c-18.496-18.497-48.436-18.5-66.935,0C339.518,27.043,50.046,316.516,44.525,322.035
                        c-2.182,2.182-3.725,4.918-4.46,7.915L0.502,491.068c-3.036,12.368,8.186,23.44,20.431,20.432
                        c8.361-2.053,153.718-37.747,161.117-39.564c2.996-0.735,5.734-2.278,7.915-4.46c5.816-5.816,293.677-293.677,308.161-308.161
                        C516.622,140.818,516.627,110.879,498.125,92.38z M39.957,472.043l1.612-6.562l4.951,4.951L39.957,472.043z M84.874,461.014
                        l-33.887-33.887l14.736-60.009l79.16,79.16L84.874,461.014z M178.022,431.647l-97.668-97.668L332.559,81.773l97.668,97.668
                        L178.022,431.647z M474.24,135.429l-19.508,19.507l-97.667-97.668l19.507-19.507c5.294-5.293,13.867-5.298,19.163,0l78.506,78.507
                        C479.536,121.563,479.536,130.132,474.24,135.429z"/>
                </g>
            </svg>

        </IconButton>
    )
}

export default EditButton;
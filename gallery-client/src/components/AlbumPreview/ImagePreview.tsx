import style from './ImagePreview.module.scss';
import { useAlbum } from './useAlbum';
import { useNavigate } from 'react-router-dom';

const ImagePreview: React.FC = () => {
    const { album, image } = useAlbum();
    const navigate = useNavigate();
    const prevImage = () => {
        const index = album?.images.findIndex(item => item.filename === image?.filename)
        if (index !== undefined && index > -1 && album?.images[index - 1] !== undefined) {
            navigate(`${album?.permalink}/${album.images[index - 1].filename}`)
        }
    }
    const nextImage = () => {
        const index = album?.images.findIndex(item => item.filename === image?.filename);
        if (index !== undefined && index > -1 && album?.images[index + 1] !== undefined) {
            navigate(`${album?.permalink}/${album.images[index + 1].filename}`)
        }
    }
    const close = () => {
        navigate(`${album?.permalink}`)
    }
    return (
        <div className={style.container}>
            <div className={style.imageFrame}>
                <img src={`/library/${image?.url}`} />
            </div>
            <div className={style.navigation}>
                <div className={style.filename}>{album?.name} {'>'} {image?.filename}</div>
                <a className={style.close} onClick={close}>
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 512 512">
                        <g>
                            <polygon points="375.808,143.28 364.304,132.16 256.176,244.144 148.032,132.16 136.544,143.28 245.056,255.664 136.544,368.032 148.032,379.152 256.176,267.168 364.304,379.152 375.808,368.032 267.296,255.664"/>
                        </g>
                        <g>
                            <path d="M0,0v512h512V0H0z M496.032,496.032H15.968V15.968h480.064V496.032z"/>
                        </g>
                    </svg>
                </a>
                <a className={`${style.prev}`} onClick={prevImage}>
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 54 54" >
                    <g>
                        <path d="M0,0v54h54V0H0z M52,52H2V2h50V52z"/>
                        <path d="M23.707,36.293L15.414,28H40c0.552,0,1-0.447,1-1s-0.448-1-1-1H15.414l8.293-8.293l-1.414-1.414L11.586,27l10.707,10.707L23.707,36.293z"/>
                    </g>
                    </svg>
                </a>
                <a className={`${style.next}`} onClick={nextImage}>
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 54 54">
                    <g>
                        <path d="M0,0v54h54V0H0z M52,52H2V2h50V52z"/>
                        <path d="M13,28h24.586l-8.293,8.293l1.414,1.414L41.414,27L30.707,16.293l-1.414,1.414L37.586,26H13c-0.552,0-1,0.447-1,1S12.448,28,13,28z"/>
                    </g>
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default ImagePreview;
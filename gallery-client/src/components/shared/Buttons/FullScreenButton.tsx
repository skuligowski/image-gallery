import IconButton, { IconButtonProps } from './IconButton';
import { useFullscreen } from '../../../hooks/useFullscreen';

const FullScreenButton: React.FC<IconButtonProps> = (props) => {
  const { toggleFullscreen, isFullscreen } = useFullscreen();
  return (
    <IconButton {...props} onClick={toggleFullscreen}>
      {isFullscreen ? (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 32 32">
          <g>
            <polygon points="24.586,27.414 29.172,32 32,29.172 27.414,24.586 32,20 20,20 20,32" />
            <polygon points="0,12 12,12 12,0 7.414,4.586 2.875,0.043 0.047,2.871 4.586,7.414" />
            <polygon points="0,29.172 2.828,32 7.414,27.414 12,32 12,20 0,20 4.586,24.586" />
            <polygon points="20,12 32,12 27.414,7.414 31.961,2.871 29.133,0.043 24.586,4.586 20,0" />
          </g>
        </svg>
      ) : (
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 32 32" style={{ width: '13px', height: '13px' }}>
          <g>
            <polygon points="27.414,24.586 22.828,20 20,22.828 24.586,27.414 20,32 32,32 32,20" />
            <polygon points="12,0 0,0 0,12 4.586,7.414 9.129,11.953 11.957,9.125 7.414,4.586" />
            <polygon points="12,22.828 9.172,20 4.586,24.586 0,20 0,32 12,32 7.414,27.414" />
            <polygon points="32,0 20,0 24.586,4.586 20.043,9.125 22.871,11.953 27.414,7.414 32,12" />
          </g>
        </svg>
      )}
    </IconButton>
  );
};

export default FullScreenButton;

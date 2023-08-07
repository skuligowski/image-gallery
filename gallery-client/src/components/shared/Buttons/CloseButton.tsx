import IconButton, { IconButtonProps } from './IconButton';

const CloseButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <g transform="translate(-6 -6)">
          <path d="M18.695,16l6.752-6.752a1.886,1.886,0,0,0,0-2.668l-.027-.027a1.886,1.886,0,0,0-2.668,0L16,13.305,9.248,6.553a1.886,1.886,0,0,0-2.668,0l-.027.027a1.886,1.886,0,0,0,0,2.668L13.305,16,6.553,22.752a1.886,1.886,0,0,0,0,2.668l.027.027a1.886,1.886,0,0,0,2.668,0L16,18.695l6.752,6.752a1.886,1.886,0,0,0,2.668,0l.027-.027a1.886,1.886,0,0,0,0-2.668Z" />
        </g>
      </svg>
    </IconButton>
  );
};

export default CloseButton;

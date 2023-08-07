import IconButton, { IconButtonProps } from './IconButton';

const PrevButton: React.FC<IconButtonProps> = (props) => {
  return (
    <IconButton {...props}>
      <svg version="1.1" x="0px" y="0px" width="199.404px" height="199.404px" viewBox="0 0 199.404 199.404">
        <g>
          <polygon points="199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876 199.404,117.876" />
        </g>
      </svg>
    </IconButton>
  );
};

export default PrevButton;

import { CSSProperties, MouseEventHandler } from 'react';
import styles from './IconButton.module.scss';

export interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLDivElement>,
    className?: string,
    style?: CSSProperties,
}
const IconButton: React.FC<{ children: any } & IconButtonProps> = ({ children, onClick, className, style }) => {
    return (
        <div className={`${styles.button} ${className}`} onClick={onClick} style={style}>
            {children}
        </div>
    );
}

export default IconButton;
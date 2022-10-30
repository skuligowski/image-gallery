import style from './Loader.module.scss';

const Loader: React.FC = () => {
    return <div className={style.loader}></div>
}

const FullScreenLoader: React.FC = () => {
    return (
        <div className={style.fullScreenContainer}>
            <Loader />
        </div>
    );
}

const ButtonLoader: React.FC<{ className?: string }> = ({ className }) => {
    return <div className={`${style.loader} ${className} ${style.small}`}></div>
}

export { Loader, FullScreenLoader, ButtonLoader };
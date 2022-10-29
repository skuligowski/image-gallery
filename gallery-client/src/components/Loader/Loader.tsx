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

export { Loader, FullScreenLoader };
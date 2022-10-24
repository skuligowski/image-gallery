import AlbumsDirectory from "../AlbumsDirectory/AlbumsDirectory";
import style from "./SidePanel.module.scss";

const SidePanel: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.tabs}>
                <nav>
                    <div className={`${style.tab} ${style.active}`}>Albums</div>
                    <div className={style.tab}>Images</div>
                </nav>
            </div>
            <AlbumsDirectory />
        </div>
    );
}

export default SidePanel;
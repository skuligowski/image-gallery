import NavigationPanel from "../NavigationPanel/NavigationPanel";
import style from './IndexPanel.module.scss';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useEffect } from 'react';
import { resetAlbum } from "../../state/albums/albumSlice";
import { useConfig } from "../../hooks/useConfig";

const IndexPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { config } = useConfig();
    useEffect(() => {
        dispatch(resetAlbum());
    }, []);
    return (
        <div className={style.container}>
            <NavigationPanel />
            <div>
                <div className={style.image} style={{backgroundImage: `url(/library/${config?.dashboardImageUrl})`}} />
            </div>
        </div>
    );
}

export default IndexPanel;
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import style from './IndexPanel.module.scss';
import { useAppDispatch } from '../../state/hooks';
import { useEffect } from 'react';
import { resetAlbum } from "../../state/albums/albumSlice";

const IndexPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(resetAlbum());
    }, []);
    return (
        <div className={style.container}>
            <NavigationPanel />
            <div>
                Welcome
            </div>
        </div>
    );
}

export default IndexPanel;
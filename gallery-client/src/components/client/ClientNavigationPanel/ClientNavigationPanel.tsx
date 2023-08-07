import { useUser } from '../../../hooks/useUser';
import DownloadButton from '../../shared/Buttons/DownloadButton';
import EditButton from '../../shared/Buttons/EditButton';
import FullScreenButton from '../../shared/Buttons/FullScreenButton';
import SidePanelToggle from '../../shared/Buttons/SidePanelToggle';
import { NavSeparator } from '../../shared/NavigationPanel/NavSeparator';
import NavigationPanel from '../../shared/NavigationPanel/NavigationPanel';
import { useAlbum } from '../AlbumPreview/useAlbum';
import Breadcrumb from './Breadcrumb';
import style from './ClientNavigationPanel.module.scss';
import CurrentUser from './CurrentUser';
import ImageControl from './ImageControl';

const ClientNavigationPanel: React.FC = () => {
  const { user } = useUser();
  const { album, image } = useAlbum();
  return (
    <NavigationPanel
      left={
        <>
          <SidePanelToggle />
          <NavSeparator />
          <Breadcrumb />
        </>
      }
      right={
        <>
          {image ? (
            <>
              <ImageControl prevClassName={style.prevButton} nextClassName={style.nextButton} />
              <NavSeparator />
              <DownloadButton />
              <NavSeparator />
            </>
          ) : null}
          {}
          {user?.admin ? (
            <>
              <EditButton />
              <NavSeparator />
            </>
          ) : null}
          <FullScreenButton />
          {!album ? (
            <>
              <NavSeparator />
              <CurrentUser />
            </>
          ) : null}
        </>
      }
    />
  );
};

export default ClientNavigationPanel;

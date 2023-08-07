import FullScreenButton from 'src/components/shared/Buttons/FullScreenButton';
import SidePanelToggle from 'src/components/shared/Buttons/SidePanelToggle';
import { NavSeparator } from 'src/components/shared/NavigationPanel/NavSeparator';
import NavigationPanel from 'src/components/shared/NavigationPanel/NavigationPanel';

const AdminNavigationPanel: React.FC = () => {
  return (
    <NavigationPanel
      left={<SidePanelToggle />}
      right={
        <>
          <NavSeparator />
          <FullScreenButton />
        </>
      }
    />
  );
};

export default AdminNavigationPanel;

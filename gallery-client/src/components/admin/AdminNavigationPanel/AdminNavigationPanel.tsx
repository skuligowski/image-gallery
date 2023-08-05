import SidePanelToggle from "../../shared/Buttons/SidePanelToggle";
import FullScreenButton from '../../shared/Buttons/FullScreenButton';
import NavigationPanel from '../../shared/NavigationPanel/NavigationPanel';
import { NavSeparator } from "../../shared/NavigationPanel/NavSeparator";

const AdminNavigationPanel: React.FC = () => {
    return (
        <NavigationPanel
            left={
                <SidePanelToggle /> 
            }
            right={
                <>
                    <NavSeparator />
                    <FullScreenButton /> 
                </>
            }
        />
    );
}

export default AdminNavigationPanel;
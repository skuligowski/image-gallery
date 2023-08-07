import style from './NavigationPanel.module.scss';
import { useLayout } from '../../../hooks/useLayout';

const NavigationPanel: React.FC<{ left: React.ReactElement; right: React.ReactElement }> = ({ left, right }) => {
  const { sidePanel } = useLayout();
  return (
    <div className={`${style.navigation} ${sidePanel ? style.withSidePanel : ''}`}>
      <div className={style.left}>{left}</div>
      <div className={style.right}>{right}</div>
    </div>
  );
};

export default NavigationPanel;

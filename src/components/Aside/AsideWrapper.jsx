import Aside from './Aside';
import s from "./Aside.module.scss";

const Top = ({sideComponent: SideComponent}) => {
    return (
        <div className={s.wrapper}>
            <Aside/>
            <SideComponent/>
        </div>
    );
};

export default Top;
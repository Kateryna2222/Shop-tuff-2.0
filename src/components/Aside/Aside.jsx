import s from "./Aside.module.scss";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Aside = () => {

    const categories = useSelector(state => state.categories.categories)

    return (
        <aside>
            <h5>CATEGORIES</h5>
            <ul className={s.categories}>
                {
                    categories.map(({id, name}) => {
                        return (<li key={id} className={s.category}>
                            <NavLink to={`/categories/${id}`}>{name}</NavLink>
                        </li>)
                    })
                }
            </ul>
            <div className={s.more}>
                <a href="https://fakeapi.platzi.com/">Help</a>
                <a href="https://fakeapi.platzi.com/" className={s.conditions}>Terms & Conditions</a>
            </div>
        </aside>
    );
};

export default Aside;
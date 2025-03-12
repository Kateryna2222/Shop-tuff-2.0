import s from "./CategorySection.module.scss";
import { Link } from "react-router-dom";

const CategorySection = ({categories}) => {
    return (
        <section className={s.items}>
            <h4>Worth seeing</h4>
            <ul className={s.carts}>
                {
                    categories.map((category)=>{
                        return (
                            <li key={category.id} className={s.trending}>
                                <Link to={`categories/${category.id}`}>
                                    <div className={s.img}>
                                        <img src={category.image} alt="item"/>
                                    </div>
                                </Link>                     
                                <h6 className={s.title}>
                                    <Link to={`categories/${category.id}`}>
                                        {category.name} 
                                    </Link>  
                                </h6>                   
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    );
};

export default CategorySection;
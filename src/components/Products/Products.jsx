import s from "./Products.module.scss";
import Cart from "../Cart/Cart";

const Products = ({title, products=[], amount=5}) => {

    const limitedProducts = products.filter((_, i) => i < amount )

    return (
        <section className={s.items}>
            {title && <h4>{title}</h4>}
            <ul className={s.carts}>
                {limitedProducts.map((item, index) => {
                    return (
                        <Cart key={index} item={item}/>
                    );
                })}
            </ul>
            <button className={s.btn}>See more</button> 
        </section>
    );
};

export default Products;
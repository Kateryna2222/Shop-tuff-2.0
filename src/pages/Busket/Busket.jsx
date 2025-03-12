import s from './Busket.module.scss';
import CloseIcon from "../../images/close.svg"
import { Link } from "react-router-dom";
import { removeFromBusket, increaseTotal, disreaseTotal } from "../../store/busketSlice";
import { useDispatch, useSelector } from "react-redux";

const Busket = () => {

    const dispatch = useDispatch()
    const {productsInBusket, total} = useSelector(state => state.busket)

    return (
        <div className={s.busket}>
            <h3>Your cart</h3>
            <ul className={s.items}>
                {
                    productsInBusket.length === 0? <div className={s.empthy}><span>Your busket is empthy!</span></div> :
                    productsInBusket.map(product => {
                        return (
                            <li key={product.id} className={s.item}>
                                <div className={s.product}>
                                    <div className={s.img}>
                                        <img src={product.images[0] || product.image} alt="not found"/> 
                                    </div>
                                    <Link to={`/products/${product.id}`} className={s.product__title}>{product.title}</Link>
                                </div>
                                <div className={s.couner}>
                                    <button onClick={()=>dispatch(disreaseTotal(product))}
                                            disabled={product.count===1? true : false}
                                            className={product.count === 1? s.couner__disabled : s.couner__btn}>
                                    -</button>
                                    <span>{product.count}</span>
                                    <button onClick={()=>dispatch(increaseTotal(product))} className={s.couner__btn}>+</button>
                                </div>
                                <div className={s.price}>
                                    {(product.price * product.count).toFixed(2)}$ 
                                </div>
                                <button onClick={()=>dispatch(removeFromBusket(product))} className={s.delete__btn}>
                                    <img src={CloseIcon} alt="close" className={s.delete__icon} />
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div className={s.footer}>
                <div className={s.total}>
                    TOTAL PRICE: <span>{total}$</span>
                </div>
                <Link to={'/'} className={s.footer__link}>return to home</Link>
            </div>
        </div>
    );
};

export default Busket;
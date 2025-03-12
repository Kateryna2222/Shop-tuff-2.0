import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike } from "../../store/likedSlice";
import s from "./Cart.module.scss";
import { Link } from "react-router-dom";

const Cart = ({item}) => {

    
    const dispatch = useDispatch()
    const {likedProducts} = useSelector(state => state.liked)
    const isLiked = likedProducts.some(product => product.id === item.id)
    const {isUser} = useSelector(state => state.user)

    
    return (
        <li key={item.id} className={s.cart}>
            <div className={s.img}>
                <img src={item.images[1] || item.images[0] || item.image} alt="not found" className={s.image}/>
                <button onClick={()=>isUser? dispatch(toggleLike(item)) : <Navigate to='/auth'/>}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isUser && isLiked? s.liked : s.like}>
                        <path d="M3 12C0.75 9 1.5 4.5 5.25 3C9 1.5 11.25 4.5 12 6C12.75 4.5 15.75 1.5 19.5 3C23.25 4.5 23.25 9 21 12C18.75 15 12 21 12 21C12 21 5.25 15 3 12Z"
                        stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
            </div>
            <div className={s.info}>
                <Link to={`/products/${item.id}`} key={item.id}>
                    <h6 className={s.title}>{item.title}</h6>
                </Link>
                <div className={s.category}>
                    {item.category.name}
                </div>
                <div className={s.about}>
                    <div className={s.prices}>
                        <span className={s.price}>{item.price}$</span>
                        <span className={s.price_before}>{Math.floor(item.price * 1.4)}$</span>
                    </div>
                    <span className={s.purchased}>
                        {Math.floor(Math.random() * 25)} people purchased
                    </span>
                </div>
            </div>                        
        </li>
    );
};

export default Cart;
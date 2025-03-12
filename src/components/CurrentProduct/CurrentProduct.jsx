import s from './CurrentProduct.module.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getProductById, changeCurrentImg} from '../../store/productsSlice';
import { toggleLike } from '../../store/likedSlice';
import { toggleBusket } from "../../store/busketSlice";

const CurrentProduct = () => {

    const {id: currentId} = useParams()
    const {currentProduct, loading, currentImg} = useSelector(state => state.products)
    const dispatch = useDispatch()

    const sizes = [4.5, 5, 5.5]
    const [choosedSize, setChoosedSize] = useState(0);

    useEffect(()=>{
        dispatch(getProductById(currentId))
    },[dispatch,currentId])

    
    const {likedProducts} = useSelector(state => state.liked)
    const {productsInBusket} = useSelector(state => state.busket)
    const isLiked = currentProduct && likedProducts.some(product => product.id === currentProduct.id);
    const isInBusket = currentProduct && productsInBusket.some(product => product.id === currentProduct.id);

    const {isUser} = useSelector(state => state.user)

    if (loading || !currentProduct) {
        return <div>Loading...</div>;
    }


    return (
        <section className={s.current}>
            <div className={s.gallery}>
                <ul className={s.imgs}>
                    {currentProduct?.images?.map((img, i) => {
                        if(i > 4){
                            return null
                        }
                        return (
                            <li key={i} className={i === currentImg? s.imgMain : ''}>
                                <img src={img} alt="not found" onClick={() => dispatch(changeCurrentImg(i))}/>
                            </li>)
                    })}
                </ul>
            </div>
            <div className={s.info}>
                <div className={s.title}>
                    {currentProduct.title}
                </div>
                <div className={s.price}>
                    {currentProduct.price}$
                </div>
                <div className={s.color}>
                    Color: <span>Blanc</span>
                </div>
                <div className={s.size}>
                    <span>Sizes:</span>
                    <ul>
                        {
                            sizes.map((size, i) => {
                                return <li key={i}><button onClick={() => setChoosedSize(size)} className={choosedSize === size? "btn-active" : ""}>{size}</button></li>
                            })
                        }
                    </ul>
                </div>
                <div className={s.description}>
                    {currentProduct.description}
                </div>
                <div className={s.btns}>
                    <button onClick={()=>isUser && dispatch(toggleBusket({...currentProduct, count: 1}))}>
                        {isInBusket? "Remove from busket" : "Add to busket"}
                    </button>
                    <button onClick={()=>isUser && dispatch(toggleLike(currentProduct))} > 
                        Add to favorites
                    </button> 
                </div>
                <div className={s.more}>
                    <span className={s.purchased}>19 people purchased</span>
                    <Link to={'/'} className={s.purchased}>Return to store</Link>
                </div>
            </div>
        </section>
    );
};

export default CurrentProduct;
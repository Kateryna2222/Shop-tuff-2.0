import s from './Favourite.module.scss';
import { useSelector } from 'react-redux';
import Cart from '../../components/Cart/Cart'

const Favourite = () => {

    const {likedProducts} = useSelector(state => state.liked)

    return (
        <div className={s.favourite}>
            <h3>Your favourite goods</h3>
            {
                likedProducts.length === 0? <div className={s.empthy}><span>Threre are not liked items.</span></div> :
                <ul className={s.list}>
                    {
                        likedProducts.map(item => {
                            return <Cart key={item.id} className="favourite-item" item={item}/>
                        })
                    }
                </ul>
            }
        </div>
    );
};

export default Favourite;
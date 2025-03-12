import s from './CategoryPage.module.scss';
import AsideWrapper from '../../components/Aside/AsideWrapper';
import Banner from '../../components/Banners/Banner';
import Cart from '../../components/Cart/Cart';

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategoriesById } from "../../store/categoriesSlice";

const CategoryPage = () => {

    const {id: currentCategory} = useParams();
    const {categoryProducts, categoryProductsLoad, categories} = useSelector(state => state.categories);
    const dispatch = useDispatch()

    const [firstItemOnPage, setFirstItemOnPage] = useState(0);
    const [priceMin, setPriceMin] = useState('')
    const [priceMax, setPriceMax] = useState('')
    const [title, setTitle] = useState('')


    useEffect(()=>{
        dispatch(getCategoriesById(
            {
                id: currentCategory,
                offset: firstItemOnPage,
            }
        ))
    }, [dispatch, currentCategory, firstItemOnPage])


    const filter = () => {
        dispatch(getCategoriesById(
            {
                id: currentCategory,
                offset: firstItemOnPage,
                price_min: priceMin || 1,
                price_max: priceMax || 10000,
                title: title || ''
            }
        ))
    }

    const categoryName = categories.find(item => item.id === Number(currentCategory))


    return (
        <>
            <AsideWrapper sideComponent={Banner}/>
            <section className={s.category}>
                <h4 style={{paddingBottom: '30px'}}>{categoryName?.name || ''}</h4>
                <form className={s.filterProducts}>
                    <input className={s.name} type="text" placeholder="Product name" value={title}
                           onChange={(e)=>setTitle(e.target.value)}/>
                    <input className={s.price} type="number" placeholder="Price min" min={1} value={priceMin}
                           onChange={e => setPriceMin(e.target.value)}/>
                    <input className={s.price} type="number" placeholder="Price max" min={1} value={priceMax}
                           onChange={e => setPriceMax(e.target.value)}/>
                    <button type="button" onClick={()=>{filter()}}>
                        Filter
                    </button>
                </form>
                {
                    categoryProductsLoad? <div>loading</div> :  
                    (
                        categoryProducts.length === 0? <div style={{fontSize: '22px', textAlign: 'center'}}>no results</div> :
                        <ul className={s.products}>
                            {
                                categoryProducts.map(item => {
                                    return <Cart key={item.id} item={item}/>
                                })
                            }
                        </ul>
                    )
                }
                <div className={s.pagination}>
                    <button className={s.previus} 
                            disabled={firstItemOnPage === 0} 
                            onClick={()=>setFirstItemOnPage(firstItemOnPage => firstItemOnPage-10)}>
                            previous
                    </button>
                    <button className={s.next}
                            disabled={categoryProducts.length < 10} 
                            onClick={()=>setFirstItemOnPage(firstItemOnPage => firstItemOnPage+10)}>
                            next
                    </button>
                </div>
            </section>
        </>
    );
};

export default CategoryPage;
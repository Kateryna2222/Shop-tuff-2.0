import s from './Home.module.scss';

import AsideWrapper from '../../components/Aside/AsideWrapper';
import Banner from '../../components/Banners/Banner';
import Products from '../../components/Products/Products';
import CategorySection from '../../components/CategotySection/CategorySection';
import SaleBanner from '../../components/Banners/SaleBanner';

import { useDispatch, useSelector } from 'react-redux';
import {filterByPrice} from '../../store/productsSlice'
import { useEffect } from 'react';

const Home = () => {

    const {products, filteredProduct} = useSelector(state => state.products)
    const {categories} = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(products.length > 0){
            dispatch(filterByPrice(50))
        }
    },[dispatch, products.length])

    return (
        <>
            <AsideWrapper sideComponent={Banner}/>
            <Products title="Trending" products={products}/>
            <CategorySection categories={categories}/>
            <SaleBanner/> 
            <Products title="Less than 50$" products={filteredProduct}/>
        </>
    );
};

export default Home;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import AsideWrapper from '../../components/Aside/AsideWrapper';
import CurrentProduct from '../../components/CurrentProduct/CurrentProduct';
import Products from '../../components/Products/Products';
import { filterByCategory } from '../../store/productsSlice';

const ProductPage = () => {

    const dispatch = useDispatch()
    const {currentProduct, relatedProducts} = useSelector(state => state.products)

    useEffect(()=>{
        currentProduct && dispatch(filterByCategory(currentProduct.category.name))
    },[dispatch,currentProduct])


    return (
        <>
            <AsideWrapper sideComponent={CurrentProduct}/> 
            <Products title="Related products" products={relatedProducts} link={true}/> 
        </>
    );
};

export default ProductPage;
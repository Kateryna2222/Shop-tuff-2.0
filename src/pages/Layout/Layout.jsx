import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ThemeProvider from "../../context/ThemeContext";
import { loginUser, getToken } from "../../store/userSlice";
import {getProducts} from '../../store/productsSlice';
import {getCategories} from '../../store/categoriesSlice'
import { storage } from "../../storage/storage";
import { useEffect } from "react";

const Layout = () => {
    const dispatch = useDispatch()
    const token = storage.getItem('TOKEN')
    const {isToken, currentUser} = useSelector(state => state.user)

    useEffect(()=>{
        if(token){
            dispatch(loginUser(token))
        }
    },[token])
    

    useEffect(()=>{
        if(isToken){
            dispatch(getToken({ email: currentUser.email, password: currentUser.password }));
        }
    }, [isToken])


    // get products 
    useEffect(()=>{
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])
    
    

    return (
        <ThemeProvider>
            <div className="container">
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </ThemeProvider>
    );
};

export default Layout;
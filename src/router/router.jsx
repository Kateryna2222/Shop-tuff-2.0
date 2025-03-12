import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Layout from "../pages/Layout/Layout";
import ProductPage from "../pages/ProductPage/ProductPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import Home from "../pages/Home/Home";
import Authorization from "../pages/Authorization/Authorization";
import Busket from "../pages/Busket/Busket";
import Favourite from "../pages/Favourite/Favourite";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NotFound from "../pages/NotFound/NotFound";


const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/auth', element: <Authorization />},
            {path: '/products/:id', element: <ProductPage/>},
            {path: `/categories/:id`, element: <CategoryPage/>},
            {path: '/profile', element: <ProtectedRoute><ProfilePage/></ProtectedRoute>},
            {path: `/busket`,element: <ProtectedRoute><Busket/></ProtectedRoute>},
            {path: `/favourite`, element: <ProtectedRoute><Favourite/></ProtectedRoute>},
            {path: '*', element: <NotFound />},
        ]
    },
    
])

export default router;

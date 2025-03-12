import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { storage } from "../storage/storage";

const ProtectedRoute = ({children}) => {
    
    const {isUser} = useSelector(state => state.user);
    const token = storage.getItem('TOKEN')

    if(!isUser && !token){
        return <Navigate to='/auth'/>
    }

    return children
};

export default ProtectedRoute;
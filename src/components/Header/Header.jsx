import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import s from "./Header.module.scss";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../images/logo.svg';
import userIcon from '../../images/user icon.png';
import searchIcon from '../../images/search icon.svg';


const Header = () => {
    
    const busket = useSelector(state => state.busket.productsInBusket);
    const isBusketEmpthy = busket.length === 0;

    const {theme, changeTheme} = useContext(ThemeContext)
    const {isUser, currentUser} = useSelector(state => state.user)

    const currentPage = useLocation();
    const isfavourite = currentPage.pathname === '/favourite';
    const isBusket = currentPage.pathname === '/busket';

    return (
        <header className={s.header}>
            <Link to={'/'}>
                <img src={logo} alt="loco" /> 
            </Link>
            <div className={s.user}>
                <img src={userIcon} alt="user" />
                <Link to={'/profile'}>{!isUser? 'Log in' : currentUser.name}</Link>
            </div>
            <div className={s.input}>
                <img src={searchIcon} alt="Search" className={s.icon} />
                <input type="search" placeholder="Search for anything..." />
            </div>
            <div className={s.choosed}>
                <button className={s.themeColor} onClick={changeTheme}>
                    {theme === 'dark'?'light' : 'dark' }
                </button>
                <Link to='/favourite'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isfavourite? s.isOpen : s.isClose}>
                        <path d="M3 12C0.75 9 1.5 4.5 5.25 3C9 1.5 11.25 4.5 12 6C12.75 4.5 15.75 1.5 19.5 3C23.25 4.5 23.25 9 21 12C18.75 15 12 21 12 21C12 21 5.25 15 3 12Z"
                            stroke="#B8B8B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg>
                </Link>
                <Link to='/busket' className={s.busket}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={isBusket? s.isOpen  : s.isCloseBusket}>
                        <path d="M20.94 18.06L19.26 8.31C19.1453 7.47997 18.7404 6.71734 18.1172 6.15725C17.4939 5.59716 16.6926 5.27576 15.855 5.25H15.75C15.75 4.25544 15.3549 3.30161 14.6517 2.59835C13.9484 1.89509 12.9946 1.5 12 1.5C11.0055 1.5 10.0516 1.89509 9.34837 2.59835C8.64511 3.30161 8.25002 4.25544 8.25002 5.25H8.14502C7.30749 5.27576 6.50611 5.59716 5.88287 6.15725C5.25963 6.71734 4.85477 7.47997 4.74002 8.31L3.06002 18.06C2.95683 18.6256 2.97926 19.2071 3.12572 19.7631C3.27217 20.3191 3.53907 20.8361 3.90752 21.2775C4.21796 21.6565 4.60803 21.9625 5.05003 22.1738C5.49204 22.385 5.97513 22.4964 6.46502 22.5H17.535C18.0249 22.4964 18.508 22.385 18.95 22.1738C19.392 21.9625 19.7821 21.6565 20.0925 21.2775C20.461 20.8361 20.7279 20.3191 20.8743 19.7631C21.0208 19.2071 21.0432 18.6256 20.94 18.06ZM12 3C12.5968 3 13.1691 3.23705 13.591 3.65901C14.013 4.08097 14.25 4.65326 14.25 5.25H9.75002C9.75002 4.65326 9.98707 4.08097 10.409 3.65901C10.831 3.23705 11.4033 3 12 3ZM18.945 20.31C18.7755 20.522 18.5612 20.6938 18.3174 20.8131C18.0736 20.9325 17.8064 20.9963 17.535 21H6.46502C6.19362 20.9963 5.92643 20.9325 5.68263 20.8131C5.43883 20.6938 5.2245 20.522 5.05502 20.31C4.82646 20.0365 4.66149 19.7157 4.57199 19.3707C4.4825 19.0257 4.47073 18.6651 4.53752 18.315L6.21752 8.565C6.27335 8.08382 6.49737 7.63782 6.85004 7.30574C7.20271 6.97365 7.66135 6.77683 8.14502 6.75H15.855C16.3387 6.77683 16.7973 6.97365 17.15 7.30574C17.5027 7.63782 17.7267 8.08382 17.7825 8.565L19.4625 18.315C19.5293 18.6651 19.5175 19.0257 19.428 19.3707C19.3386 19.7157 19.1736 20.0365 18.945 20.31Z" 
                            fill="#B8B8B8">
                        </path>
                    </svg>
                    {(isBusketEmpthy || !isUser) || <div className={s.busket__count}>{busket.length}</div>}
                </Link>
            </div>
        </header>
    );
};

export default Header;
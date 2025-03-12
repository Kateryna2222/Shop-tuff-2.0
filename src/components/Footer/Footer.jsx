import s from "./Footer.module.scss";
import YoutubeIcon from '../../images/youtube.svg';
import FacebookIcon from '../../images/facebook.svg';
import InstagramIcon from '../../images/instagram.svg';
import logo from '../../images/logo.svg'

import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className={s.footer}>
            <Link to={'/'}>
                <img src={logo} alt="logo" />
            </Link>
            <span>
                Made by <span className={s.text}>Katya</span>
            </span>
            <div className={s.media}>
                <a href="https://fakeapi.platzi.com/" aria-label='Youtube'>
                    <img src={YoutubeIcon} alt="YoutubeIcon" className={s.media__icon}/>
                </a>
                <a href="https://fakeapi.platzi.com/" aria-label='Facebook'>
                    <img src={FacebookIcon} alt="YoutubeIcon" className={s.media__icon}/>
                </a>
                <a href="https://fakeapi.platzi.com/" aria-label='Instagram'>
                    <img src={InstagramIcon} alt="YoutubeIcon" className={s.media__icon}/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
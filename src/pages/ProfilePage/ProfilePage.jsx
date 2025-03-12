import s from './ProfilePage.module.scss';
import Profile from '../../components/Profile/Profile';
import AsideWrapper from '../../components/Aside/AsideWrapper';

const ProfilePage = () => {
    return (
        <AsideWrapper sideComponent={Profile} />
    );
};

export default ProfilePage;
import s from './Profile.module.scss';

import { useDispatch, useSelector } from "react-redux";
import { logOut, updateUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { emailRegex } from "../../utils/constants";

const Profile = () => {


    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user)

    const [values, setValues] = useState({
        name: currentUser.name,
        email: currentUser.email
    })

    const handleValues = (e, key)=>{
        setValues({...values, [key]: e.target.value});
    }


    return (
        <section className={s.profile}>
            <form>
                <div className={s.items}>
                    <div className={s.item}>
                        <label>Name:</label>
                        <input type="text" placeholder="Your name" value={values.name} onChange={e => handleValues(e, 'name')}/>
                        {values.name && values.name.length === 0 && <p className={s.authError}>* Name can't be empty</p>}
                    </div>
                    <div className={s.item}>
                        <label>Email:</label>
                        <input type="email" placeholder="Your email" value={values.email} onChange={e => handleValues(e, 'email')}/>
                        {!emailRegex.test(values.email) && <p className={s.authError}> * incorrect email format</p>}
                    </div>
                </div>
                <div className={s.btns}>
                    <button disabled={values.name && values.name.length === 0}  onClick={(e)=>{
                        dispatch(updateUser({id: currentUser.id, upadateValues: values}))
                        e.preventDefault()}}>
                            Confirm changes
                    </button>
                    <Link to='/' onClick={()=>{dispatch(logOut())}} className={s.logout}>Log out</Link>
                </div>
            </form>
        </section>
    );
};

export default Profile;
import { useState } from 'react';
import s from './Authorization.module.scss'
import log from './Login.module.scss'
import register from './Registration.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getToken } from '../../store/userSlice';
import { useNavigate } from 'react-router';

const Authorization = () => {

    const [isLogin, setIsLogin] = useState(true)

    const handleForm = ()=>{
        setIsLogin(!isLogin)
    }

    const handleStyle = (className) => {
        return isLogin? log[className] : register[className]
    }

    const handleSingleStyle = (className, login=true) => {
        if(login){
            return isLogin? log[className] : ''
        }
        else{
            return !isLogin? register[className] : ''
        }
    }

    // values
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: "https://api.lorem.space/image/face?w=150&h=220"
    })

    const handleValues = (e, key) => {
        setValues({...values, [key]: e.target.value});
    };

    // work with state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(createUser(values));
        navigate('/')
    }


    const {authError} = useSelector(state => state.user);
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(getToken({ email: values.email, password: values.password }));

        if(!authError){
            navigate('/')
        }
    }
    

    return (
        <div className={s.container}>
            <div className={`${s.formBox} ${handleStyle('fb')} ${s.login} ${handleSingleStyle('l')}`}>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className={s.inputs}>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required  
                            value={values.email}  
                            onChange={(e)=>handleValues(e, 'email')}/>
                        <input 
                            type="password" 
                            placeholder='Password'
                            required 
                            value={values.password}  
                            onChange={(e)=>handleValues(e, 'password')}/>
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>

            <div className={`${s.formBox} ${handleStyle('fb')} ${s.registration}  ${handleSingleStyle('r')}`}>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className={s.inputs}>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            required  
                            value={values.name}  
                            onChange={(e)=>handleValues(e, 'name')}/>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            required  
                            value={values.email}  
                            onChange={(e)=>handleValues(e, 'email')}/>
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required  
                            value={values.password}  
                            onChange={(e)=>handleValues(e, 'password')}/>
                    </div>
                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>

            <div className={`${s.toggleBox}  ${handleStyle('tb')}`}>
                <div className={`${s.togglePanel} ${handleStyle('tp')} ${s.toggleLeft} ${handleSingleStyle('tl', false)}`}>
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an account?</p>
                    <button onClick={handleForm}>
                        Register
                    </button>
                </div>

                <div className={`${s.togglePanel} ${handleStyle('tp')} ${s.toggleRight} ${handleSingleStyle('tr')}`}>
                    <h1>Welcome Back!</h1>
                    <p>Already have an account?</p>
                    <button onClick={handleForm}>
                        Login
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Authorization;
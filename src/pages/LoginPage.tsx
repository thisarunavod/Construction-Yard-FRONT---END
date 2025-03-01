import {useNavigate} from "react-router";
import {HomePage} from "./HomePage.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useEffect, useState} from "react";
import {loginUser} from "../reducers/userReducer.ts";

export function LoginPage() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const securityTokens  = useSelector((state: RootState) => state.user.securityTokens)
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token && securityTokens ) {
            navigate('/YardSystem');
        }
    },[navigate,securityTokens]);

    function handleLogin(e) {
        e.preventDefault()
        const loginDetails = { username: username, password: password };
        dispatch(loginUser(loginDetails))
    }

    return (
        <div className='flex w-full h-screen'>
            <div className='w-full flex items-center justify-center  bg-slate-100'>
                <form  className=' bg-white px-10 py-20 rounded-3xl border-1'>
                    <h1 className='text-4xl text-cyan-500 font font-semibold'>Welcome Yard System</h1>
                    <h1 className='font-medium text-lg text-gray-500 mt-4'>Welcome Back! Please enter your
                        credentials</h1>
                    <div className='mt-8'>
                        <div>
                            <label className='text-lg font-medium'>Username</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent '
                                type='text'
                                placeholder='Enter Your Username'
                                required
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-lg font-medium'>Password</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent '
                                type='password'
                                placeholder='Enter Your Password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/*<div className='mt-8 flex justify-between'>
                            <div className={''}>
                                <input type="checkbox"/>
                                <label className='mt-2 font-medium  text-base'>Remember for 30 days</label>
                            </div>
                            <button className='font-medium text-base text-blue-500'>
                                Forgot password
                            </button>
                        </div>*/}
                        <div className='mt-6 flex flex-col gap-y-3'>
                            <button
                                type={'button'}
                                className=' active:scale-[.95] active:duration-75 hover:scale-[1.01] ease-in-out hover:bg-blue-700  transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'
                                onClick={(e)=>handleLogin(e)}
                            >Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
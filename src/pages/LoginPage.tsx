import {useNavigate} from "react-router";
import {HomePage} from "./HomePage.tsx";

export function LoginPage() {
    const navigate = useNavigate();
    function handleLogin() {
        navigate('/YardSystem');
    }


    return (
        <div className='flex w-full h-screen'>
            <div className='w-full flex items-center justify-center  bg-slate-100'>
                <form className=' bg-white px-10 py-20 rounded-3xl border-1'>
                    <h1 className='text-4xl text-cyan-500 font font-semibold'>Welcome Yard System</h1>
                    <h1 className='font-medium text-lg text-gray-500 mt-4'>Welcome Back! Please enter your
                        credentials</h1>
                    <div className='mt-8'>
                        <div>
                            <label className='text-lg font-medium'>Email</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent '
                                type='email'
                                placeholder='Enter Your Email'
                                // required
                            />
                        </div>
                        <div className='mt-2'>
                            <label className='text-lg font-medium'>Password</label>
                            <input
                                className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent '
                                type='password'
                                placeholder='Enter Your Password'
                                // required
                            />
                        </div>
                        <div className='mt-8 flex justify-between'>
                            <div className={''}>
                                <input type="checkbox"/>
                                <label className='mt-2 font-medium  text-base'>Remember for 30 days</label>
                            </div>
                            <button className='font-medium text-base text-blue-500'>
                                Forgot password
                            </button>
                        </div>
                        <div className='mt-6 flex flex-col gap-y-3'>
                            <button
                                className=' active:scale-[.95] active:duration-75 hover:scale-[1.01] ease-in-out hover:bg-blue-700  transition-all py-3 rounded-xl bg-blue-500 text-white text-lg font-bold'
                                onClick={handleLogin}
                            >Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
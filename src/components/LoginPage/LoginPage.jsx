import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { googleLogin, loginUser } = useContext(AuthContext)

    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const navigate = useNavigate();



    const onSubmit = (data) => {
        // console.log(data);
        setError("");


        if ((data.email, data.password)) {
            loginUser(data.email, data.password)
                .then((result) => {
                    console.log(result.user);
                    navigate(from, { replace: true });
                })
                .catch((error) => {
                    console.log(error.message);
                    setError(error.message);
                });
        }






    };

    const googleLogins = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                console.log(user);
                const savedUser = { name: user.displayName, email: user.email, image: user.photoURL,role:'student' }
                fetch("https://server-nine-theta-40.vercel.app/users", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {

                    })


                navigate(from, { replace: true });
            })
            .catch((error) => console.log(error.message));
    };


    return (
        <div className="flex flex-col items-center justify-center  p-20  bg-gray-100 " style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.DrLmd_mojng-3K_Rcz6heQHaE8?pid=ImgDet&rs=1')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <h1 className="text-4xl font-bold mb-8 text-white">Login</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Email is required' })}
                        className="appearance-none border rounded w-full  p-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-white font-bold mb-2">
                        Password
                    </label>
                    <input
                        type={`${showPassword?'text':'password'}`}
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                        className="appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button className='absolute right-3 bottom-2' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'} 
                    </button>
                    <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-600"
                        onClick={(e) => {
                            const input = e.target.closest('div').querySelector('input');
                            input.type = input.type === 'password' ? 'text' : 'password';
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-eye"
                        >
                            <path d="M22 12s-2-3.6-10-3.6S2 12 2 12s2 3.6 10 3.6S22 12 22 12zm-10 1.2a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>

                <p className='text-red-600 py-4'>{error}</p>
                <button
                    type="submit"
                    className="bg-gray-700 w-full p-3 hover:bg-gray-500 text-white font-bold  rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
            </form>
            <p className="mt-4 text-white">
                Don't have an account? <a href="/register" className="text-blue-500">Register here</a>
            </p>
            <div className="mt-4">
                <p className=" mb-2 text-white">Or sign in with:</p>
                <div>
                    {/* Add social login buttons here */}

                    <button onClick={googleLogins} className="bg-gray-200 hover:bg-gray-500 border-2 border-gray-700 text-gray-700 hover:text-gray-200 hover:border-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

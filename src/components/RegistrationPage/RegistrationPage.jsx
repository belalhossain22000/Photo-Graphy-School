
import { useContext, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegistrationPage() {
    const methods = useForm();
    const { register, handleSubmit, formState: { errors } } = methods;
    const watchPassword = useWatch({ control: methods.control, name: 'password' });
    const { registerUser, auth, googleLogin } = useContext(AuthContext)
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const onSubmit = (data) => {

        if (data.password.length < 6) {
            setError('Password is too short; it should be at least 6 characters');
            return;
        }

        if (!/[A-Z]/.test(data.password)) {
            setError('Password must contain at least one capital letter');
            return;
        }

        if (!/[!@#$%^&*]/.test(data.password)) {
            setError('Password must contain at least one special character (!@#$%^&*)');
            return;
        }


        if ((data.name, data.email, data.password)) {
            registerUser(data.email, data.password)
                .then((result) => {
                    updateProfile(auth.currentUser, {
                        displayName: data.name,
                        photoURL: data.photoURL,
                    })
                        .then(() => {
                            const savedUser = { email: data.email, name: data.name, image: data.photoURL,role:'student' }

                            fetch(`https://server-nine-theta-40.vercel.app/users`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(savedUser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                    Swal.fire({
                                        position: 'top-center',
                                        icon: 'success',
                                        title: 'Your Create successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                    // navigate("/")
                                    // alert('user updated successfully and saved successfully')
                                })

                        })
                        .catch((error) => {
                            setError(error.message)
                            console.log(error.message)
                        });

                    console.log(result.user);
                    navigate("/login");

                })
                .catch((err) => {
                    console.log(err.message);
                    setError(err.message);
                });
        }


        // console.log(data);
    };

    //google login

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
        <FormProvider {...methods}>
            <div className="flex flex-col items-center justify-center p-20 " style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.GbMboU-krQvdIrfKgWpzXgHaFj?pid=ImgDet&rs=1')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                <h1 className="text-3xl font-bold mb-8">Registration</h1>
                <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) =>
                                    value === watchPassword || 'Passwords do not match',
                            })}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-500">{errors.confirmPassword.message}</span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photoURL" className="block text-gray-700 font-bold mb-2">
                            Photo URL
                        </label>
                        <input
                            type="text"
                            id="photoURL"
                            {...register('photoURL')}
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <p className="mb-5  ms-4 text-red-600 ">
                        {error}
                    </p>
                    <button
                        type="submit"
                        className="bg-gray-700 w-full p-3 hover:bg-gray-500 text-white font-bold  rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4">
                    Already have an account? <a href="/login" className="text-blue-700">Login here</a>
                </p>
                <div className="mt-4">
                    <p className="text-gray-700 mb-2">Or sign up with:</p>
                    <div>
                        {/* Add social login buttons here */}
                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                            Facebook
                        </button> */}
                        <button onClick={googleLogins} className="bg-gray-200 hover:bg-gray-500 border-2 border-gray-700 text-gray-700 hover:text-gray-200 hover:border-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}

export default RegistrationPage;

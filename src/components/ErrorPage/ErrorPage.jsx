import React from 'react';
import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className='text-center' id="error-page">
            <img className='h-[80vh] w-full' src="https://th.bing.com/th/id/R.c98045cd667447def428ad9b261c0ef4?rik=y8ioZ%2bsKto28oQ&pid=ImgRaw&r=0" alt="" />
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link className='bg-red-500 p-2 font-semibold rounded-md ' to="/"><button>Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;
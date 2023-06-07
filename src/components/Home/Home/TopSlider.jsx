import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import './TopSlider.css'
import { Parallax } from 'react-parallax';


SwiperCore.use([Navigation, Pagination]);

const TopSlider = () => {
    return (
        <div className='py-8 my-8'>
            <Swiper
                navigation
                pagination={{ clickable: true }}
                className="swiper-container"
            >
                <SwiperSlide>
                    <div className="hero min-h-screen flex items-center justify-center">
                        <div
                            className="hero-overlay bg-opacity-60 absolute inset-0"
                            style={{
                                backgroundImage:
                                    'url(https://img.freepik.com/free-photo/black-female-photographer-making-photos-modern-architecture_273443-2000.jpg?w=740&t=st=1686131823~exp=1686132423~hmac=c76c37da4f3c21aa5487fa600940a74d42ae2fee934d5cb7cb7553929390f613)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}


                        >

                            <div className="hero-content text-center text-neutral-content flex justify-center items-center mt-[20%]">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                                    <p className="mb-5">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti
                                        eaque aut repudiandae et a id nisi.
                                    </p>
                                    <button className="btn btn-primary">Get Started</button>
                                </div>
                            </div>
                        </div>

                    </div>


                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero min-h-screen flex items-center justify-center">
                        <div
                            className="hero-overlay bg-fixed bg-opacity-60 absolute inset-0"
                            style={{
                                backgroundImage:
                                    'url(https://img.freepik.com/free-photo/black-female-photographer-making-photos-modern-architecture_273443-2000.jpg?w=740&t=st=1686131823~exp=1686132423~hmac=c76c37da4f3c21aa5487fa600940a74d42ae2fee934d5cb7cb7553929390f613)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >

                            <div className="hero-content text-center text-neutral-content flex justify-center items-center mt-[20%]">
                                <div className="max-w-md">
                                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                                    <p className="mb-5">
                                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti
                                        eaque aut repudiandae et a id nisi.
                                    </p>
                                    <button className="btn btn-primary">Get Started</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </SwiperSlide>
                {/* Add more SwiperSlide components for additional slides */}
            </Swiper>
        </div>
    );
};

export default TopSlider;

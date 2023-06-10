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
                    <div className="hero min-h-screen flex items-center justify-center ">
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

                            <div className="hero-content absolute bottom-0 h-[100vh] w-full bg-gray-500 p-10  opacity-70 text-center text-neutral-content flex justify-center items-center mt-[20%]">
                                <div className="max-w-md">
                                    <h1 className="text-4xl text-white font-bold mb-6">Welcome to Photography School</h1>
                                    <h2 className="text-3xl text-white font-semibold mb-4">Unlock Your Creativity</h2>
                                    <p className="text-white mb-8">
                                        At Photography School, we believe in the power of photography to capture moments, tell stories,
                                        and express creativity. Our goal is to provide a supportive and inspiring learning environment
                                        where students can develop their photography skills and unleash their artistic vision.
                                    </p>
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
                                    'url(https://img.freepik.com/free-photo/female-photographer-blurred-models_23-2148565543.jpg?w=740&t=st=1686385579~exp=1686386179~hmac=aee2d7a79d3ccbdd480999f1df65b977c6eb33649f413c6b4b630bed1f5cddc8)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >

                            <div className="hero-content h-[100vh] absolute bottom-0 w-full bg-gray-500 p-10  opacity-70 text-center text-neutral-content flex justify-center items-center mt-[20%]">
                                <div className="max-w-md">
                                    <h2 className="text-4xl text-white font-semibold mb-4">Learn from Experts</h2>
                                    <p className="text-white mb-8">
                                        Our photography instructors are experienced professionals who are passionate about teaching and
                                        sharing their knowledge. They will guide you through various photography techniques, lighting,
                                        composition, and post-processing, helping you enhance your skills and achieve your artistic goals.
                                    </p>
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
                                    'url(https://img.freepik.com/premium-photo/watercolors-color-pencils-sketchbook-wooden-table-flat-lay-photo-with-empty-space-logo-text_77211-1690.jpg?w=740)',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        >

                            <div className="hero-content h-[100vh] absolute bottom-0 w-full bg-gray-500 p-10  opacity-70  text-center text-neutral-content flex justify-center items-center mt-[20%]">
                                <div className="max-w-md">
                                    <h2 className="text-4xl text-white font-semibold mb-4">Join Our Community</h2>
                                    <p className="text-white mb-8">
                                        Photography School is more than just a place to learn photography. It's a vibrant community of
                                        photography enthusiasts who come together to inspire, support, and collaborate. Connect with fellow
                                        students, participate in workshops and photo walks, and showcase your work in our student galleries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default TopSlider;

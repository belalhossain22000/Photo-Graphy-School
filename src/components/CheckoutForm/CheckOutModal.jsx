import React, { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useGetData from '../../hooks/useGetData';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(`${import.meta.env.VITE_payment_gateway_pk}`);


const CheckOutModal = () => {
    const { user } = useContext(AuthContext)
    const { data, isLoading, error } = useGetData(`https://server-nine-theta-40.vercel.app/selectedClasses/${user?.email}`);
    const { id } = useParams()
    const filteredData = data.filter((item) => item._id == id)
    // console.log(filteredData[0]?.selectedClasses
    // )
    const bookingInfo = filteredData[0]?.selectedClasses || {};
    const { price } = filteredData[0]?.selectedClasses || {};
    const modalRef = useRef(null);

    const handleClose = () => {
        modalRef.current.close();
    };


    return (
        <div>
            <h1>are you ready to payment</h1>
            {/* Open the modal using ID.showModal() method */}
            <button className="btn" onClick={() => window.my_modal_1.showModal()}>Payment ${price}</button>
            <dialog id="my_modal_1" className="modal">
                <div method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} bookingInfo={bookingInfo} />
                    </Elements>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={handleClose} className="btn">Close</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CheckOutModal;
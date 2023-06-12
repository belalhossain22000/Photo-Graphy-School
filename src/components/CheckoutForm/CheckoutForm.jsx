import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckOutForm.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price, bookingInfo }) => {
  // const {user}=useContext(AuthContext)
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate= useNavigate()

  useEffect(() => {
    let isMounted = true;

    const getClientSecret = async () => {
      if (price) {
        try {
          const response = await axios.post("http://localhost:5000/create-payment-intent", { price });
          if (isMounted) {
            setClientSecret(response.data.clientSecret);
          }
        } catch (error) {
          console.error("Error fetching client secret:", error);
          // Display error message to the user
        }
      }
    };

    getClientSecret();

    return () => {
      isMounted = false;
    };
  }, [price]);
  console.log(clientSecret)


  //handle payment 
  const handlePayment = async (itemId) => {
    console.log(itemId)

    try {
      const response = await fetch(`http://localhost:5000/makePayment/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ itemId })
      });

      if (response.ok) {

        console.log('Payment successful');
        alert('updated successful');
      } else {
        console.log('Payment failed');
        alert('updated failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }

  };

  //handle delete
  const handleDelete = async (itemId) => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Delete successfully',
      showConfirmButton: false,
      timer: 1500
    })

    try {
      await axios.delete(`http://localhost:5000/selectedClasses/${user?.email}/${itemId}`);
     
    } catch (error) {
      console.error(error);
    }
  };





  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    try {
      setIsLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.log('[error]', error);
        // Display error message to the user
        return;
      }

      console.log('[PaymentMethod]', paymentMethod);

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              email: user?.email || 'unknown',
              name: user?.displayName || 'anonymous',
            },
          },
        },
      );

      if (confirmError) {
        console.log('[confirmError]', confirmError);
        // Display error message to the user
      } else {
        console.log('[PaymentIntent]', paymentIntent);
        // Payment succeeded, handle success scenario
        window.alert('Payment successful!');

        //-------------------

        if (paymentIntent.status === 'succeeded') {
          const paymentInfo = {
            ...bookingInfo,
            transactionId: paymentIntent.id,
            date: new Date()
          }

          axios.post("http://localhost:5000/save-payment-history", paymentInfo).then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              handlePayment(bookingInfo._id)
              handleDelete(bookingInfo._id)
              navigate("/")
            }
          })



        }
      }
    } catch (error) {
      console.error('[Payment Error]', error);
      // Display error message to the user
    } finally {
      setIsLoading(false);
    }
  };


  // const itemid=bookingInfo._id;

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;


import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckOutForm.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useState } from 'react';
import axios from 'axios';

const CheckoutForm = ({ price }) => {
  console.log(price)
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('')
  const { user } = useContext(AuthContext)
  useEffect(() => {
    let isMounted = true;

    const getClientSecret = async () => {
      if (price) {
        try {
          const response = await axios.post("https://server-nine-theta-40.vercel.app//create-payment-intent", { price });
          if (isMounted) {
            setClientSecret(response.data.clientSecret);
          }
        } catch (error) {
          console.error("Error fetching client secret:", error);
        }
      }
    };

    getClientSecret();

    return () => {
      isMounted = false;
    };
  }, [price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous'
          },
        },
      },
    );

  };

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
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";


const CheckoutForm = ({universities}) => {
    const {_id,applicationFees,universityName} = universities
    console.log(_id)
    const elements = useElements()
    const stripe = useStripe()
    const [err, setErr] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const [transaction, setTransaction ] = useState('')
    useEffect(() => {
        if(applicationFees > 0) {
        axiosSecure.post('/create-payment-intent',{
            price: parseInt(applicationFees)
        })
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
        }
    },[axiosSecure,applicationFees])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if(card === null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setErr(error.message)
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
          }
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: card,
                billing_details: {
                    name: `${user?.displayName}` || 'batpar',
                    email: `${user?.email}` || 'batpar',
                }
            }
          }) 
          if(confirmError) {
            setErr(confirmError.message)
            console.log(confirmError)
          } else {
            console.log(paymentIntent)
            if(paymentIntent === "succeeded"){
                console.log('payment tranction id',paymentIntent.id)
                setTransaction(paymentIntent.id)
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    transactionId: paymentIntent.id,
                    price: applicationFees,
                    date: new Date(),
                    universityId: _id,
                    universityName: universityName,
                    status: 'pending'
                }
            }
          }

    }
    return (
        <form onSubmit={handleSubmit} className="max-w-[300px] mt-48 mx-auto h-screen">
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
        <button className="btn bg-blue-500 text-white w-[80px] mt-3" type="submit" disabled={!stripe}>
          Pay
        </button>
        <p className="text-red-200">{err}</p>
      </form>
    );
};

export default CheckoutForm;
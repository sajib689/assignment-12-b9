import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STIRPE_API_KEY);

const Payment = () => {
    const universities = useLoaderData()
    return (
        <Elements stripe={stripePromise}>
        <CheckoutForm universities={universities}/>
      </Elements>
    );
};

export default Payment;
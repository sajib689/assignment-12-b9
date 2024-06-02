import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STIRPE_API_KEY);
console.log(stripePromise)
const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
};

export default Payment;
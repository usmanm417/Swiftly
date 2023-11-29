import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise;

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_test_51OHeJYI4McseYPWyvnJuy6XAPB2GkpWzaMC2bE2QuNGhqyurMqEXSf5QxSCQl64hlNM5lIqvsswlYhWT4cHoo4lB00x9CAq1Ws"
        );
    }
    console.log(stripePromise);
    return stripePromise;
};

export default initializeStripe;

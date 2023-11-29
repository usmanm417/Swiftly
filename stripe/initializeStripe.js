import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise;

let key = 'sk_test_51OHeJYI4McseYPWyBGES5KfQAJgw3b2PfkGnq4SOc3ILaBKEcCMkcSZGnz0UHmjffeaSCrc8nPW3sZsuGmwn5bzY00YiYc6BAF'

const initializeStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe( key );
    }
    console.log(stripePromise);
    return stripePromise;
};

export default initializeStripe;

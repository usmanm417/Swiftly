import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise;

const initializeStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            "sk_test_51OHeJYI4McseYPWyBGES5KfQAJgw3b2PfkGnq4SOc3ILaBKEcCMkcSZGnz0UHmjffeaSCrc8nPW3sZsuGmwn5bzY00YiYc6BAF"
        );
    }
    console.log(stripePromise);
    return stripePromise;
};

export default initializeStripe;

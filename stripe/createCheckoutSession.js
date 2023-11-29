import getStripe from "./initializeStripe";
import { getFirestore, collection, query, where, getDocs, doc, addDoc, onSnapshot } from 'firebase/firestore';
import app from "../config";

export async function createCheckoutSession(uid) {
    console.log('hi');
    const db = getFirestore(app);
    const usersCollection = collection(db, 'users');
    const userdoc = doc(usersCollection, uid);
    const checkoutCollection = collection(userdoc, 'checkout_sessions');

    try {
        const checkoutSessionRef = await addDoc(checkoutCollection, {
            mode: 'payment',
            line_items: [
                {
                    price: 'price_1OHeaXI4McseYPWyFZ7OJf0X',
                    quantity: 1,
                },
            ],
            success_url: 'https://www.google.com',
            cancel_url: 'https://www.google.com',
        });

        // Listen for changes to the newly created document
        onSnapshot(doc(db, checkoutCollection.path, checkoutSessionRef.id), async (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log(data);
                if (data && data.sessionId) {
                    const stripe = await getStripe();
                    const result = stripe.redirectToCheckout({ sessionId: data.sessionId });
                } 
            } else {
                console.log("No such document!");
            }
        });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
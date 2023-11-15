import React, { createContext, useState, useContext } from 'react';

const PaymentMethodsContext = createContext();

export const usePaymentMethods = () => useContext(PaymentMethodsContext);

export const PaymentMethodProvider = ({ children }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);

    return (
        <PaymentMethodsContext.Provider value={{ paymentMethods, setPaymentMethods }}>
            {children}
        </PaymentMethodsContext.Provider>
    );
};
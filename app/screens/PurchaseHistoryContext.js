import React, { createContext, useContext, useState } from 'react';

const PurchaseHistoryContext = createContext();

export const usePurchaseHistory = () => useContext(PurchaseHistoryContext);

export const PurchaseHistoryProvider = ({ children }) => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const addPurchase = (purchase) => {
        setPurchaseHistory([...purchaseHistory, purchase]);
    };

    return (
        <PurchaseHistoryContext.Provider value={{ purchaseHistory, addPurchase }}>
            {children}
        </PurchaseHistoryContext.Provider>
    );
};
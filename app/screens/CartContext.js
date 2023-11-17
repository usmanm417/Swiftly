import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    return (
        <CartContext.Provider value={{ cartData, setCartData }}>
            {children}
        </CartContext.Provider>
    );
};

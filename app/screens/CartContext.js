import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    const addCartItem = (item) => {
        setCartData([...cartData, item]);
    };

    const removeCartItem = (index) => {
        const newCartData = cartData.filter((_, i) => i !== index);
        setCartData(newCartData);
    };

    return (
        <CartContext.Provider value={{ cartData, addCartItem, removeCartItem }}>
            {children}
        </CartContext.Provider>
    );
};
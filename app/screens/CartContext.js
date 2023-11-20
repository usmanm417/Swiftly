import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);
    const [total, setTotal] = useState(0);
    const [itemDetails, setItemDetails] = useState({}); // New state for item details

    const updateTotal = () => {
        const newTotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(newTotal);
    };

    useEffect(() => {
        updateTotal();
    }, [cartData]);

    const addCartItem = (item) => {
        const existingItemIndex = cartData.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex >= 0) {
            const newCartData = [...cartData];
            newCartData[existingItemIndex].quantity += item.quantity;
            setCartData(newCartData);
        } else {
            setCartData([...cartData, item]);
        }
        updateTotal(); // Update total after adding item
    };

    const removeCartItem = (index) => {
        const newCartData = cartData.filter((_, i) => i !== index);
        setCartData(newCartData);
        updateTotal(); // Update total after removing item
    };

    const updateCartData = (index, newQuantity) => {
        const newCartData = [...cartData];
        newCartData[index].quantity = newQuantity;
        setCartData(newCartData);
    };

    const updateItemDetails = (details) => {
        setItemDetails(details);
    };

    // Function to clear item details
    const clearItemDetails = () => {
        setItemDetails({});
    };

    return (
        <CartContext.Provider value={{ cartData, addCartItem, removeCartItem, total, itemDetails, updateItemDetails, clearItemDetails }}>
            {children}
        </CartContext.Provider>
    );
};
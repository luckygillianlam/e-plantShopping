import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        //Initialize a variable total to hold the cumulative sum
        let totalCost = 0;
        
        //Iterate over the cart array using cart.forEach()
        cart.forEach((item) => {
            //For each item, extract its quantity and cost
            const qty = item.quantity;
            //Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1)), then multiply it by the quantity
            const price = parseFloat(item.cost.substring(1));
            const subtotal = qty * price;
            //Add the resulting value to total.
            totalCost = totalCost + subtotal;
        });
        
        //After processing all items, return the final total sum.
        return totalCost;
    };

    const handleContinueShopping = (e) => {
        //call the onContinueShopping(e) function passed from the parent component
        onContinueShopping(e);
    };
    
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    const handleIncrement = (item) => {
        //Dispatch the updateQuantity() reducer in the CartSlice.jsx file. In the function argument, add one to the item.quantity value
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        //If the item's quantity is greater than 1, dispatch updateQuantity to decrease the quantity by 1
        //Else if the quantity would drop to 0, dispatch the removeItem action to remove the plant type from the cart.
        if (item.quantity > 0) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else if (item.quantity === 0) {
            dispatch(removeItem({ name: item.name}));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem({ name: item.name}));
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        //Calculate the total cost for an item by multiplying its quantity with its unit price in the calculateTotalCost() function
        //Extract the numeric value from the item's cost string using parseFloat(item.cost.substring(1)) before performing the multiplication
        return item.quantity * parseFloat(item.cost.substring(1));
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;



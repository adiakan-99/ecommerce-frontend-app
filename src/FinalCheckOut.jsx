import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import { deleteCart, deleteDeliveryAddress } from './Redux';

const FinalCheckOut = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, cart, address } = useSelector((result) => result);

    const makePayment = () => {
        const authToken = localStorage.getItem("authToken");

        Axios.post("https://ecommerce-application-back-end.onrender.com/create/order", {
            amount: props.totalCost
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((result) => {
            handlePayment(result.data.output);
        });
    };

    const handlePayment = (receivedData) => {
        const authToken = localStorage.getItem("authToken")

        const options = {
            key: "rzp_test_tQU9lVNtUvQtjs",
            amount: receivedData.amount,
            currency: receivedData.currency,
            name: user.username,
            description: "Product Order",
            order_id: receivedData.id,
            handler: async function (output) {
                Axios.post("https://ecommerce-application-back-end.onrender.com/insert/order", {
                    username: options.name,
                    amount: options.amount / 100,
                    order_id: output.razorpay_order_id,
                    payment_id: output.razorpay_payment_id,
                    products: cart.cartData.map(({ id, title, image, quantity, price }) => ({
                        id,
                        title,
                        image,
                        quantity,
                        totalPrice: price * quantity * 80
                    })),
                    address
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                })
                .then((response) => {
                    if (response.data.message === "Your order was successfully placed!") {
                        dispatch(deleteCart());
                        dispatch(deleteDeliveryAddress());
                        navigate("/orders");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        };

        new window.Razorpay(options).open();
    };

    return (
        <div className="container mx-auto mt-10 p-6 pt-20 bg-white shadow-lg rounded-lg">
            <h2 style={{ color: "red", fontStyle: "italic", fontSize: "15px" }}>*Please do not refresh the page</h2>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Delivery Address</h2>
            <div className="border-b pb-4 mb-6 text-gray-600">
                <p>{address.addressline}, {address.city}, {address.state} - {address.pincode}</p>
                <p>Phone Number: {address.phonenumber}</p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order Summary</h2>
            <div className="space-y-4">
                {cart.cartData.map((product, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg">
                        <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded mr-4"/>
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{product.title}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total Price: ₹{(product.price * 80 * product.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t pt-4">
                <h2 className="text-2xl font-semibold text-gray-800">Total Amount to pay: ₹{props.totalCost}</h2>
            </div>

            <div className="flex justify-between mt-6">
                <button 
                    onClick={() => navigate("/cart")} 
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                    Edit Order or Address
                </button>
                <button 
                    onClick={makePayment} 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Confirm and Pay
                </button>
            </div>
        </div>
    );
};

export default FinalCheckOut;

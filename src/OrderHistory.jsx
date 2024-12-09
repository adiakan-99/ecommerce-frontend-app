import React from 'react';
import { useSelector } from 'react-redux';
import Axios from "axios";

const OrderHistory = () => {
  const { username } = useSelector((result) => result.user);
  const [orderHistory, setOrderHistory] = React.useState([]);

  const currentDate = new Date();

  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken")

    Axios.get(`https://ecommerce-application-back-end.onrender.com/get/orders/${username}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((response) => {
        if (response.data.message === "Your order history") {
          setOrderHistory(response.data.orderHistory);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteOrder = (receivedOrderID) => {
    const authToken = localStorage.getItem("authToken")
    Axios.delete(`https://ecommerce-application-back-end.onrender.com/delete/order/${receivedOrderID}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then((response) => {
        if (response.data.message === "Order Deleted!") {
          alert("Your order is deleted!");
          setOrderHistory(orderHistory.filter(order => order.orderID !== receivedOrderID));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto mt-10 p-6 pt-20 bg-white shadow-lg rounded-lg">
      {orderHistory.length === 0 ? (
        <h2 className="text-center text-gray-700 text-xl">No Orders to View</h2>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Order History</h2>
          {orderHistory.map((orders) => {
            const expectedDeliveryDate = new Date(orders.expectedDeliveryDate);
            const returnDeadline = new Date(expectedDeliveryDate);
            returnDeadline.setDate(returnDeadline.getDate() + 7);

            return (
              <div key={orders.orderID} className="border rounded-lg p-6 mb-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  {currentDate < expectedDeliveryDate ? "Delivering to:" : "Delivered"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {orders.address.addressline}, {orders.address.city}, {orders.address.state} - {orders.address.pincode}, Phone: {orders.address.phonenumber}
                </p>

                <h3 className="text-lg font-semibold text-gray-700 mb-4">Items:</h3>
                <div className="space-y-4 mb-4">
                  {orders.products.map((product) => (
                    <div key={product.id} className="flex items-center border p-4 rounded-lg">
                      <img src={product.image} alt="" className="w-16 h-16 rounded mr-4" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{product.title}</h4>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total Price: ₹{product.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-semibold text-gray-800">Total Amount Paid: ₹{orders.totalAmount.toFixed(2)}</p>
                <p>
                  Order placed on:{" "}
                  {new Date(orders.orderPlacedDate).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                <p>
                  {currentDate < expectedDeliveryDate
                    ? "Expected Delivery Date:"
                    : "Delivered on:"}{" "}
                  {new Date(orders.expectedDeliveryDate).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                <p>Order ID: {orders.orderID}</p>
                <p>Payment ID: {orders.paymentID}</p>

                <div className="mt-4">
                  {currentDate < expectedDeliveryDate ? (
                    <button
                      onClick={() => deleteOrder(orders.orderID)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel Order
                    </button>
                  ) : currentDate < returnDeadline ? (
                    <button
                      onClick={() => deleteOrder(orders.orderID)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Return Order
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default OrderHistory;

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from './Redux';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartData } = useSelector((result) => result.cart)

    React.useEffect(() => {
        props.setTotalCost(cartData.reduce((total, currentProduct) => {
            return total + (currentProduct.price * 80 * currentProduct.quantity)
        }, 0).toFixed(2))
    }, [cartData])

    const removeItemFromCart = (receivedProductID) => {
        const updatedCartData = cartData.filter((product) => product.id != receivedProductID)
        dispatch(addToCart(updatedCartData))
    }

    const updateProductQuantity = (event, receivedProductID) => {
        const updatedProductQuantity = parseInt(event.target.value, 10)

        const updatedCartData = cartData.map((product) => {
            if (product.id == receivedProductID) {
                return { ...product, quantity: updatedProductQuantity };
            }

            return product;
        })

        dispatch(addToCart(updatedCartData))
    }

    const goToHome = () => {
        navigate("/")
    }

    const goToSelectAddress = () => {
        navigate("/selectaddress")
    }

    return (
        <div className="container mx-auto mt-10 p-5 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-5 text-center">Your Shopping Cart</h1>
            {
                cartData.map((product) => {
                    return (
                        <div className="card mb-5 shadow-lg" style={{ maxWidth: "1000px" }} key={product.id}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={product.image} className="img-fluid rounded-start object-cover h-48 w-full" alt={product.title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title text-xl font-semibold">{product.title}</h5>
                                        <p className="card-text">Quantity: </p>
                                        <select onChange={(event) => updateProductQuantity(event, product.id)} name="quantity" value={product.quantity} className="form-select w-20">
                                            {[...Array(10).keys()].map(num => (
                                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                        <p className="card-text mt-2">Total Cost: <span className="text-green-500 font-bold">₹{(product.price * 80 * product.quantity).toFixed(2)}</span></p>
                                        <button onClick={() => removeItemFromCart(product.id)} className="btn bg-gray-500 text-white mt-3 hover:bg-gray-600">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className="text-center mt-5">
                <h2 className="text-2xl font-semibold mb-5">Cart Total: <span className="text-green-500">₹{props.totalCost}</span></h2>
                <button onClick={goToSelectAddress} className="btn bg-yellow-500 text-black mb-3 w-full md:w-1/2 hover:bg-yellow-600">Proceed to Select Address</button>
                <h3 className="text-xl font-medium mb-3">Or</h3>
                <button onClick={goToHome} className="btn bg-gray-500 text-white w-full md:w-1/2 hover:bg-gray-600">Continue Shopping</button>
            </div>
        </div>
    )
}

export default Cart

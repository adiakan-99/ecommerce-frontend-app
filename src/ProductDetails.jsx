import Axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import "./ProductDetails.module.css";
import IndividualProduct from './IndividualProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './Redux';

const ProductDetails = () => {
    const { user, cart } = useSelector((result) => result)
    const dispatch = useDispatch();
    const username = user.username;
    const cartData = cart.cartData;
    const { id } = useParams();
    const [productData, setProductData] = React.useState(null); // Start with null to handle loading state
    const [similarProducts, setSimilarProducts] = React.useState([]);
    const [isFavorited, setIsFavourited] = React.useState(false)
    const [ productQuantity, setProductQuantity ] = React.useState(1);

    // Fetch product data based on the ID from URL params
    React.useEffect(() => {
        Axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]); // Add `id` as a dependency to fetch data whenever `id` changes

    React.useEffect(() => {
        Axios.get(`https://ecommerce-application-back-end.onrender.com/view/wishlist?username=${username}`)
            .then((response) => {
                if (response.data.products) {
                    const productInWishlist = response.data.products.some((i) => {
                        return i.id == id
                    })
                    setIsFavourited(productInWishlist)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [username, id])

    // Fetch similar products once `productData` is available
    React.useEffect(() => {
        if (productData) {
            Axios.get(`https://fakestoreapi.com/products/category/${productData.category}`)
                .then((response) => {
                    const filteredProducts = response.data.filter(product => product.id !== productData.id);
                    setSimilarProducts(filteredProducts);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [productData]); // Fetch similar products whenever `productData` changes

    // Handle loading and error states
    if (!productData) {
        return <div>Loading...</div>;
    }

    const { title, image, description, price, rating } = productData;

    const toggleWishlist = () => {
        if (isFavorited) {
            Axios.delete(`https://ecommerce-application-back-end.onrender.com/remove/wishlist/${username}/${id}`)
                .then((response) => {
                    console.log(response)
                    setIsFavourited(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            console.log(productData)
            Axios.post(`https://ecommerce-application-back-end.onrender.com/add/wishlist`, {
                username,
                product: productData
            })
                .then((response) => {
                    console.log(response)
                    setIsFavourited(true)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    const selectQuantity = (event) => {
        setProductQuantity(event.target.value)
    }

    const addCart = () => {
        const productIndex = cartData.findIndex((product) => product.id == id)

        if (productIndex >= 0) {
            let updatedCartData = [...cartData]
            updatedCartData[productIndex] = {
                ...updatedCartData[productIndex],
                quantity: productQuantity
            }

            dispatch(addToCart(updatedCartData))
        } else {
            const newCartData = [...cartData, {
                ...productData,
                quantity: productQuantity
            }]
            dispatch(addToCart(newCartData))
        }
    }

    return (
        <div className="container mx-auto p-4 mt-24">
            <div className="card mb-6 max-w-2xl mx-auto shadow-lg rounded-lg">
                <div className="flex">
                    <div className="w-1/3">
                        <img src={image} alt={title} className="w-full h-full object-cover rounded-l-lg" />
                    </div>
                    <div className="w-2/3 p-4">
                        <h5 className="text-2xl font-bold mb-2">{title}</h5>
                        <p className="text-gray-700 mb-2">{description}</p>
                        <p className="text-lg font-semibold mb-2">₹{(price * 80).toFixed(2)}</p>
                        <p className="text-gray-600 mb-4">
                            <i className="fa-solid fa-star"></i> {rating && rating.rate} ({rating && rating.count})
                        </p>
                        <div className="flex flex-col mt-4 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">Select Quantity:</label>
                                    <select
                                        id="quantity"
                                        name="quantity"
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
                                        onChange={selectQuantity}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>

                                <button
                                    className="bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                                    onClick={addCart}
                                >
                                    Add To Cart
                                </button>

                                <i
                                    className={`fa-solid fa-heart text-2xl cursor-pointer ${isFavorited ? 'text-red-500' : 'text-gray-300 hover:text-red-500'} transition duration-300 ease-in-out`}
                                    onClick={toggleWishlist}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Similar Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        similarProducts.map((product) => {
                            return <IndividualProduct product={product} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;

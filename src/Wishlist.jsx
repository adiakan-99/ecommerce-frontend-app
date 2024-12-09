import React from 'react'
import Axios from "axios"
import { useSelector } from 'react-redux'
import IndividualProduct from './IndividualProduct'

const Wishlist = () => {
    const username = useSelector((result) => result.user.username)
    const [wishlistProducts, setWishlistProducts] = React.useState([])

    Axios.get(`https://ecommerce-application-back-end.onrender.com/view/wishlist?username=${username}`)
        .then((response) => {
            if (response.data.message === "Here's your wishlist") {
                setWishlistProducts(response.data.products)
            }
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    wishlistProducts.length > 0 ?
                        wishlistProducts.map((product) => {
                            return <IndividualProduct product={product} />
                        }) :
                        <div className="col-span-full">
                            <h2 className="text-2xl text-center text-gray-600">Please add products to view in your wishlist!</h2>
                        </div>
                }
            </div>
        </div>
    )
}

export default Wishlist
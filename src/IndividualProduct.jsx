import React from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from "axios"
import { useSelector } from 'react-redux';

const IndividualProduct = (props) => {
    const navigate = useNavigate();

    const { username } = useSelector((result) => result.user)

    const [isFavourited, setIsFavourited] = React.useState(false)

    React.useEffect(() => {
        Axios.get(`http://localhost:9000/view/wishlist?username=${username}`)
            .then((response) => {
                if (response.data.products) {
                    const productInWishlist = response.data.products.some((i) => i.id === props.product.id)

                    setIsFavourited(productInWishlist)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [username, props])

    const viewDetails = (receivedProduct) => {
        navigate(`/productdetails/${receivedProduct.id}`)
    }

    const toggleWishlist = () => {
        if (isFavourited) {
            Axios.delete(`https://ecommerce-application-back-end.onrender.com/remove/wishlist/${username}/${props.product.id}`)
                .then((response) => {
                    console.log(response)
                    setIsFavourited(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            Axios.post("https://ecommerce-application-back-end.onrender.com/add/wishlist", {
                product: props.product,
                username
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

    return (
        <div
            className="card bg-white shadow-md rounded-lg overflow-hidden"
            key={props.product.id}
        >
            <img
                onClick={() => viewDetails(props.product)}
                src={props.product.image}
                alt={props.product.title}
                className="card-img-top w-full h-48 object-cover"
            />
            <div className="card-body p-6">
                <h5 className="card-title text-xl font-bold text-gray-800">
                    {props.product.title}
                </h5>
                <p className="card-text text-lg font-semibold text-gray-900">₹{(props.product.price * 80).toFixed(2)}</p>
                <p className="card-text text-sm text-gray-500">{props.product.category}</p>
                <p className="card-text text-sm text-gray-500">
                    <i class="fa-solid fa-star"></i>{props.product.rating.rate} ({props.product.rating.count})
                </p>
                <div className="flex items-center mt-4 space-x-4">
                    {/* ${isFavorited ? 'text-red-500' : 'text-gray-300 hover:text-red-500'} */}
                    <i
                        className={`fa-solid fa-heart cursor-pointer text-2xl ${isFavourited ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                        onClick={toggleWishlist}
                    ></i>
                </div>
            </div>
        </div>
    )
}

export default IndividualProduct
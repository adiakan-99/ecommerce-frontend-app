import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, deleteDeliveryAddress, signout } from './Redux';
import Axios from "axios"

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartData } = (useSelector((result) => result.cart))

    const [searchQuery, setSearchQuery] = React.useState('');
    const [display, setDisplay] = React.useState(false);
    const [totalItems, setTotalItems] = React.useState(0)

    React.useEffect(() => {
        setTotalItems(cartData.length)
    }, [cartData])

    const collectSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            goToProducts();
        }
    }

    const goToProducts = () => {
        navigate(`/products/all?search=${searchQuery}`);
    };

    const displayUserOptions = () => {
        setDisplay(prevDisplay => !prevDisplay);
    };

    const pleaseSignOut = () => {
        localStorage.removeItem("authToken");
        dispatch(signout());
        dispatch(deleteCart());
        dispatch(deleteDeliveryAddress());
    };

    const goToWishlist = () => {
        navigate("/wishlist")
        displayUserOptions();
    }

    const goToCart = () => {
        navigate("/cart")
    }

    const goToMyOrders = () => {
        navigate("/orders");
        displayUserOptions();
    }

    const goToUserProfile = () => {
        navigate("/user/profile");
        displayUserOptions();
    }

    return (
        <div className="navbar-container flex justify-between items-center px-6 py-4 bg-gray-800 text-white fixed w-full top-0 shadow-lg z-50">
            <div className="nav-links flex gap-4">
                <NavLink to="/" className="nav-link text-white hover:text-yellow-500">Home</NavLink>
                <NavLink to="/products/all" className="nav-link text-white hover:text-yellow-500">Products</NavLink>
            </div>
            <div className="search-bar-container flex justify-center flex-1">
                <input
                    onChange={collectSearch}
                    onKeyDown={handleKeyDown}
                    type="text"
                    className="form-control p-2 text-black w-80 rounded-lg border border-gray-300 focus:border-yellow-500 outline-none"
                    placeholder="Search"
                />
                <button onClick={goToProducts} className="btn btn-warning ml-2 px-4 rounded-lg hover:bg-yellow-600">
                    Search
                </button>
            </div>
            <div className="flex items-center relative">
                <div className="relative">
                    <i onClick={goToCart} className="fa-solid fa-bag-shopping ml-4 text-2xl cursor-pointer"></i>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center total-items-badge ">
                            {totalItems}
                        </span>
                    )}
                </div>
                <div className='icon-container'>
                    <i onClick={displayUserOptions} className="fa-solid fa-user ml-4 text-2xl cursor-pointer"></i>
                    {display && (
                        <ul className="user-profile-dropdown bg-white text-black rounded-lg shadow-lg absolute right-0 mt-2 w-40">
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <button onClick={goToUserProfile} className="w-full text-left">User Profile</button>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <button onClick={goToMyOrders} className="w-full text-left">Your Orders</button>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <button onClick={goToWishlist} className="w-full text-left">Wishlist</button>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                <button onClick={pleaseSignOut} className="w-full text-left">Sign Out</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Navbar;

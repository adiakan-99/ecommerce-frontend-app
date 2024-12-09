import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const images = ["/images/electronics.jpg", "/images/jewellery.jpg", "/images/mens.jpg", "/images/womens.jpg"];

    const { username } = useSelector((result) => result.user);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    React.useEffect(() => {
        Axios.get("https://fakestoreapi.com/products/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const goToProducts = (receivedCategory) => {
        navigate(`/products/${receivedCategory}`);
    };

    return (
        <div className="mt-24">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Welcome <span className="text-indigo-600">{username}</span>! Check out our latest collection!
            </h1>

            <div className="relative overflow-hidden w-full h-[60vh] mb-8">
                <img
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    src={images[currentIndex]}
                    alt="products"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-50"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => goToProducts(category)}
                        className="bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Home;

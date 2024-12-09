import React from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
import { useDispatch } from 'react-redux'
import { signin } from './Redux'

const Signin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [message, setMessage] = React.useState("")

    const collectEmail = (event) => {
        setEmail(event.target.value)
    }

    const collectPassword = (event) => {
        setPassword(event.target.value)
    }

    const pleaseSignIn = (event) => {
        event.preventDefault();
        Axios.post("https://ecommerce-application-back-end.onrender.com/signin", {
            email,
            password
        })
        .then((response) => {
            if (response.data.message === "Signin succesfull!") {
                dispatch(signin({
                    username: response.data.username,
                    email: response.data.email
                }))

                localStorage.setItem("authToken", response.data.token);
                navigate("/");
            } else {
                setMessage(response.data.message)
            }
        })
        .catch((error) => {
            // Extract and set the error message
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        });
    }

    const goToSignUp = () => navigate("/signup")

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Please sign in to start buying your favourite products!</h2>
            <form onSubmit={pleaseSignIn} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 style={{ color: "red", fontStyle: "italic", fontSize: "15px" }}>{message}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input onChange={collectEmail} type="email" name='email' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input onChange={collectPassword} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-yellow-500 text-black py-2 px-4 rounded w-full hover:bg-yellow-600">
                    Sign In
                </button>
            </form>

            <h2 className="text-lg mt-6">New User?</h2>
            <button onClick={goToSignUp} className="bg-gray-500 text-white py-2 px-4 rounded mt-2 hover:bg-gray-600">
                Sign Up
            </button>
        </div>
    )
}

export default Signin
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"

const Signup = () => {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [message, setMessage] = React.useState("")

    const collectUsername = (event) => {
        setUsername(event.target.value)
    }

    const collectEmail = (event) => {
        setEmail(event.target.value)
    }

    const collectPassword = (event) => {
        setPassword(event.target.value)
    }

    const collectConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const pleaseSignUp = (event) => {
        event.preventDefault()
        Axios.post("https://ecommerce-application-back-end.onrender.com/signup", {
            username,
            email,
            password,
            confirmPassword
        })
        .then((response) => {
            if (response.data.message === "Sign Up successful!") {
                navigate("/signin")
            } else {
                setMessage(response.data.message)
            }
        })
        .catch((error) => {
            if (error.response) {
                setMessage(error.response.data.message)
            } else {
                setMessage(error)
            }

            navigate("/signup")
        })
    }

    const goToSignIn = () => {
        navigate("/signin")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Please Sign up to start using our services!</h2>
            <form onSubmit={pleaseSignUp} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 style={{ color: "red", fontStyle: "italic", fontSize: "15px" }}>{message}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input onChange={collectUsername} type="text" name='username' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input onChange={collectEmail} type="email" name='email' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input onChange={collectPassword} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input onChange={collectConfirmPassword} type="password" name="confirmpassword" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-600">
                    Submit
                </button>
            </form>

            <h2 className="text-lg mt-6">Already a user?</h2>
            <button onClick={goToSignIn} className="bg-gray-500 text-white py-2 px-4 rounded mt-2 hover:bg-gray-600">
                Sign In
            </button>
        </div>
    )
}

export default Signup
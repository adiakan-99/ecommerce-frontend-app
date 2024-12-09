import React from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { signout } from './Redux';

const ChangeEmail = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [confirmEmail, setConfirmEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const collectUsername = (event) => {
        setUsername(event.target.value);
    }

    const collectPassword = (event) => {
        setPassword(event.target.value);
    }

    const collectEmail = (event) => {
        setEmail(event.target.value);
    }

    const collectConfirmEmail = (event) => {
        setConfirmEmail(event.target.value);
    }

    const updateEmail = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem("authToken")

        if (username === "" || password === "" || email === "" || confirmEmail === "") {
            setMessage("Please enter all the fields");
        } else if (email !== confirmEmail) {
            setMessage("Email and confirm email fields are not the same!");
        } else {
            console.log("Hello!");
            Axios.patch(`https://ecommerce-application-back-end.onrender.com/change/user/email/${username}`, {
                password,
                email
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then((response) => {
                    console.log(response);
                    if (response.data.message === "Your email has been updated successfully!") {
                        dispatch(signout());
                    } else {
                        setMessage(response.data.message);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Please enter the required details to change your email!</h2>
            <form onSubmit={updateEmail} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 style={{ color: "red", fontStyle: "italic", fontSize: "15px" }}>{message}</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input onChange={collectUsername} type="text" name='username' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input onChange={collectPassword} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Enter your new email</label>
                    <input onChange={collectEmail} type="email" name='email' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Re-enter your new email</label>
                    <input onChange={collectConfirmEmail} type="email" name='email' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                    Change Email
                </button>
            </form>
        </div>
    )
}

export default ChangeEmail
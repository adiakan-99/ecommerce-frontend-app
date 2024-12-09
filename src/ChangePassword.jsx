import React from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { signout } from './Redux';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    const pleaseChangePassword = (event) => {
        event.preventDefault();

        const authToken = localStorage.getItem("authToken")
        Axios.patch("https://ecommerce-application-back-end.onrender.com/change/user/password", {
            email,
            currentPassword,
            newPassword,
            confirmNewPassword
        }, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => {
            console.log(response);
            if (response.data.message === "Password updated succesfully!") {
                alert(response.data.message);
                dispatch(signout());
            } else {
                setMessage(response.data.message);
            }
        })
        .catch((error) => console.log(error))
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Please enter the required credentials to change your password!</h2>
            <form onSubmit={pleaseChangePassword} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 style={{ color: "red", fontStyle: "italic", fontSize: "15px" }}>{message}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} type="email" name='email' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                    <input onChange={(event) => setCurrentPassword(event.target.value)} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                    <input onChange={(event) => setNewPassword(event.target.value)} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Re-enter new password</label>
                    <input onChange={(event) => setConfirmNewPassword(event.target.value)} type="password" name='password' className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600">
                    Change Password
                </button>
            </form>
        </div>
    )
}

export default ChangePassword
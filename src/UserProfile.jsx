import React from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import useUserAddress from './useUserAddress';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const { username, email } = useSelector((result) => result.user);
    const [userAddresses, fetchUserAddress] = useUserAddress(username);

    const deleteAddress = (receivedAddressIndex) => {
        const deleteAddressID = userAddresses[receivedAddressIndex]._id;
        const authToken = localStorage.getItem("authToken");

        Axios.delete(`https://ecommerce-application-back-end.onrender.com/delete/user/address/${deleteAddressID}?username=${username}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
            .then((response) => {
                if (response.data.message === "The address was succesfully deleted!") {
                    alert(response.data.message);
                    fetchUserAddress(username);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const goToChangePassword = () => {
        window.open(`${window.location.origin}/change/user/password`);
    };

    const goToChangeEmail = () => {
        window.open(`${window.location.origin}/change/user/email`);
    };

    return (
        <div className="container mx-auto mt-10 px-4 pt-20">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Your Profile Details</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Username:</h3>
                    <p>{username}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Email:</h3>
                    <p>{email}</p>
                    <button
                        onClick={goToChangeEmail}
                        className="mt-2 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                    >
                        Change Email
                    </button>
                </div>
                <button
                    onClick={goToChangePassword}
                    className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                >
                    Change Password
                </button>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Addresses</h2>
                {userAddresses.length > 0 ? (
                    userAddresses.map((userAddress, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md mb-4"
                        >
                            <h3 className="text-lg font-semibold">
                                Address: {userAddress.addressline}
                            </h3>
                            <p>City: {userAddress.city}</p>
                            <p>State: {userAddress.state}</p>
                            <p>Pincode: {userAddress.pincode}</p>
                            <p>Phone Number: {userAddress.phonenumber}</p>
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() =>
                                        navigate('/update/user/address', {
                                            state: {
                                                mode: 'edit',
                                                data: {
                                                    addressLine: userAddress.addressline,
                                                    city: userAddress.city,
                                                    state: userAddress.state,
                                                    pincode: userAddress.pincode,
                                                    phoneNumber: userAddress.phonenumber,
                                                    addressID: userAddress._id,
                                                },
                                                redirectTo: "/user/profile"
                                            }
                                        })
                                    }
                                    className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteAddress(index)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="text-lg font-semibold text-gray-600">
                        You have no saved addresses
                    </h3>
                )}
                <button
                    onClick={() =>
                        navigate('/update/user/address', { state: { mode: 'add', redirectTo: "/user/profile" } })
                    }
                    className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
                >
                    Add Address
                </button>
            </div>
        </div>
    );
};

export default UserProfile;

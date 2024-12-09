import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateDeliveryAddress } from './Redux';
import useUserAddress from './useUserAddress';

const SelectAddress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(null);
    const { username } = useSelector((result) => result.user);

    const [userAddresses,] = useUserAddress(username);

    const handleSelectedAddress = (event) => {
        const index = parseInt(event.target.value, 10);
        setSelectedAddressIndex(index);
    }

    const handleAddAddress = () => {
        navigate("/update/user/address", {
            state: {
                mode: "add",
                redirectTo: "/selectaddress"
            }
        })
    }

    const selectAddress = (event) => {
        event.preventDefault();
        if (selectedAddressIndex != null) {
            const selectedAddress = userAddresses[selectedAddressIndex];
            dispatch(updateDeliveryAddress({
                addressline: selectedAddress.addressline,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.pincode,
                phonenumber: selectedAddress.phonenumber
            }));
            navigate("/checkout");
        } else {
            alert("Please select an address!")
        }
    }

    return (
        <div className="mt-16 min-h-screen flex flex-col items-center p-6 pt-20 bg-gray-100">
            {
                userAddresses.length > 0
                    ?
                    <form onSubmit={selectAddress} className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg mb-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Select Previous Addresses</h2>
                        <div className="space-y-4">
                            {userAddresses.map((userAddress, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="address"
                                        value={index}
                                        onChange={handleSelectedAddress}
                                        className="form-radio text-blue-500 focus:ring-blue-500"
                                    />
                                    <label className="text-gray-700">
                                        {`${userAddress.addressline}, ${userAddress.city}, ${userAddress.state} - ${userAddress.pincode}, Phone Number: ${userAddress.phonenumber}`}
                                    </label>
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
                                                    redirectTo: "/selectaddress"
                                                }
                                            })
                                        }>Edit</button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 px-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200">
                            Select Address
                        </button>
                    </form>
                    :
                    <h2 className="text-5xl font-bold text-gray-600">No saved Address</h2>
            }

            <button
                className='mt-4 py-2 px-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200'
                onClick={handleAddAddress}
            >Add New Address</button>
        </div>
    );
};

export default SelectAddress;

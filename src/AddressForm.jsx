import React from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const AddressForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = useSelector((result) => result.user)
    const [addressLine, setAddressLine] = React.useState("");
    const [pincode, setPincode] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");

    const { mode, data, redirectTo } = location.state || {};

    React.useEffect(() => {
        if (mode === "edit" && data) {
            setAddressLine(data.addressLine);
            setPincode(data.pincode);
            setCity(data.city);
            setState(data.state);
            setPhoneNumber(data.phoneNumber);
        }
    }, [mode, data]);

    const updateAddress = (event) => {
        event.preventDefault();
        const authToken = localStorage.getItem("authToken");

        if (mode === "add") {
            Axios.post("https://ecommerce-application-back-end.onrender.com/add/address", {
                username,
                addressLine,
                pincode,
                city,
                state,
                phoneNumber
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then((response) => {
                    if (response.data.message === "Address added to user data successfully!") {
                        alert("New address added!");
                        navigate(redirectTo || "/");
                    } else {
                        alert("There has been an error when adding the address!");
                    }
                })
                .catch((error) => {
                    alert("There has been an error when adding the address!")
                })
        } else if (mode === "edit") {
            Axios.patch(`https://ecommerce-application-back-end.onrender.com/edit/user/address/${username}`, {
                addressID: data.addressID,
                addressLine,
                phoneNumber,
                city,
                state,
                pincode
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then((response) => {
                    if (response.data.message === "Address updated successfully!") {
                        alert(response.data.message);
                        navigate(redirectTo || "/");
                    } else {
                        alert("There was an error when updating the address");

                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("There was an error when updating the address");
                })
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className="bg-white p-6 mt-24 shadow-md rounded-lg w-full max-w-lg content-around">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{mode == "add" ? "Add new address" : "Edit your address"}</h2>
                <form onSubmit={updateAddress} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Enter your Address:</label>
                        <textarea
                            onChange={(event) => setAddressLine(event.target.value)}
                            name="addressLine"
                            value={addressLine}
                            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="3"
                            title="Please enter a valid address"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Enter your Pincode:</label>
                        <input
                            onChange={(event) => setPincode(event.target.value)}
                            value={pincode}
                            type="number"
                            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            title="Please enter a valid pincode"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Enter City:</label>
                        <input
                            onChange={(event) => setCity(event.target.value)}
                            value={city}
                            type="text"
                            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            title="Please enter a valid city"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Enter State:</label>
                        <input
                            onChange={(event) => setState(event.target.value)}
                            value={state}
                            type="text"
                            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            title="Please enter a valid Indian State"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Enter Phone Number:</label>
                        <input
                            onChange={(event) => setPhoneNumber(event.target.value)}
                            value={phoneNumber}
                            type="tel"
                            className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            pattern="[6-9][0-9]{9}"
                            title="Please enter a valid 10-digit Indian phone number starting with 6-9."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                        {mode === "edit" ? "Edit Your Address" : "Add New Address"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddressForm
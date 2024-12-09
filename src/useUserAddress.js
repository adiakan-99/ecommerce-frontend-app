import React from "react";
import Axios from "axios";

const useUserAddress = (username, authToken) => {
    const [userAddress, setUserAddress] = React.useState([]);

    const fetchUserAddress = async () => {
        try {
            const authToken = localStorage.getItem("authToken");

            const response = await Axios.get(`https://ecommerce-application-back-end.onrender.com/get/user/addresses?username=${username}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (response.data.message === "Your saved adddresses") {
                setUserAddress(response.data.addresses);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        if (username) {
            fetchUserAddress();
        }
    }, [username]);

    return [userAddress, fetchUserAddress];
};

export default useUserAddress;
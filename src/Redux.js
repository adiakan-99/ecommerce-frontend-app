import { configureStore, createSlice } from "@reduxjs/toolkit"

const savedUserData = localStorage.getItem("userinfo") ?
    JSON.parse(localStorage.getItem("userinfo"))
    :
    {
        username: "",
        email: "",
        isLoggedIn: false
    }

const userSlice = createSlice({
    name: "user",
    initialState: savedUserData,
    reducers: {
        signin: (state, action) => {
            const newUserState = {
                username: action.payload.username,
                email: action.payload.email,
                isLoggedIn: true
            }
            localStorage.setItem("userinfo", JSON.stringify(newUserState))
            return newUserState
        },
        signout: (state, action) => {
            const newUserState = {
                username: "",
                email: "",
                isLoggedIn: false
            }
            localStorage.removeItem("userinfo")
            return newUserState
        }
    }
})

export const { signin, signout } = userSlice.actions;

const savedCartData = localStorage.getItem("usercart") ?
    JSON.parse(localStorage.getItem("usercart"))
    :
    {
        cartData: []
    }

const cartSlice = createSlice({
    name: "cart",
    initialState: savedCartData,
    reducers: {
        addToCart: (state, action) => {
            localStorage.setItem("usercart", JSON.stringify({ cartData: action.payload }))

            return {
                cartData: action.payload
            }
        },
        deleteCart: (state, action) => {
            localStorage.removeItem("usercart")
            return {
                cartData: []
            }
        }
    }
})

export const { addToCart, deleteCart } = cartSlice.actions;

const savedAddress = localStorage.getItem("deliverAddress") ?
    JSON.parse(localStorage.getItem("deliveryAddress"))
    :
    {
        addressline: "",
        city: "",
        state: "",
        pincode: "",
        phonenumber: ""
    }

const deliveryAddressSlice = createSlice({
    name: "address",
    initialState: savedAddress,
    reducers: {
        updateDeliveryAddress: (state, action) => {
            localStorage.setItem("deliveryAddress", JSON.stringify({
                addressline: action.payload.addressline,
                city: action.payload.city,
                state: action.payload.state,
                pincode: action.payload.pincode,
                phonenumber: action.payload.phonenumber
            }))

            return {
                addressline: action.payload.addressline,
                city: action.payload.city,
                state: action.payload.state,
                pincode: action.payload.pincode,
                phonenumber: action.payload.phonenumber
            }
        },
        deleteDeliveryAddress: (state, action) => {
            localStorage.removeItem("deliveryAddress");
            
            return {
                addressline: "",
                city: "",
                state: "",
                pincode: "",
                phonenumber: ""
            }
        }
    }
})

export const { updateDeliveryAddress, deleteDeliveryAddress } = deliveryAddressSlice.actions;

export const ecommerceappstore = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        address: deliveryAddressSlice.reducer
    }
})
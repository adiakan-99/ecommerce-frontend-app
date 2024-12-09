import React from 'react'
import Axios from 'axios'
import './Products.module.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import IndividualProduct from './IndividualProduct'

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([])
    const { category } = useParams()
    const [info, setInfo] = useSearchParams()
    const [filteredProducts, setFilteredProducts] = React.useState([])

    const searchQuery = info.get("search")

    React.useEffect(() => {
        if (category !== "all") {
            Axios.get(`https://fakestoreapi.com/products/category/${category}`)
                .then((response) => {
                    console.log(response.data)
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            Axios.get(`https://fakestoreapi.com/products`)
                .then((response) => {
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [category])

    React.useEffect(() => {
        if (products) {
            const regex = new RegExp(searchQuery, 'i', 'g', 'm')
            setFilteredProducts(products.filter((product) =>
                searchQuery ? (regex.test(product.title) || regex.test(product.description) || regex.test(product.category)) : true
            ))
        }
    }, [products, searchQuery])

    
    return (
        <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-24">
            {
                filteredProducts.map((product) => {
                    return <IndividualProduct product={product} />
                })
            }
        </div>
    )
}

export default Products

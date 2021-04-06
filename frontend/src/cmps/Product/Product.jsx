
import React from 'react'
import Rating from '../Rating/Rating'
import './Product.scss'
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { product } = props
    console.log('product:', product)

    return (
        <Link to={`/product/${product._id}`} >
            <div key={product._id} className="card" >
                <div className="card-body">
                    <Link to={`/product/${product._id}`} ><img className="medium" src={product.img} alt="product" /></Link>
                    <Link to={`/product/${product._id}`}><p className="title" to={`/product/${product._id}`} >{product.name}</p><Link to={`/product/${product._id}`}><p className="desc" to={`/product/${product._id}`} >{product.description}</p></Link></Link>
                    {/* <hr></hr>   */}
                    <div className="row">Price : <h3 className="price"> {product.price} $</h3></div>
                    {/* <Rating
                    rating={product.rating}
                    numReviews={product.numReviews} /> */}
                    {/* <div className="row">
                    <div>
                    </div>
                </div> */}

                </div>
            </div>
        </Link>
    )

}


export default Product
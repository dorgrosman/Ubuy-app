import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, productUpdate } from '../../actions/productActions';
import LoadingBox from '../../cmps/LoadingBox/LoadingBox';
import MassageBox from '../../cmps/MassageBox/MassageBox';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import Axios from 'axios';

const ProductEditPage = (props) => {
    const productId = props.match.params.id;
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [isFav, setIsFav] = useState('')

    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    // const productDetail = useSelector((state) => console.log('state:', state.productDetails ));
    
    const { loading, error, product } = productDetails



    const updateProduct = useSelector(state => state.updateProduct)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = updateProduct

    useEffect(() => {

        if (successUpdate) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch(detailsProduct(productId))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImg(product.img)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
            setIsFav(product.isFav)

        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHendler = (event) => {
        console.log('event:', event)
        event.preventDefault()
        dispatch(productUpdate({
            _id: productId,
            name,
            price,
            img,
            category,
            countInStock,
            brand,
            description,
            isFav
        }))

    }

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async(evevt) => {
        const file = evevt.target.files[0];
        const bodyFormData = new FormData();
        
        bodyFormData.append('img', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData,  {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

            setImg(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };


    return (
        <div>
            <form className="form" onSubmit={submitHendler}>
                <div>
                    <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MassageBox variant="danger">{errorUpdate}</MassageBox>}
                {loading ? <LoadingBox></LoadingBox>
                    : error ? <MassageBox vartiant="danger">{error}</MassageBox>
                        :
                        <>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input

                                    id="name"
                                    type="text"
                                    placeholder="Enter Product Name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    type="text"
                                    placeholder="Enter Product Price"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="Img">Img</label>
                                <input
                                    id="Img"
                                    type="text"
                                    placeholder="Enter Product Img"
                                    value={img}
                                    onChange={(event) => setImg(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="imgFile">Image File</label>
                                <input
                                    type="file"
                                    id="imgFile"
                                    label="Choose Image"
                                    onChange={uploadFileHandler}
                                ></input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (
                                    <MassageBox variant="danger">{errorUpload}</MassageBox>
                                )}
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    type="text"
                                    placeholder="Enter Product Category"
                                    value={category}
                                    onChange={(event) => setCategory(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="countInStock"> Stock</label>
                                <input
                                    id="countInStock"
                                    type="text"
                                    placeholder="Enter Product Stock"
                                    value={countInStock}
                                    onChange={(event) => setCountInStock(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input id="brand" type="text" placeholder="Enter Product Brand" value={brand} onChange={(event) => setBrand(event.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea rows="3" id="description" type="text" placeholder="Enter Product Description" value={description} onChange={(event) => setDescription(event.target.value)} />
                            </div>
                            <div>
                                <label></label>
                                <div className="multi-button">

                                <button className="primary" type="submit" >Updata</button>
                                </div>
                            </div>
                        </>

                }
            </form>
        </div>
    )
}

export default ProductEditPage
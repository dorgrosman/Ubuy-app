import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../../cmps/LoadingBox/LoadingBox';
import MassageBox from '../../cmps/MassageBox/MassageBox';
import { detailsOrder } from '../../actions/OrderActions';
import Axios from 'axios';
import { payOrder, deliverOrder } from './../../actions/OrderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from './../../constants/orderConstants';

const OrderPage = (props) => {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    console.log('sdkReadyaaaaaaaaaa:', sdkReady)
    const orderDetails = useSelector(state => state.orderDetaile);

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay } = orderPay
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successeliver } = orderDeliver

    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            
            setSdkReady(true);
            script.async = true;
            // script.onload = () => { /// Need to chack it

            // };
            
            document.body.appendChild(script);
        };
        if (!order || successPay || successeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MassageBox variant="danger">{error}</MassageBox>
    ) : (
                <div>
                    <h1>Order Page</h1>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Address: </strong> {order.shippingAddress.address},
                                              {order.shippingAddress.city},{' '}
                                            {order.shippingAddress.postalCode},
                                               {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? (
                                            <MassageBox variant="success">
                                                Delivered at {order.deliveredAt}
                                            </MassageBox>
                                        ) : (
                                                <MassageBox variant="danger">Not Delivered</MassageBox>
                                            )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <MassageBox variant="success">
                                                Paid at {order.paidAt}
                                            </MassageBox>
                                        ) : (
                                                <MassageBox variant="danger">Not Paid</MassageBox>
                                            )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.img}
                                                                alt={item.name}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </div>

                                                        <div>
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>
                                                <strong> Order Total</strong>
                                            </div>
                                            <div>
                                                <strong>${order.totalPrice.toFixed(2)} </strong>
                                            </div>
                                        </div>
                                    </li>
                                    {!order.isPaid && (
                                        <li>
                                            {console.log('sdkReady:', sdkReady)}
                                            { !sdkReady ? (
                                                <LoadingBox></LoadingBox>
                                            ) : (
                                                    <>
                                                        {errorPay && (<MassageBox variant="danger">{errorPay}</MassageBox>)}
                                                        {loadingPay && <LoadingBox></LoadingBox>}
                                                        <PayPalButton
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}
                                                        ></PayPalButton>
                                                    </>
                                                )}
                                        </li>
                                    )}

                                    {userInfo.isAdmin && !order.isPaid && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && (
                                                <MassageBox variant="danger">{errorDeliver}</MassageBox>
                                            )}
                                            <button
                                                type="button"
                                                className="primary block"
                                                onClick={deliverHandler}
                                            >
                                                Deliver Order
                                                </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );

}
export default OrderPage
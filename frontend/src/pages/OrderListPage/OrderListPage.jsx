import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MassageBox from '../../cmps/MassageBox/MassageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import { deleteOrder, listOrders } from './../../actions/OrderActions';
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';

const OrderListPage = (props) => {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList
    const orderDelete = useSelector(state => state.orderDelete)
    const { loding: loadingDelete, error: errorDelete, success: successDelete } = orderDelete

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch({ type: ORDER_DELETE_RESET });
        // if (successDelete){ /////////
        //     dispatch({ type: ORDER_DELETE_RESET })
        // }  /////////

        dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

    const deleteHandler = (order) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id))
        }
    }
    return (
        <div>
            <div>
                <h1>Orders</h1>
                {loadingDelete && <LoadingBox></LoadingBox>}
                {errorDelete && <MassageBox variant="danger">{errorDelete}</MassageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MassageBox variant="danger">{error}</MassageBox>
                ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user.name}</td>

                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                {/* {order.isDelivered
                                                    ? order.deliveredAt.substring(0, 10)
                                                    : 'No'} */}
                                            </td>
                                            <td >
                                                <div className="space-btn">
                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() => {
                                                            props.history.push(`/order/${order._id}`);
                                                        }}
                                                    >
                                                        Details
                                                  </button>
                                                    <button
                                                        type="button"
                                                        className="small"
                                                        onClick={() => deleteHandler(order)}
                                                    >
                                                        Delete
                                                     </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
            </div>
        </div>
    )
}

export default OrderListPage
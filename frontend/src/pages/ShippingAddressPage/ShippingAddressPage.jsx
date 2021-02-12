import React, { useState} from 'react'
import CheckoutSteps from '../../cmps/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/CartActions';

const ShippingAddressPage = (props) => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;



    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const dispatch = useDispatch();


    const submitHandler = (event) => {
        
        event.preventDefault();
        dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }))
        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address" onSubmit={submitHandler}>Address</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        placeholder="Enter Full Name"
                        onChange={(event) => setAddress(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="postalCode" onSubmit={submitHandler}>Postal Code</label>
                    <input
                        type="text"
                        id="postalCode"
                        value={postalCode}
                        placeholder="Enter Postal Code"
                        onChange={event => setPostalCode(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" onSubmit={submitHandler}>City</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        placeholder="Enter City"
                        onChange={event => setCity(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country" onSubmit={submitHandler}>Country</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        placeholder="Enter Country"
                        onChange={event => setCountry(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressPage



// export default function ShippingAddressPage(props) {
//     const userSignin = useSelector((state) => state.userSignin);
//     const { userInfo } = userSignin;
//     const cart = useSelector((state) => state.cart);
//     const { shippingAddress } = cart;
//     if (!userInfo) {
//       props.history.push('/signin');
//     }
//     const [fullName, setFullName] = useState(shippingAddress.fullName);
//     const [address, setAddress] = useState(shippingAddress.address);
//     const [city, setCity] = useState(shippingAddress.city);
//     const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
//     const [country, setCountry] = useState(shippingAddress.country);
//     const dispatch = useDispatch();
//     const submitHandler = (e) => {
//       e.preventDefault();
//       dispatch(
//         saveShippingAddress({ fullName, address, city, postalCode, country })
//       );
//       console.log('shippingAddress:', shippingAddress)
//       props.history.push('/payment');
//     };
//     return (
//       <div>
//         <CheckoutSteps step1 step2></CheckoutSteps>
//         <form className="form" onSubmit={submitHandler}>
//           <div>
//             <h1>Shipping Address</h1>
//           </div>
//           <div>
//             <label htmlFor="fullName">Full Name</label>
//             <input
//               type="text"
//               id="fullName"
//               placeholder="Enter full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="address">Address</label>
//             <input
//               type="text"
//               id="address"
//               placeholder="Enter address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="city">City</label>
//             <input
//               type="text"
//               id="city"
//               placeholder="Enter city"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="postalCode">Postal Code</label>
//             <input
//               type="text"
//               id="postalCode"
//               placeholder="Enter postal code"
//               value={postalCode}
//               onChange={(e) => setPostalCode(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="country">Country</label>
//             <input
//               type="text"
//               id="country"
//               placeholder="Enter country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               required
//             ></input>
//           </div>
//           <div>
//             <label />
//             <button className="primary" type="submit">
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
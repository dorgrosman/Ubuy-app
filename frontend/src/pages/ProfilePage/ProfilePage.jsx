import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/UserActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/UseConstants';
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import MassageBox from './../../cmps/MassageBox/MassageBox';


const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin;
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);;
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile
    const dispatch = useDispatch();


    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id))
        } else {
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }

    }, [dispatch, (userInfo._id), user])

    const submitHandler = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Password And Confirm Password Are Not Matched')
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                    sellerName,
                    sellerLogo,
                    sellerDescription,
                })
            );
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MassageBox variant="danger">{error}</MassageBox>
                ) : (
                            <>
                                {loadingUpdate && <LoadingBox></LoadingBox>}
                                {errorUpdate && (<MassageBox vartiant="danger">{errorUpdate}</MassageBox>)}
                                {successUpdate && (<MassageBox variant="success">Profile Update Successfully</MassageBox>)}
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Enter password"
                                        onChange={(event) => setPassword(event.target.value)}
                                    ></input>
                                </div>
                                {user.isSeller && (
                                    <>
                                        <h2>Seller</h2>
                                        <div>
                                            <label htmlFor="sellerName">Seller Name</label>
                                            <input
                                                id="sellerName"
                                                type="text"
                                                placeholder="Enter Seller Name"
                                                value={sellerName}
                                                onChange={(e) => setSellerName(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="sellerLogo">Seller Logo</label>
                                            <input
                                                id="sellerLogo"
                                                type="text"
                                                placeholder="Enter Seller Logo"
                                                value={sellerLogo}
                                                onChange={(e) => setSellerLogo(e.target.value)}
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="sellerDescription">Seller Description</label>
                                            <input
                                                id="sellerDescription"
                                                type="text"
                                                placeholder="Enter Seller Description"
                                                value={sellerDescription}
                                                onChange={(e) => setSellerDescription(e.target.value)}
                                            ></input>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label htmlFor="confirmPassword">confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Enter confirm password"
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <label />
                                    <button className="primary" type="submit">
                                        Update
                  </button>
                                </div>
                            </>
                        )}
            </form>
        </div>
    );
}

export default ProfilePage
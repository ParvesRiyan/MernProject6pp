import React, { Fragment, useState, useEffect } from 'react'
import "./ResetPassword.css";
import {  useParams, useNavigate } from 'react-router-dom';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, resetPassword } from "../../Actions/userAction"
import { useAlert } from "react-alert"
import Loader from "../../Component/Layout/Loader/Loader"
import MetaData from "../Layout/MetaData";

const ResetPassword = () => {
    const token = useParams();

    const navigate = useNavigate()

    const alert = useAlert();

    const dispatch = useDispatch();

    const { error, success, loading } = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const resetPasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login")
            
        }
    }, [dispatch, alert, error, success, navigate])

    return (
        <Fragment>
            {loading ? (<Loader />) :
                (<Fragment>
                    <MetaData title="Change Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className="resetPasswordHeading"> Change Password </h2>
                            <form
                                className='resetPasswordForm'
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder='New password'
                                        required
                                        name='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <LockIcon />
                                    <input
                                        type="password"
                                        placeholder='Confirm password'
                                        required
                                        name='password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Update"
                                    className="resetPasswordBtn"
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>)}
        </Fragment>
    )
}

export default ResetPassword
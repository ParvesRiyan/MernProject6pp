import React, { Fragment, useState, useEffect } from 'react'
import "./UpdatePassword.css";
import { useNavigate } from 'react-router';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useDispatch, useSelector } from "react-redux";
import { ClearErrors, updatePassword } from "../../Actions/userAction"
import { useAlert } from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../Constans/userConstans';
import Loader from "../../Component/Layout/Loader/Loader"
import MetaData from "../Layout/MetaData";

const UpdatePassword = () => {

    const navigate = useNavigate()

    const alert = useAlert();

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    const updatePasswordSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(ClearErrors())
        }
        if (isUpdated) {
            alert.success("Password Change Successfully");
            navigate("/account")
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, alert, error, isUpdated, navigate])

    return (
        <Fragment>
            {loading ? (<Loader />) :
                (<Fragment>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className="updatePasswordHeading"> Change Password </h2>
                            <form
                                className='updatePasswordForm'
                                onSubmit={updatePasswordSubmit}
                            >
                                <div className="signUpPassword">
                                    <VpnKeyIcon />
                                    <input
                                        type="password"
                                        placeholder='Old password'
                                        required
                                        name='password'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder='New password'
                                        required
                                        name='password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="signUpPassword">
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
                                    value="Change"
                                    className="updatePasswordBtn"
                                    disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </Fragment>)}
        </Fragment>
    )
}

export default UpdatePassword

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword2() {
    var [data, setData] = useState({
        otp: ""
    })
    var navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: parseInt(value)
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var response = await fetch("/api/user/forget-password-2", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ otp:data.otp, username: localStorage.getItem("reset-password-user") })
        })
        response = await response.json()
        if (response.result === "Done")
            navigate("/forget-password-3")
        else
            alert(response.message)
    }
    return (
        <div className='container-fluid my-5'>
            <div className="w-100">
                <div className="w-75 card py-5 px-3 m-auto">
                    <h5 className='text-center p-3 bg-secondary text-light mb-3'><span className='text-warning border-bottom'>Reset</span> Password</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>OTP</label>
                            <input type="number" name="otp" required onChange={getInputData} placeholder='Enter OTP which is sent on Your Registered Email ID' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>Submit OTP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

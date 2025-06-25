import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword1() {
    var [data, setData] = useState({
        username: ""
    })
    var navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var response = await fetch("/api/user/forget-password-1", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })
        response = await response.json()
        if (response.result === "Done") {
            localStorage.setItem("reset-password-user", data.username)
            navigate("/forget-password-2")
        }
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
                            <label>Username</label>
                            <input type="text" name="username" required onChange={getInputData} placeholder='User Name' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>Send OTP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

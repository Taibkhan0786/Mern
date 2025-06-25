import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword3() {
    var [data, setData] = useState({
        password: "",
        cpassword: "",
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
        if (data.password === data.cpassword) {
            var response = await fetch("/api/user/forget-password-3", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ password: data.password, username: localStorage.getItem("reset-password-user") })
            })
            response = await response.json()
            if (response.result === "Done") {
                localStorage.removeItem("reset-passeord-user")
                navigate("/login")
            }
            else
                alert(response.message)
        }
        else
            alert("Password and Confirm Password Doesn't Matched!!!")
    }
    return (
        <div className='container-fluid my-5'>
            <div className="w-100">
                <div className="w-75 card py-5 px-3 m-auto">
                    <h5 className='text-center p-3 bg-secondary text-light mb-3'><span className='text-warning border-bottom'>Reset</span> Password</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" name="password" required onChange={getInputData} placeholder='Password' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input type="password" name="cpassword" required onChange={getInputData} placeholder='Confirm Password' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

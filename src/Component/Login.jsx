import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    var [data, setData] = useState({
        username: "",
        password: ""
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
        var response = await fetch("/api/user/login", {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify({...data})
        })
        response = await response.json()
        if (response.result==="Done") {
            localStorage.setItem("login", true)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("username", response.data.username)
            localStorage.setItem("userid", response.data._id)
            localStorage.setItem("role", response.data.role)
            localStorage.setItem("token", response.token)
            if (response.data.role === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            alert("Invalid Username or Password!!!")
    }
    return (
        <div className='container-fluid my-5'>
            <div className="w-100">
                <div className="w-75 card py-5 px-3 m-auto">
                    <h5 className='text-center p-3 bg-secondary text-light mb-3'><span className='text-warning border-bottom'>Login</span> to Your Account</h5>
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" name="username" required onChange={getInputData} placeholder='User Name' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" name="password" required onChange={getInputData} placeholder='Password' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>Login</button>
                        </div>
                    </form>
                    <div className='d-flex justify-content-between'>
                        <Link to="/forget-password-1">Forget Password</Link>
                        <Link to="/signup">Doesn't Have an Account? Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    var [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
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
            let item = {
                name: data.name,
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: data.password,
                role: "Buyer"
            }
            let response = await fetch("/api/user", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(item)
            })
            response = await response.json()
            if (response.result === "Done")
                navigate("/login")
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
                    <h5 className='text-center p-3 bg-secondary text-light mb-3'><span className='text-warning border-bottom'>Create</span> an Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Full Name</label>
                                <input type="text" name="name" required onChange={getInputData} placeholder='Full Name' className='form-control' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Username</label>
                                <input type="text" name="username" required onChange={getInputData} placeholder='User Name' className='form-control' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" required onChange={getInputData} placeholder='Email Address' className='form-control' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Phone</label>
                                <input type="phone" name="phone" required onChange={getInputData} placeholder='Phone Number' className='form-control' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Password</label>
                                <input type="password" name="password" required onChange={getInputData} placeholder='Password' className='form-control' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Confirm Password</label>
                                <input type="password" name="cpassword" required onChange={getInputData} placeholder='Confirm Password' className='form-control' />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>SignUp</button>
                        </div>
                    </form>
                    <Link to="/login">Already Have An Account? Login</Link>
                </div>
            </div>
        </div>
    )
}

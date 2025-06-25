import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    var [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: "",
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
    function getInputFile(e) {
        var { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0]
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var item = new FormData()
        item.append("name",data.name)
        item.append("email",data.email)
        item.append("phone",data.phone)
        item.append("address",data.address)
        item.append("pin",data.pin)
        item.append("city",data.city)
        item.append("state",data.state)
        item.append("pic",data.pic)
        var response = await fetch("/api/user/" + localStorage.getItem("userid"), {
            method: "put",
            headers: {
                "authorization": localStorage.getItem("token")
            },
            body: item
        })
        response = await response.json()
        if (response.result === "Done") {
            if (data.role === "Admin")
                navigate("/admin")
            else
                navigate("/profile")
        }
        else
            alert(response.message)
    }
    async function getAPIDate() {
        var response = await fetch("/api/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        if (response.result === "Done")
            setData(response.data)
        else
            navigate("/login")
    }
    useEffect(() => {
        getAPIDate()
    }, [])
    return (
        <div className='container-fluid my-5'>
            <div className="w-100">
                <div className="w-75 card py-5 px-3 m-auto">
                    <h5 className='text-center p-3 bg-secondary text-light mb-3'><span className='text-warning border-bottom'>Update</span> Profile</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Full Name</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Full Name' className='form-control' value={data.name} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Pic</label>
                                <input type="file" name="pic" onChange={getInputFile} className='form-control' />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" name="email" onChange={getInputData} placeholder='Email Address' className='form-control' value={data.email} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Phone</label>
                                <input type="phone" name="phone" onChange={getInputData} placeholder='Phone Number' className='form-control' value={data.phone} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <textarea name="address" onChange={getInputData} rows="2" className='form-control' placeholder='Address..' value={data.address}></textarea>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-3">
                                <label>Pin</label>
                                <input type="number" name="pin" onChange={getInputData} placeholder='pin' className='form-control' value={data.pin} />
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                                <label>City</label>
                                <input type="text" name="city" onChange={getInputData} placeholder='City' className='form-control' value={data.city} />
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                                <label>State</label>
                                <input type="text" name="state" onChange={getInputData} placeholder='State' className='form-control' value={data.state} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className='btn btn-secondary w-100'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

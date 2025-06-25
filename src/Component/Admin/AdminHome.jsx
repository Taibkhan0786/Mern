import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SideBar from './SideBar'

export default function AdminHome() {
    let [user, setUser] = useState({
        pic: ""
    })
    let navigate = useNavigate()
    async function getAPIData() {
        var response = await fetch("/api/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            }
        })
        response = await response.json()
        if (response.result === "Done")
            setUser(response.data)
        else
            navigate("/login")
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <div className='container-fluid my-3'>
            <div className="row">
                <div className="col-md-2">
                    <SideBar />
                </div>
                <div className="col-md-10">
                    <h5 className='bg-primary p-2 text-light rounded text-center'>Admin Home</h5>
                    <div className="row mt-3">
                        <div className="col-md-6">
                            {
                                user.pic ?
                                    <img src={`/public/uploads/users/${user.pic}`} height="300px" width="100%" alt="" /> :
                                    <img src={`/images/noimage.png`} height="300px" width="100%" alt="" />
                            }
                        </div>
                        <div className="col-md-6">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{user.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{user.phone}</td>
                                    </tr>
                                    <tr>
                                        <th colSpan={2}><Link to="/update-profile" className='btn btn-primary w-100 btn-sm'>Update Profile</Link></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

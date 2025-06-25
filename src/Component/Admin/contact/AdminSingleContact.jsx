import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContact, getContact, updateContact } from "../../../Store/ActionCreators/ContactActionCreators"

export default function AdminSingleContact() {
    var [data, setData] = useState({})
    var { _id } = useParams()
    var navigate = useNavigate()
    var stateData = useSelector((state) => state.ContactStateData)
    var disptach = useDispatch()
    function getAPIData() {
        disptach(getContact())
        if (stateData.length) {
            var item = stateData.find((x) => x._id === _id)
            setData(item ?? {})
        }
    }
    function updateItem(){
        disptach(updateContact({...data,status:"Done"}))
        setData({...data,status:"Done"})
    }
    function deleteItem() {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            disptach(deleteContact({ _id: _id }))
            navigate("/admin-contact")
        }
    }
    useEffect(() => {
        getAPIData()
    }, [stateData.length])
    return (
        <div className='container-fluid my-3'>
            <div className="row">
                <div className="col-md-2">
                    <SideBar />
                </div>
                <div className="col-md-10">
                    <h5 className='bg-primary p-2 text-light rounded text-center'>Contact</h5>
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data._id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Subject</th>
                                    <td>{data.subject}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{data.message}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{data.status} {data.status === "Active" ? <button className='btn btn-primary float-right' onClick={updateItem}>Update Status to Done</button> : ""}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{data.date}</td>
                                </tr>
                                {
                                    data.status === "Done" ?
                                        <tr>
                                            <th colSpan={2}><button className='btn btn-danger' onClick={deleteItem}>Delete</button></th>
                                        </tr> : ""
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

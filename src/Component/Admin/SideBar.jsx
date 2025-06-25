import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
    return (
        <div>
            <div className="list-group">
                <Link to="/admin" className="list-group-item list-group-item-action active" aria-current="true">Home</Link>
                <Link to="/admin-user" className="list-group-item list-group-item-action">Users</Link>
                <Link to="/admin-maincategory" className="list-group-item list-group-item-action">Maincategory</Link>
                <Link to="/admin-subcategory" className="list-group-item list-group-item-action">Subcategory</Link>
                <Link to="/admin-brand" className="list-group-item list-group-item-action">Brand</Link>
                <Link to="/admin-product" className="list-group-item list-group-item-action">Product</Link>
                <Link to="/admin-newslatter" className="list-group-item list-group-item-action">Newslatter</Link>
                <Link to="/admin-checkout" className="list-group-item list-group-item-action">Checkout</Link>
                <Link to="/admin-contact" className="list-group-item list-group-item-action">Contact</Link>
            </div>
        </div>
    )
}

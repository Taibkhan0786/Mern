import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { createContact } from "../Store/ActionCreators/ContactActionCreators"
import { useDispatch } from "react-redux";
export default function Contact(props) {
  var [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    status: "Active",
  })
  var dispatch = useDispatch()
  function getInputData(e) {
    var { name, value } = e.target
    setData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  function postData(e) {
    e.preventDefault()
    var date = new Date()
    dispatch(createContact({...data,date:date.toLocaleDateString()}))
    alert("Thanks to Share Your Query With Us!!! Our Team Will Contact You Soon!!!!")
    setData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      status: "Active",
    })
  }
  return (
    <>
      {/* <!-- Breadcrumb Begin --> */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="/">
                  <i className="fa fa-home"></i> Home
                </Link>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Breadcrumb End --> */}

      {/* <!-- Contact Section Begin --> */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__content">
                <div className="contact__address">
                  <h5>Contact info</h5>
                  <ul>
                    <li>
                      <h6>
                        <i className="fa fa-map-marker"></i> Address
                      </h6>
                      <p>
                        A-43 Sector 16 Noida(201301),UP,India
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-phone"></i> Phone
                      </h6>
                      <p>
                        <span><a href="tel:9873848046" className="text-dark">9873848046</a></span>
                      </p>
                    </li>
                    <li>
                      <h6>
                        <i className="fa fa-headphones"></i> Support
                      </h6>
                      <p><a href="mailto:vishankchauhan@gmail.com" className="text-dark">vishankchauhangmail.com</a></p>
                    </li>
                  </ul>
                </div>
                <div className="contact__form">
                  <h5>SEND MESSAGE</h5>
                  <form onSubmit={postData}>
                    <input type="text" name="name" required value={data.name} onChange={getInputData} placeholder="Name" />
                    <input type="text" name="email" required value={data.email} onChange={getInputData} placeholder="Email" />
                    <input type="text" name="phone" required value={data.phone} onChange={getInputData} placeholder="Phone" />
                    <input type="text" name="subject" required value={data.subject} onChange={getInputData} placeholder="Subject" />
                    <textarea name="message" required value={data.message} onChange={getInputData} placeholder="Message" ></textarea>
                    <button type="submit" className="site-btn w-100">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=noida%20sector%2016%20a-43&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}
    </>
  );
}

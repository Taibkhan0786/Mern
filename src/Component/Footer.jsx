import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  var [email, setEmail] = useState("")
  async function postData(e) {
    e.preventDefault()
    let response = await fetch("/api/newslatter",{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({email:email})
    })
    response  = await response.json()
    if (response.result==="Fail")
      alert(response.message)
    else{
      alert("Thanks to Subscribe Our Newslatter Service our Team Will Contact You Soon!!!")
      setEmail("")
    }
  }
  return (
    <>
      {/* <!-- Footer Section Begin --> */}
      <hr />
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-7">
              <div className="footer__about">
                <div className="footer__logo banner__text">
                  <Link to="./index.html">
                    <img src="/img/logo.png" alt="" />
                  </Link>
                  {/* <h1 style={{ fontSize: "50px" }}>Vanny</h1> */}
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt cilisis.
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-5">
              <div className="footer__widget">
                <h6>Menu</h6>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/shop/All/All/All">Shop</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-8 col-sm-8">
              <div className="footer__newslatter">
                <h6>NEWSLETTER</h6>
                <form onSubmit={postData}>
                  <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email} />
                  <button type="submit" className="site-btn">
                    Subscribe
                  </button>
                </form>
                <div className="footer__social">
                  <Link to="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-youtube-play"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-instagram"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-pinterest"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Section End --> */}
    </>
  );
}

import React from "react";
import "./header.css";
export default function Header() {
  return (
    <>
      <div className="container header mt-3">
        <div className="row d-flex align-items-center">
          <div className="col-lg-6 col-12 d-lg-flex d-none flex-column justify-content-center ">
            <h1 className="py-2 title text-3xl">
              Welcome to my Web
              <br />
              Development Portofolio!
            </h1>
            <p className="content d-block font-sans fs-4 fw-normal lh-relaxed mb-4 text-body text-muted text-md-start text-xl-start py-2">
              I'm Lily Smith, a passionate web developer based in USA. Here,
              you'll get a glimpse of my journey in the world of web
              development, where creativity meets functionality.
            </p>
            <form className="py-2" action="">
            <label className="mb-3" htmlFor="">Your Email</label>
              <div className="d-flex align-items-center w-75 justify-content-center gap-2">
                <div className="form-outline d-flex align-items-center justify-content-center m-0">
                  <input
                    className="form-control"
                    type="email"
                    name=""
                    id="emailInput"
                    placeholder=" "
                  />
                  <label className="form-label" for="emailInput">
                    Enter your email
                  </label>
                </div>
                <button className="btn btn-dark">REQUIRE OFFER</button>
              </div>
            </form>
            <span>
              Read my{" "}
              <a className="text-gray" href="#">
                Terms and Conditions
              </a>
            </span>
          </div>
          <div className="col-lg-6 col-12 d-flex align-items-center">
            <img
              src="https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/image-7.svg"
              alt=""
            />
          </div>
          <div className="col-lg-6 col-12 d-lg-none d-sm-flex  flex-column justify-content-center ">
            <h1 className="py-2 title text-3xl">
              Welcome to my Web
              <br />
              Development Portofolio!
            </h1>
            <p className="content d-block font-sans fs-4 fw-normal lh-relaxed mb-4 text-body text-muted text-md-start text-xl-start py-2">
              I'm Lily Smith, a passionate web developer based in USA. Here,
              you'll get a glimpse of my journey in the world of web
              development, where creativity meets functionality.
            </p>
            <form className="py-2" action="">
            <label className="mb-2" htmlFor="">Your Email</label>
              <div className="d-flex w-100 flex-column align-items-center w-75 justify-content-center gap-2">
                <div className="form-outline w-100 d-flex align-items-center justify-content-center m-0">
                  <input
                    className="form-control"
                    type="email"
                    name=""
                    id="emailInput"
                    placeholder=" "
                  />
                  <label className="form-label" for="emailInput">
                    Enter your email
                  </label>
                </div>
                <button className="btn btn-dark mt-1 w-100">REQUIRE OFFER</button>
              </div>
            </form>
            <span>
              Read my{" "}
              <a className="text-gray" href="#">
                Terms and Conditions
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

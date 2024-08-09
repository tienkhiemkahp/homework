import React from 'react';
import './navbar.css';
export default function Header() {
  let isDisplay = false;
  const handlePopupBtn = () => {
    const popupList = document.querySelector(".popup-list")
    if (!isDisplay) {
      popupList.style.display = "block";
      isDisplay = true;
    } else {
      popupList.style.display = "none";
      isDisplay = false;
    }
  }
  return (
    <>
      <nav className="d-block py-3 bg-white text-dark border-0 sticky-top">
        <div className="container d-flex align-items-center justify-content-between">
          <p className="d-block font-weight-bold text-dark fs-4">Material Tailwind</p>
          <ul className="d-none d-lg-flex  align-items-center gap-8">
            <li>
              <a className="text-decoration-none d-flex align-items-center gap-2 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-pager"></i> Page
              </a>
            </li>
            <li>
              <a className="text-decoration-none d-flex align-items-center gap-2 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-user"></i> Account
              </a>
            </li>
            <li>
              <a className="text-decoration-none d-flex align-items-center gap-2 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-file"></i> Doc
              </a>
            </li>
          </ul>
          <div className="btn-group d-none d-lg-block">
            <button className="btn signin-btn">SIGN IN</button>
            <button className="btn blocks-btn">BLOCKS</button>
          </div>
          <button className='btn signin-btn popup-btn d-lg-none d-block' onClick={handlePopupBtn}><i class="fa-solid fa-bars"></i></button>
        </div>
        <div className='popup-list d-lg-none'>
        <ul className="py-2 gap">
            <li>
              <a className="text-decoration-none d-flex align-items-center py-1 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-pager"></i> Page
              </a>
            </li>
            <li>
              <a className="text-decoration-none d-flex align-items-center gap-2 py-1 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-user"></i> Account
              </a>
            </li>
            <li>
              <a className="text-decoration-none d-flex align-items-center gap-2 py-1 fs-6 lh-lg fw-medium text-dark" href="#">
                <i className="fa-solid fa-file"></i> Doc
              </a>
            </li>
          </ul>
          <div className="btn-group px-3 py-2">
            <button className="btn signin-btn">SIGN IN</button>
            <button className="btn blocks-btn">BLOCKS</button>
          </div>
        </div>
      </nav>
    </>
  );
}

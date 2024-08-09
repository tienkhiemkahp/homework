import React from 'react'
import './header.css'
export default function Header() {
  return (
    <>
    <div className='container header mt-3'>
        <div className="row d-flex align-items-center">
        <div className='col-lg-6 col-12 d-lg-flex d-none flex-column justify-content-center '>
            <h1 className='py-2 title text-3xl'>Welcome to my Web
                <br />
            Development Portofolio!</h1>
            <p className='py-2'>I'm Lily Smith, a passionate web developer based in USA. Here, you'll get a glimpse of my journey in the world of web development, where creativity meets functionality.</p>
            <form className='py-2' action="">
                <label htmlFor="">Your email</label>
                <input type="email" name="" id="" />
                <button>REQUIRE OFFER</button>
            </form>
            <span>Read my <a className='text-dark' href="#">Terms and Conditions</a></span>
            


        </div>
        <div className='col-lg-6 col-12 d-flex align-items-center'>
            <img src="https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/image-7.svg" alt="" />
        </div>
        <div className='col-lg-6 col-12 d-lg-none d-flex flex-column justify-content-center'>
            <h1 className='py-2'>Welcome to my Web
                <br />
            Development Portofolio!</h1>
            <p className='py-2'>I'm Lily Smith, a passionate web developer based in USA. Here, you'll get a glimpse of my journey in the world of web development, where creativity meets functionality.</p>
            <form className='py-2' action="">
                <label htmlFor="">Your email</label>
                <input type="email" name="" id="" />
                <button>REQUIRE OFFER</button>
            </form>
            <span>Read my <a href="#">Terms and Conditions</a></span>
            

        </div> 
        </div>
    </div>
    </>
  )
}

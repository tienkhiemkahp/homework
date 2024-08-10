import React from 'react'
import './section1.css';
import amazonLogo from '../../assets/clients/logo-amazon.svg';
export default function Section1() {
        let clients = [`coinbase`,`google`, `netflix`, `pinterest`,`amazon`, `spotify`]
        clients = clients.map((client) => `/src/assets/clients/logo-${client}.svg`).map((url) => <img className='mx-4 client-img' src={url} alt="" srcset="" />)
  return (
    <>
        <section className='container d-flex flex-column align-items-center mt-5 px-2 mx-auto py-5'>
            <h6 className='d-block text-base font-semibold mb-4 text-blue-gray-900'>
            My awesome clients
            </h6>
            <div className='d-flex logo-wrap flex-wrap align-items-center justify-content-center gap-7'>
            {clients}
            </div>
        </section>
    </>
  )
}

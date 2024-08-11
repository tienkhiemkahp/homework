import React from 'react'

export default function Section3() {
    let projects = [
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog-1.svg',
            title: 'Mobile App Development',
            content: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog2.svg',
            title: 'Landing Page Development',
            content: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog3.svg',
            title: 'Mobile App Development',
            content: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog4.svg',
            title: 'E-commerce development',
            content: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog-1.svg',
            title: 'Mobile App Development',
            content: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog2.svg',
            title: 'Landing Page Development',
            content: 'Promotional landing page for a fitness website Summer Campaign. Form development included.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog3.svg',
            title: 'Mobile App Development',
            content: 'Mobile app designed to help users discover and explore local restaurants and cuisines.',
        },
        {
            imgUrl: 'https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/blog4.svg',
            title: 'E-commerce development',
            content: 'Ecommerce website offering access to the latest and greatest gadgets and accessories.',
        },
      ]
      projects = projects.map(({imgUrl, title, content}) => <div className='relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none'><div className='relative bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg mx-0 mt-0 mb-6 h-48'><img src={imgUrl} alt={title} srcset="" /></div><div className='p-0'><a href="#" class="text-blue-gray-900 transition-colors no-underline hover:text-gray-800"><h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-inherit mb-2">{title}</h5></a><p class="block antialiased font-sans text-base leading-relaxed text-inherit mb-6 font-normal !text-gray-500">{content}</p><button class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" type="button">see details</button></div></div>)
  return (
    <>
    <section className='container section-2 d-flex flex-column align-items-center mt-5 px-2 mx-auto py-5'>
    <div className="container mx-auto mb-20 text-center"><h2 class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">My Projects</h2><p class="block antialiased font-sans text-xl leading-relaxed text-inherit mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12">Whether you have a mobile app idea that needs to come to life or a website that requires a facelift, I'm here to turn your digital dreams into reality.</p></div>
    <div className='container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4'>
    {projects}
    </div>
    </section>
    </>
  )
}

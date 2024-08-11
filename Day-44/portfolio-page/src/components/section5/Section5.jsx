import React from "react";
import "./section5.css";

export default function Section5() {
  const avatarUrl = [
    `https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/avatar3.jpg`,
    `https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/avatar2.jpg`,
    `https://demos.creative-tim.com/nextjs-tailwind-portfolio-page/image/avatar1.jpg`,
  ];

  const handleSlideShow = (url) => {
    const mainAvatar = document.querySelector(".main-avatar");
    const subAvatar = document.querySelector("sub-avatar")
    mainAvatar.src = url;

  };

  const avatar = avatarUrl.map((url, index) => {
    return (
      <React.Fragment key={index}>
        <img
          onClick={() => handleSlideShow(url)}
          src={url}
          alt="avatar"
          className="inline-block relative object-cover object-center w-9 h-9 sub-avatar rounded-md cursor-pointer opacity-50"
        />
        {index !== avatarUrl.length - 1 && (
          <div className="gray-line w-[1px] h-[36px] bg-blue-gray-100"></div>
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <section className="py-12 px-8 lg:py-24">
        <div className="container max-w-screen-lg mx-auto">
          <div className="container mx-auto mb-20 text-center">
            <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-4">
              What Clients Say
            </h2>
            <p className="block antialiased font-sans text-xl leading-relaxed text-inherit mx-auto w-full px-4 font-normal !text-gray-500 lg:w-8/12">
              Discover what clients have to say about their experiences working
              with me. My client's satisfaction is my greatest achievement!
            </p>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none py-8 lg:flex-row">
            <div className="p-6 w-full lg:gap-10 h-full lg:!flex justify-between">
              <div className="w-full mb-10 lg:mb-0">
                <h3 className="block antialiased tracking-normal font-sans text-3xl leading-snug text-blue-gray-900 mb-4 font-bold lg:max-w-xs">
                  Mobile App Development
                </h3>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                  I had the pleasure of working with Lily on a critical web
                  development project, and I can confidently say that their
                  expertise and professionalism exceeded my expectations.
                </p>
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-0.5">
                  Michael - Technical Manager
                </h6>
                <p className="block antialiased font-sans text-sm leading-normal text-inherit font-normal mb-5 !text-gray-500">
                  Marketing @ APPLE INC.
                </p>
                <div className="flex items-center gap-4">{avatar}</div>
              </div>
              <div className="h-[21rem] rounded-lg w-full sm:w-[18rem] shrink-0">
                <img src={avatarUrl[0]} className="main-avatar" alt="Main Avatar" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}

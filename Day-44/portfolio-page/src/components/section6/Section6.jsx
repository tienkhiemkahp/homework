import React from "react";

export default function Section6() {
  const infomation = {
    phone: `+1(424) 535 3523`,
    email: `hello@mail.com`,
  };
  return (
    <>
      <section className="px-8 py-16">
        <div className="container mx-auto mb-20 text-center">
          <h1 className="block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight text-blue-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-inherit mx-auto w-full lg:w-5/12 !text-gray-500">
            Ready to get started? Feel free to reach out through the contact
            form, and let's embark on a journey of innovation and success.
          </p>
        </div>
        <div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md container mx-auto border border-gray/50">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-7 md:gap-10">
              <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white mb-2">
                  Contact Information
                </h4>
                <p className="block antialiased font-sans font-normal text-inherit mx-auto mb-8 text-base !text-gray-500">
                  Fill up the form and our Team will get back to you within 24
                  hours.
                </p>
                <div className="flex gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white mb-2">
                    {infomation.phone}
                  </h6>
                </div>
                <div class="flex my-2 gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
                  </svg>
                  <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white mb-2">
                    {infomation.email}
                  </h6>
                </div>
              </div>
              <div class="flex mb-10 gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-6 w-6 text-white"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm15-1.125a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm-.75 3a.75.75 0 01.75.75v.75a.75.75 0 01-1.5 0v-.75a.75.75 0 01.75-.75zm.75 4.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zM6 12a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H6.75A.75.75 0 016 12zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <h6 class="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white mb-2">
                  Open Support Ticket
                </h6>
              </div>
              <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
                <form action="#">
                    <div className="mb-8 grid gap-4 lg:grid-cols-2">
                        <div className="relative w-full min-w-[200px] h-12 !min-w-full mb-3 md:mb-0">
                        <input placeholder="eg. Lucas" class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all border-b placeholder-shown:border-blue-gray-200 text-sm px-px pt-5 pb-2 border-blue-gray-200 focus:border-gray-900" name="first-name"/>
                        <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-2.5 text-sm peer-focus:text-sm after:content[' '] after:block after:w-full after:absolute after:-bottom-2.5 left-0 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight text-gray-500 peer-focus:text-gray-900 after:border-gray-500 peer-focus:after:border-gray-900">First Name </label>
                        </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

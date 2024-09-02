import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="bg-white h-screen overflow-hidden">
        <div className="relative isolate px-6 py-0 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffce46ef] to-[#fa4619] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%' }}></div>
          </div>
          <div className="mx-auto max-w-2xl py-40 ">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Direct Insurance</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Building your future? Secure it with the right insurance company.<br />
                Sign In to  the customer Portal for Direct insurance company. <br />
                Get insured instantly.Life doesn't wait for paperwork.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/signin" className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Sign Up</a>
                <a href="/services" className="text-sm font-semibold leading-6 px-3.5 py-2.5 text-gray-900 bg-gray-100 shadow-lg rounded-md">Services <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ffbd2f] to-[#ca0d00] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%' }}></div>
          </div>
        </div >
      </div >

    </>
  );
};

export default Hero;

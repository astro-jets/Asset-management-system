import { BsDoorClosed, BsPerson } from "react-icons/bs";

const Hero = () => {
    return (
        <div className="relative bg-white pb-[110px] pt-[120px] dark:bg-dark lg:pt-[150px]">
            <div className="container">
                <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 lg:w-5/12">
                        <div className="hero-content">
                            <h1 className="w-full mb-5 text-4xl font-bold !leading-[1.208] text-primary dark:text-white sm:text-[42px] lg:text-[40px] xl:text-5xl">
                                Asset management system.
                            </h1>
                            <p className="mb-8 max-w-[480px] text-base text-body-color dark:text-dark-6">
                                Get started by clicking the Dashboard button to log in to your dashboard or click the sign up button to vreate your account.
                            </p>
                            <ul className="flex flex-wrap items-center space-x-4 justify-between">
                                <li>
                                    <a
                                        href="/admin/dashboard"
                                        className=" bg-[#f3f3f3] text-black shadow-4 rounded-lg inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium"
                                    >
                                        <span><BsPerson size={20} color="#111" /></span>
                                        Dashboad
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/signup"
                                        className=" bg-primary text-white shadow-4 rounded-lg inline-flex items-center justify-center px-5 py-3 text-center text-base font-medium"
                                    >
                                        <span><BsDoorClosed size={20} color="#fff" /></span>
                                        Sign Up
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden px-4 lg:block lg:w-1/12"></div>
                    <div className="w-full px-4 lg:w-6/12">
                        <div className="lg:ml-auto lg:text-right">
                            <div className="relative z-10 inline-block pt-11 lg:pt-0">
                                <img
                                    src="/images/task/task-01.jpg"
                                    alt="hero"
                                    className="max-w-full lg:ml-auto rounded-2xl"
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;


const SingleImage = ({ href, imgSrc }: { href: string; imgSrc: string }) => {
    return (
        <>
            <a href={href} className="flex w-full items-center justify-center">
                <img src={imgSrc} alt="brand image" className="h-10 w-full" />
            </a>
        </>
    );
};
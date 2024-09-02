import Link from 'next/link';
import React from 'react'
import { BsHeadset } from 'react-icons/bs';

const HelpPage = () => {
    const primary = 'bg-primary text-white rounded-lg p-4'; // Assuming primary is set to blue-500

    return (
        <div className="container mx-auto px-4 py-40">
            <h1 className={`text-3xl font-bold space-x-4 mb-8 flex ${primary}`}>
                <span>Quick Pas Help Center</span>
                <BsHeadset color='#fff' size={40} />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`card p-4 rounded-lg shadow-md ${primary}`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Enrolling in a Course</h2>
                    <p className="text-[#4b4b4b]">
                        To enroll in a course, simply visit our Courses page and select the program that best suits your needs. Once you've chosen a course, click the "Enroll Now" button and follow the on-screen instructions. You can pay for your course online using a debit or credit card.
                    </p>
                    <p className="text-[#4b4b4b]">
                        If you have any questions about enrolling in a course, please don't hesitate to contact us at +265 88 088 088 08 or email us at
                        <span className='text dark'> info@quickpass.com</span>
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md ${primary}`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Booking Lessons</h2>
                    <p className="text-[#4b4b4b]">
                        Once you're enrolled in a course, you will be alerted when your lesson has been created via the website and your email as well. The detail will contain the start date of the lesson.
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md ${primary}`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Payment Options</h2>
                    <p className="text-[#4b4b4b]">
                        We accept all major credit and debit cards for online payments. You can also pay for your course or lessons in person at our driving school office.
                    </p>
                    <p className="text-[#4b4b4b]">
                        We offer installment plans for some of our courses. If you're interested in learning more about our financing options, please contact our office.
                    </p>
                </div>
                <div className={`card p-4 rounded-lg shadow-md ${primary}`}>
                    <h2 className="text-xl font-semibold mb-2 text-dark">Cancellation Policy</h2>
                    <p className="text-[#4b4b4b]">
                        We understand that things come up, so we allow you to cancel your course enrollment or driving lessons with at least 24 hours notice without penalty. If you cancel with less than 24 hours notice, you may be subject to a cancellation fee.
                    </p>
                    <p className="text-[#4b4b4b]">
                        For more information about our cancellation policy, please refer to our <Link className='text-primary' href={'/tcs'}>Terms and Conditions</Link>.
                    </p>
                </div>
            </div>

            <div className="text-center mt-8 flex flex-col items-center justify-center space-y-4">
                <p className="text-gray-500">Still have questions? Contact our friendly staff today!</p>
                <a href="/contats" className={`${primary}`}>Contact Us</a>
            </div>
        </div>
    )
}

export default HelpPage

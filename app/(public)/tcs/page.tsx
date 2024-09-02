import React from 'react'

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-40">
            <h1 className="text-3xl font-bold mb-8 text-center">QuickPass Driving School - Terms and Conditions</h1>

            <div className="prose text-gray-700">
                <p>
                    Welcome to QuickPass Driving School! These terms and conditions outline the rules and regulations
                    governing your use of our website and driving courses.</p>

                <h2 className="text-xl font-semibold mt-4">Enrollment and Payment</h2>
                <ul className="list-disc pl-4">
                    <li>To enroll in a course, you must be at least 18 years old and possess a valid learner's permit.</li>
                    <li>Course fees must be paid in full at the time of enrollment. We accept all major credit and debit cards.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">Cancellations and Refunds</h2>
                <ul className="list-disc pl-4">
                    <li>No refunds will be issued for missed lessons or cancellations with less than 24 hours notice.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">Disclaimer</h2>
                <p>QuickPass Driving School strives to provide quality driving instruction. However, we cannot guarantee that you will pass your driving test on the first attempt. Your success depends on your individual effort and adherence to traffic laws.</p>

                <p className="mt-4">These Terms and Conditions are subject to change at any time. We will notify you of any material changes by posting the revised Terms on our website. Your continued use of the Service constitutes your acceptance of the revised Terms.</p>

                <p className="mt-4">If you have any questions about these Terms and Conditions, please contact us at [phone number] or [email address].</p>
            </div>
        </div>
    )
}

export default TermsAndConditions

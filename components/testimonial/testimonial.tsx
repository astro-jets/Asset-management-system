const TestimonialComponent = () => {
    return (
        <div className="container-xxl py-6">
            <div className="container">
                <div className="text-center mx-auto mb-5 wow fadeInUp max-w-[500px]" data-wow-delay="0.1s">
                    <h6 className="text-primary text-uppercase mb-2">Testimonial</h6>
                    <h1 className="display-6 mb-4">What Our Clients Say!</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="owl-carousel testimonial-carousel">
                            <div className="testimonial-item text-center">
                                <div className="position-relative mb-5">
                                    <img className="img-fluid rounded-circle mx-auto" src="/images/testimonial-1.jpg" alt="" />
                                    <div className="w-[60px] h-[60px] position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle">
                                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <p className="fs-4">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.</p>
                                <hr className="w-25 mx-auto" />
                                <h5>Client Name</h5>
                                <span>Profession</span>
                            </div>
                            <div className="testimonial-item text-center">
                                <div className="position-relative mb-5">
                                    <img className="img-fluid rounded-circle mx-auto" src="/images/testimonial-2.jpg" alt="" />
                                    <div className="w-[60px] h-[60px] position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle">
                                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <p className="fs-4">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.</p>
                                <hr className="w-25 mx-auto" />
                                <h5>Client Name</h5>
                                <span>Profession</span>
                            </div>
                            <div className="testimonial-item text-center">
                                <div className="position-relative mb-5">
                                    <img className="img-fluid rounded-circle mx-auto" src="/images/testimonial-3.jpg" alt="" />
                                    <div className="position-absolute top-100 start-50 translate-middle d-flex align-items-center justify-content-center bg-white rounded-circle w-[60px] h-[60px]">
                                        <i className="fa fa-quote-left fa-2x text-primary"></i>
                                    </div>
                                </div>
                                <p className="fs-4">Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.</p>
                                <hr className="w-25 mx-auto" />
                                <h5>Client Name</h5>
                                <span>Profession</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestimonialComponent;
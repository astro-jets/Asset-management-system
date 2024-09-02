const AboutComponent = () => {
    return (
        <div className="container-xxl py-6">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="position-relative overflow-hidden ps-5 pt-5 h-100 min-h-[400px]">
                            <img className="position-absolute w-100 h-100 object-cover" src="/images/about-1.jpg" alt="" />
                            <img className="position-absolute top-0 start-0 bg-white pe-3 pb-3 w-[200px] h-[200px]" src="/images/about-2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="h-100">
                            <h6 className="text-primary text-uppercase mb-2">About Us</h6>
                            <h1 className="display-6 mb-4">We Help Students To Pass Test & Get A License On The First Try</h1>
                            <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="row g-2 mb-4 pb-2">
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2"></i>Fully Licensed
                                </div>
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2"></i>Online Tracking
                                </div>
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2"></i>Afordable Fee
                                </div>
                                <div className="col-sm-6">
                                    <i className="fa fa-check text-primary me-2"></i>Best Trainers
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-sm-6">
                                    <a className="btn btn-primary py-3 px-5" href="">Read More</a>
                                </div>
                                <div className="col-sm-6">
                                    <a className="d-inline-flex align-items-center btn btn-outline-primary border-2 p-2" href="tel:+0123456789">
                                        <span className="flex-shrink-0 btn-square bg-primary">
                                            <i className="fa fa-phone-alt text-white"></i>
                                        </span>
                                        <span className="px-3">+012 345 6789</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutComponent;
import React from "react"
const CarouselItem = ({ image, headingUpper, headingLower, description, reverse = false }) => (
    <section className="page-section">
        <div className="container">
            <div className="product-item">
                <div className="product-item-title d-flex">
                    <div className={`bg-faded p-5 d-flex ${reverse ? 'me-auto' : 'ms-auto'} rounded`}>
                        <h2 className="section-heading mb-0">
                            <span className="section-heading-upper">{headingUpper}</span>
                            <span className="section-heading-lower">{headingLower}</span>
                        </h2>
                    </div>
                </div>
                <img className="product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0" src={image} alt="..." />
                <div className={`product-item-description d-flex ${reverse ? 'ms-auto' : 'me-auto'}`}>
                    <div className="bg-faded p-5 rounded">
                        <p className="mb-0">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default CarouselItem;

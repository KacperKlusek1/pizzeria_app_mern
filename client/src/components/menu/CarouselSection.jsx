import React from "react"
import CarouselItem from './CarouselItem.jsx';

const CarouselSection = ({ items }) => (
    <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
            {items.map((_, index) => (
                <button
                    key={index}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                    aria-current={index === 0}
                    aria-label={`Slide ${index + 1}`}
                ></button>
            ))}
        </div>
        <div className="carousel-inner">
            {items.map((item, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <CarouselItem {...item} reverse={index % 2 !== 0} />
                </div>
            ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
);

export default CarouselSection;

import React from "react"
export default function StoreSection({ days, address, phone }) {
    const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
        <section className="page-section cta">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-5">
                                <span className="section-heading-upper">Zapraszamy!</span>
                                <span className="section-heading-lower">Jesteśmy otwarci w</span>
                            </h2>
                            <ul className="list-unstyled list-hours mb-5 text-left mx-auto">
                                {days.map(({ day, hours }, index) => (
                                    <li
                                        key={index}
                                        className={`list-unstyled-item list-hours-item d-flex ${
                                            index === todayIndex ? 'today' : ''
                                        }`}
                                    >
                                        {day}
                                        <span className="ms-auto">{hours}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="address mb-5">
                                <em>{address}</em>
                            </p>
                            <p className="mb-0">
                                <small><em>Numer Kontaktowy</em></small>
                                <br />
                                {phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

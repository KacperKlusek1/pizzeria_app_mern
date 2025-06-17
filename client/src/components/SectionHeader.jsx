import React from 'react';

export default function SectionHeader({ headingUpper, headingLower, children }) {
    return (
        <section className="page-section cta">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper">{headingUpper}</span>
                                <span className="section-heading-lower">{headingLower}</span>
                            </h2>
                                {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

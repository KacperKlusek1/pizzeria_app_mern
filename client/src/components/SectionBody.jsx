import React from 'react';

const SectionBody = ({
                          imageSrc,
                          headingUpper,
                          headingLower,
                          paragraphs = [],
                          isMap = false,
                          mapEmbedUrl = ''
                      }) => {
    return (
        <section className="page-section about-heading">
            <div className="container">
                {isMap ? (
                    <iframe
                        className="w-100 mb-n2"
                        style={{ height: '450px' }}
                        src={mapEmbedUrl}
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                        title="Map location"
                    ></iframe>
                ) : (
                    <img
                        className="img-fluid rounded about-heading-img mb-3 mb-lg-0"
                        src={imageSrc}
                        alt="..."
                    />
                )}

                <div className="about-heading-content">
                    <div className="row">
                        <div className="col-xl-9 col-lg-10 mx-auto">
                            <div className="bg-faded rounded p-5">
                                <h2 className="section-heading mb-4">
                                    <span className="section-heading-upper">{headingUpper}</span>
                                    <span className="section-heading-lower">{headingLower}</span>
                                </h2>

                                {paragraphs.map((text, index) => (
                                    <p
                                        key={index}
                                        className={index === paragraphs.length - 1 ? 'mb-0' : ''}
                                        dangerouslySetInnerHTML={{ __html: text }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionBody;

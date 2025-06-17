import React, { useRef } from 'react';

export default function IntroSection({ image, audio, headingUpper, headingLower, paragraph, buttonText, buttonHref }) {
    const audioRef = useRef(null);

    const handleBeep = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <section className="page-section clearfix">
            <div className="container">
                <div className="intro">
                    <div className="intro-img-container">
                        <img
                            className="intro-img img-fluid mb-3 mb-lg-0 rounded"
                            src={image}
                            alt="Intro"
                        />
                        <button onClick={handleBeep} className="center-button btn-xl"></button>
                        <audio ref={audioRef} src={audio}></audio>
                    </div>
                    <div className="intro-text left-0 text-center bg-faded p-5 rounded">
                        <h2 className="section-heading mb-4">
                            <span className="section-heading-upper">{headingUpper}</span>
                            <span className="section-heading-lower">{headingLower}</span>
                        </h2>
                        <p className="mb-3">{paragraph}</p>
                        <div className="intro-button mx-auto">
                            <a className="btn btn-primary btn-xl" href={buttonHref}>
                                {buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

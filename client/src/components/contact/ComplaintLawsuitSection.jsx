import React, { useState } from 'react';
import ComplaintForm from './ComplaintForm.jsx';
import LawsuitForm from './LawsuitForm.jsx';

export default function ComplaintLawsuitSection() {
    const [activeForm, setActiveForm] = useState(null);

    const toggleForm = (type) => {
        setActiveForm(prev => (prev === type ? null : type));
    };

    return (
        <>
            <div className="d-flex gap-2 mb-4 justify-content-center">
                <button
                    className={`btn ${activeForm === "complaint" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => toggleForm("complaint")}
                    type="button"
                >
                    Złóż skargę
                </button>
                <button
                    className={`btn ${activeForm === "lawsuit" ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => toggleForm("lawsuit")}
                    type="button"
                >
                    Złóż pozew
                </button>
            </div>

            {activeForm === "complaint" && <ComplaintForm />}
            {activeForm === "lawsuit" && <LawsuitForm />}
        </>
    );
}
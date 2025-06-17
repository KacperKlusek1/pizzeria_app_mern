import React, { useState } from 'react';
import FormItem from "./FormItem.jsx";

export default function LawsuitForm() {
    const [plaintiff, setPlaintiff] = useState("")
    const [caseNumber, setCaseNumber] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [documents, setDocuments] = useState([])

    const handleFileChange = (files) => {
        if (files.length > 5) {
            alert("Można przesłać maksymalnie 5 plików PDF.");
            return;
        }
        setDocuments(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (documents.length === 0) {
            alert("Musisz załączyć przynajmniej jeden dokument PDF!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('plaintiff', plaintiff);
            formData.append('caseNumber', caseNumber);
            formData.append('subject', subject);
            formData.append('message', message);

            documents.forEach((file) => {
                formData.append('documents', file);
            });

            const response = await fetch('http://localhost:5000/api/lawsuits', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert('Pozew został pomyślnie złożony!');
                setPlaintiff('');
                setCaseNumber('');
                setSubject('');
                setMessage('');
                setDocuments([]);
            } else {
                alert(`Błąd: ${data.message}`);
            }
        } catch (error) {
            console.error('Błąd podczas składania pozwu:', error);
            alert('Wystąpił błąd podczas składania pozwu');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormItem
                label="Powód:"
                type="text"
                value={plaintiff}
                onChange={(e) => setPlaintiff(e.target.value)}
                required={true}
            />
            <FormItem
                label="Numer sprawy:"
                type="text"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                required={true}
            />
            <FormItem
                label="Temat:"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required={true}
            />
            <FormItem
                label="Szczegóły pozwu:"
                type="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Opisz szczegółowo podstawy prawne swojego roszczenia..."
                required={true}
                rows={5}
            />
            <FormItem
                label="Załączniki (maks. 5 plików PDF):"
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => handleFileChange(Array.from(e.target.files))}
            />
            <button type="submit" className="btn btn-primary mt-3">
                Złóż pozew
            </button>
        </form>
    );
}
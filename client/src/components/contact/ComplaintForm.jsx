import React, { useState } from 'react';
import FormItem from "./FormItem.jsx";
import Swal from "sweetalert2";

export default function ComplaintForm() {
    const [complaintMessage, setComplaintMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Skarga wysłana",
            text: "Weźmiemy sobie twoje uwagi do serca",
            confirmButtonText: "OK"
        }).then(() => setComplaintMessage(""));
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormItem
                label="Treść skargi:"
                type="textarea"
                value={complaintMessage}
                onChange={(e) => setComplaintMessage(e.target.value)}
                placeholder="Opisz dokładnie, na co chcesz złożyć skargę..."
                required={true}
                rows={5}
            />
            <button type="submit" className="btn btn-primary mt-3">
                Wyślij skargę
            </button>
        </form>
    );
}
import React from 'react';
import FormItem from "../contact/FormItem.jsx";

export default function UserInfoForm({ fullname, setFullname, contactInfo, setContactInfo }) {
    return (
        <>
            <FormItem
                label="Imię i nazwisko:"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
            />
            <FormItem
                label="Dane kontaktowe:"
                type="email"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
            />
        </>
    );
}
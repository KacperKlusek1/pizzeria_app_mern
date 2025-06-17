import React from 'react';
import { Helmet } from "react-helmet-async";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useUserData } from "../hooks/useUserData.js";
import SectionHeader from "../components/SectionHeader.jsx";
import ReservationForm from "../components/contact/ReservationForm.jsx";
import ComplaintLawsuitSection from "../components/contact/ComplaintLawsuitSection.jsx";

export default function Contact() {
    const { user } = useAuthContext();
    const { fullname, username, email, status } = useUserData(user);

    const userData = user ? {
        fullname,
        username,
        email,
        status,
        _id: user._id
    } : null;

    const userID = user?._id || null;

    return (
        <>
            <Helmet>
                <title>"Kontakt – Pizzeria Misia Fryderyka"</title>
                <meta name="description" content="Jak się do nas odezwać" />
            </Helmet>

            <SectionHeader
                headingUpper="Pizzeria tylko dla ciebie!"
                headingLower="Zarezerwuj wolny termin!"
            >
                <ReservationForm
                    user={user}
                    userData={userData}
                    userID={userID}
                />
            </SectionHeader>

            <SectionHeader
                headingUpper="Masz problem?"
                headingLower="Złóż skargę lub pozew!"
            >
                <ComplaintLawsuitSection />
            </SectionHeader>
        </>
    );
}
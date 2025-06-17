import React from "react"
import SectionBody from '../components/SectionBody.jsx';
import StoreSection from '../components/store/StoreSection.jsx';
import {Helmet} from "react-helmet-async";

export default function Store() {
        return (
        <>
            <Helmet>
                <title>Godziny otwarcia - Pizzeria Misia Fryderyka</title>
                <meta name="description" content="Kiedy możesz do nas wpaść!" />
            </Helmet>
            <StoreSection
                days={[
                    { day: "Poniedziałek", hours: "9:00 AM - 10:00 PM" },
                    { day: "Wtorek", hours: "9:00 AM - 10:00 PM" },
                    { day: "Środa", hours: "9:00 AM - 10:00 PM" },
                    { day: "Czwartek", hours: "9:00 AM - 10:00 PM" },
                    { day: "Piątek", hours: "9:00 AM - 10:00 PM" },
                    { day: "Sobota", hours: "10:00 AM - 5:00 PM" },
                    { day: "Niedziela", hours: "Zamknięte" }
                ]}
                address="Zygmunta Augusta, Felin, Lublin"
                phone="123-456-789"
            />

            <SectionBody
                imageSrc="/images/birthday.jpg"
                headingUpper="Fryderyk na wyłączność"
                headingLower="Zarezerwuj restaurację już dziś"
                paragraphs={[
                    "Restauracja Misia Fryderyka to nie tylko miejsce spontanicznych obiadów i dobrej zabawy, ale też okazja na przeżycie chwil których nie zapomni się do końca swych dni. Zadzwoń już teraz aby zarezerwować restaurację na dowolną imprezę w twoim wykonaniu.",
                    `Nasza wykwalifikowana kadra zapewni lokal, dekoracje, występy w strojach naszych maskotek, całodobowy dostęp do basenu z kulkami, nielimitowaną pizzę i wiele więcej! Wasze dzieci będą <strong>umierały</strong> z radości.`
                ]}
            />
        </>
    );
}

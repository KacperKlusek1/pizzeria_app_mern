import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionBody from "../components/SectionBody.jsx";

export default function About() {
    return (
        <>
            <Helmet>
                <title>"O nas – Pizzeria Misia Fryderyka"</title>
                <meta name="description"
                      content="Poznaj historię Pizzerii Misia Fryderyka – od pierwszej lokacji w Bydgoszczy po aktualne atrakcje i lokalizację."/>
            </Helmet>
            <SectionBody
                imageSrc="/images/pizzeria.jpg"
                headingUpper="Niesamowita pizza, niesamowite korzenie"
                headingLower="O początkach Fryderyka"
                paragraphs={[
                    `Założona w 1983 przez dwóch przyjaciół, Pizzeria Misia Fryderyka to miejsce które
        łączy miłość do pizzy, maskotek i dobrej zabawy. Pierwsza lokacja działała przez
        4 lata w Bydgoszczy, lecz po okresie niefortunnych wydarzeń musiała zostać
        zamknięta. Pizzeria Misia Fryderyka została reaktywowana rok później tutaj, na
        Felinie, i od tamtej pory cieszy zarówno dzieci jak i dorosłych po dziś
        dzień!`
                ]}
            />
            <SectionBody
                imageSrc="/images/ballpit.jpg"
                headingUpper="Śmiertelnie niezwykłe przeżycia"
                headingLower="Nasze atrakcje"
                paragraphs={[
                    `Nasza restauracja oferuje wiele atrakcji dla każdego, od najmłodszego misia do
        starszych milusińskich. Poza zasmakowaniem naszej fantastycznej pizzy będziecie
        mogli spotkać nasze maskotki, zabawić się w bezdennym basenie z kulkami, zagrać
        na automatach do gry wprost z lat '80, i wiele więcej!`,
                    `Pizzeria Misia Fryderyka to miejsce które sprawi że
        <em>stracicie oddech</em>
        ze względu na możliwości dobrej zabawy.`
                ]}
            />
            <SectionBody
                isMap={true}
                mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d312.3768453915056!2d22.629637618461945!3d51.21880369736253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722568935f7c7d7%3A0xee488ebbf038fd3e!2sZygmunta%20Augusta%2C%20Lublin!5e0!3m2!1spl!2spl!4v1717861572532!5m2!1spl!2spl"
                headingUpper="Centrum wspaniałej przygody"
                headingLower="Gdzie nas znaleźć"
                paragraphs={[
                    `Jedyna obecnie otwarta lokacja Pizzerii Misia Fryderyka znajduje się na ulicy
        Zygmunta Augusta w Lublinie. W przyszłości planujemy rozszerzenie franczyzy na
        inne miasta w Polsce i nie tylko, więc pozostańcie z nami i oczekujcie wieści o
        nowych otwarciach!`
                ]}
            />
        </>
    );
}

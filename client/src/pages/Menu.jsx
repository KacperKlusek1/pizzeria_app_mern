import React from "react"
import SectionBody from '../components/SectionBody.jsx';
import CarouselSection from "../components/menu/CarouselSection.jsx";
import {Helmet} from "react-helmet-async";

export default function Menu() {
    const carouselItems = [
        {
            image: "/images/pizza1.jpg",
            headingUpper: "Nic nie przebije klasyki",
            headingLower: "Niedźwiedzia Porcja",
            description: `Specjał Fryderyka to idealna pozycja na rozpoczęcie wieczoru. 
                          Obficie posypana aromatycznymi plastrami pepperoni, skąpana w rozciągliwym serze 
                          i serwowana na chrupiącym, złocistym cieście. Idealna dla tych, którzy lubią zwyczajnie 
                          nadzwyczajną pizzę z niepowtarzalnym smakiem.`
        },
        {
            image: "/images/pizza2.jpg",
            headingUpper: "Przysmak każdego nielota",
            headingLower: "Kurka Wodna",
            description: `Przyrządzona przez naszą pierzastą kucharkę, Kurka Wodna to wyjątkowe połączenie 
                          czterech serów: mozzarella, cheddar, gorgonzola i parmezan, które razem tworzą symfonię, 
                          jakiej jeszcze nie doświadczyliście. Idealna dla miłośników sera.`
        },
        {
            image: "/images/pizza3.jpg",
            headingUpper: "Przysmak każdej gwiazdy",
            headingLower: "Skoczna Melodia",
            description: `Ta hawajska kompozycja łączy w sobie soczystą szynkę, słodki ananas i roztopiony ser 
                          na złocistym cieście. Każdy kęs to eksplozja smaków, która przeniesie Was na scenę pełną emocji.`
        },
        {
            image: "/images/pizza4.jpg",
            headingUpper: "Prawdziwy skarb każdego pirata",
            headingLower: "Lisi Łup",
            description: `Obfitość soczystego salami, pikantnych jalapeno i wyrazistych oliwek tworzy niezapomnianą 
                          eksplozję smaków na chrupiącym cieście. Idealny wybór dla tych, którzy pragną posmakować przygody!`
        }
    ];

    return (
        <>
            <Helmet>
                <title>Oferta - Pizzeria Misia Fryderyka</title>
                <meta name="description" content="Klasyki się nie starzeją!"/>
            </Helmet>
            <SectionBody
                imageSrc="/images/pizzabanner.jpg"
                headingUpper="Sprawdź czym się najesz"
                headingLower="Nasza oferta"
                paragraphs={[
                    "W naszym menu znajdziecie różnorodne dania, które zadowolą nawet najbardziej wybrednych smakoszy! Pamiętajcie jednak, że nasze specjały to nie tylko pyszne pizze, ale także wyśmienita zabawa.",
                    `Nasze pizze występują w rozmiarach:
        <ul>
            <li>Małym (30 cm)</li>
            <li>Familijnym (45 cm)</li>
            <li>Imprezowym (60 cm)</li>
        </ul>
        Wykonujemy je z najwyższej jakości składników, takich jak nowoczesna bezglutenowa mąka na bazie owadów, salami o zadowalającej zawartości mięsa oraz ser pleśniowy własnej roboty!`
                ]}
            />

            <CarouselSection items={carouselItems}/>
        </>
    );
}

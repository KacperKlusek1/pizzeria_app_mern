import { Helmet } from "react-helmet-async";
import IntroSection from '../components/home/IntroSection.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import React from "react";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>"Pizzeria Misia Fryderyka"</title>
                <meta name="description" content="Magicznym miejscu zarówno dla dzieci i dorosłych gdzie frajda nabiera życia." />
            </Helmet>
            <IntroSection
                image="/images/intro.png"
                audio="/beep.mp3"
                headingUpper="Gdzie wyobraźnia i zabawa"
                headingLower="nabiera życia!"
                paragraph="Witamy w Pizzerii Misia Fryderyka. Magicznym miejscu zarówno dla dzieci i dorosłych gdzie frajda nabiera życia. Fryderyk Entertainment nie ponosi odpowiedzialności za szkody na życiu i mieniu."
                buttonText="Odwiedź nas już dziś!"
                buttonHref="/store"
            />
            <SectionHeader
                headingUpper="Miejsce pełne"
                headingLower="wrażeń"
            >
                <p className="mb-0">
                    `Gdy tylko przekroczysz próg naszej restauracji, znajdziesz się w miejscu pełnym frajdy, wspaniałych wspomnień i nieziemskiej pizzy. Nasza niepowtarzalna atmosfera sprawi że <em>stracisz głowę</em> od naporu wrażeń!`
                </p>
                <div className="intro-button mx-auto mt-4">
                    <a className="btn btn-primary btn-xl" href="/about">
                        Sprawdź co cię czeka!
                    </a>
                </div>
            </SectionHeader>
        </>
    );
}

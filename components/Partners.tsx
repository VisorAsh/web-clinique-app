import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";

interface PartnerLogo {
    src: string;
    alt: string;
}

const Partners: React.FC = () => {
    const partners: PartnerLogo[] = [
        { src: '../imgs/ascoma.jpeg', alt: 'ASCOMA' },
        { src: '../imgs/snu.jpeg', alt: 'SNU' },
        { src: '../imgs/olea.jpeg', alt: 'OLEA' },
        { src: '../imgs/sanlam.jpeg', alt: 'SANLAM' },
        { src: '../imgs/gca.jpeg', alt: 'GCA' },
        { src: '../imgs/transvietg.jpeg', alt: 'TRANSVIET' },
        { src: '../imgs/lacitoyenne.jpeg', alt: 'LA CITOYENNE' },
        { src: '../imgs/ask.jpeg', alt: 'ASK' },
    ];

    return (
        <>
            {/* Section de témoignage/statistiques */}
            <section id="parteners" className="py-16 bg-blue-50">
                <div className="container mx-auto px-4 py-20">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-1/2 text-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
                                    Nous avons servi plus de 2000+ patients
                                </h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                                <p className="text-gray-600 leading-relaxed">
                                    Nous sommes fiers d'annoncer que nous avons l'honneur de servir plus de 2000+
                                    patients jusqu'à présent. Chaque patient est unique pour nous, et nous avons
                                    donné notre expertise et notre dévouement à leur offrir des soins de la plus
                                    haute qualité.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section des partenaires */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center mb-12">
                        <div className="w-full lg:w-7/12 text-center">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-4">
                                    Des partenaires qui nous soutiennent
                                </h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                            </div>
                        </div>
                    </div>

                    {/* Carousel des logos de partenaires */}
                    <div className="px-12">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {partners.map((partner, index) => (
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                        <div className="flex justify-center items-center p-4">
                                            <img
                                                src={partner.src}
                                                alt={partner.alt}
                                                className="max-w-full max-h-24 object-contain transition-all duration-300 hover:scale-110"
                                                // grayscale hover:grayscale-0
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </Carousel>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Partners;

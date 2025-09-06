import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ServiceItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description }) => (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-blue-500">
        <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="text-blue-600 mb-4 p-3 bg-blue-50 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </CardContent>
    </Card>
);

const Services: React.FC = () => {
    const services = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: 'Services de laboratoire',
            description: 'Analyses sanguines, tests diagnostiques et examens de laboratoire de pointe.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: 'Services de cardiologie',
            description: 'Soins cardiaques complets, diagnostics et prévention des maladies cardiovasculaires.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
            ),
            title: 'Services dentaire',
            description: 'Soins dentaires complets, blanchiment, implants et orthodontie.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Chirurgie du corps',
            description: 'Interventions chirurgicales spécialisées avec technologies de pointe.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'Neurologie',
            description: 'Diagnostic et traitement des troubles du système nerveux.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Gynécologie',
            description: 'Soins de santé complets pour les femmes à toutes les étapes de la vie.'
        },
    ];

    return (
        <section id="services" className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <div className="w-full lg:w-7/12 text-center">
                        <div className="mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                                Soins primés aux patients
                            </h2>
                            <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
                            <p className="text-gray-600 leading-relaxed">
                                Nous croyons fermement que chaque patient mérite une attention personnalisée
                                et une approche holistique de la médecine. C'est pourquoi notre équipe médicale
                                qualifiée et dévouée met tout en œuvre pour comprendre les besoins uniques de
                                chaque individu et élaborer des plans de traitement adaptés.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

"use client";

import { Card, CardContent } from "../components/ui/card";

export default function Slider() {
    return (
        <section className="relative md:mb-72">
            {/* Banner avec image et overlay */}
            <div className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center">
                <img
                    src="../imgs/banner.jpg"
                    alt="Clinique Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay bleu dégradé */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-600/40" />

                {/* Texte centré */}
                <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                    <p className="uppercase tracking-wider text-xs md:text-sm mb-2 md:mb-3">
                        SOLUTION DE SOINS DE SANTÉ GLOBALE
                    </p>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                        Votre Partenaire De Santé Le Plus Fiable
                    </h1>
                    <p className="mb-6 md:mb-8 text-base md:text-lg">
                        Nous comprenons l&apos;importance de choisir un établissement médical de
                        confiance, où vous vous sentez à l&apos;aise et en sécurité. C&apos;est pourquoi
                        nous nous engageons à fournir des soins de la plus haute qualité, avec une
                        équipe médicale expérimentée et attentionnée.
                    </p>
                    <a
                        href="#appointment"
                        className="bg-white text-blue-700 hover:bg-blue-50 px-4 md:px-6 py-2 md:py-3 rounded-md font-medium inline-flex items-center text-sm md:text-base"
                    >
                        Programmer un rendez-vous
                        {/* <svg
                            className="ml-2 w-4 h-4 md:w-5 md:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                        </svg> */}
                    </a>
                </div>
            </div>

            {/* Cards positionnées en bas de la bannière */}
            <div className="mt-8 md:mt-0 md:absolute md:inset-x-0 md:-bottom-56 px-2 md:px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <Card className="shadow-xl">
                        <CardContent className="p-6 md:p-8 text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg
                                    className="w-6 h-6 md:w-8 md:h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Services 24/24</h4>
                            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                                Obtenez un soutien à tout moment pour toute urgence. Nous avons
                                introduit le principe de la médecine familiale.
                            </p>
                            <a
                                href="#appointment"
                                className="bg-blue-600 text-white hover:bg-blue-700 px-4 md:px-6 py-2 rounded-md font-medium inline-block text-sm md:text-base"
                            >
                                Programmer un rendez-vous
                            </a>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="shadow-xl">
                        <CardContent className="p-6 md:p-8 text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg
                                    className="w-6 h-6 md:w-8 md:h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Heure de travail</h4>
                            <ul className="text-left space-y-1 md:space-y-2 mb-4 md:mb-6 text-gray-600 text-sm md:text-base">
                                <li className="flex justify-center gap-4">
                                    <span>Dim - Mer :</span> <span className="font-medium">8:00 - 17:00</span>
                                </li>
                                <li className="flex justify-center gap-4">
                                    <span>Jeu - Ven :</span> <span className="font-medium">9:00 - 17:00</span>
                                </li>
                                <li className="flex justify-center gap-4">
                                    <span>Sam - Dim :</span> <span className="font-medium">10:00 - 17:00</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="shadow-xl">
                        <CardContent className="p-6 md:p-8 text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <svg
                                    className="w-6 h-6 md:w-8 md:h-8 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Cas d&apos;urgence</h4>
                            <p className="text-gray-600 text-sm md:text-base">
                                Obtenez un soutien à tout moment pour toute urgence. Nous avons
                                introduit le principe de la médecine familiale.
                            </p>
                            <p className="text-blue-600 font-bold mt-2 md:mt-4 text-base md:text-lg">+228 90 81 07 44</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}

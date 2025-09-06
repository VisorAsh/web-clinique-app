'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Coordonnee {
  Mail: string;
  Adresse: string;
  Telephone: string;
  Telephone2: string;
}

interface HeaderProps {
  liste_coordonnee: Coordonnee[];
}

export default function Header({ liste_coordonnee }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      {/* Section des coordonnées */}
      {liste_coordonnee.map((coo, index) => (
        <div key={index} className="bg-blue-700 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-2 lg:space-y-0">
              {/* Informations de contact */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm">
                <a 
                  href={`mailto:${coo.Mail}`} 
                  className="flex items-center hover:text-blue-200 transition-colors"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="truncate">{coo.Mail}</span>
                </a>
                <div className="flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-center sm:text-left">{coo.Adresse}</span>
                </div>
              </div>
              
              {/* Numéros de téléphone */}
              <div className="text-xs sm:text-sm lg:text-base">
                <a 
                  href={`tel:${coo.Telephone}`} 
                  className="flex flex-col sm:flex-row items-center hover:text-blue-200 transition-colors"
                >
                  <span className="text-center sm:text-left">Appelez Maintenant : </span>
                  <span className="font-bold sm:ml-1 mt-1 sm:mt-0">
                    {coo.Telephone} / {coo.Telephone2}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation principale */}
      <nav className="bg-white shadow-md relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
              <img 
                src="../imgs/Clinique_-_Logo-removebg-preview.png" 
                alt="Clinique Totsi" 
                className="h-12 sm:h-16 lg:h-20 w-auto" 
              />
            </Link>

            {/* Menu desktop */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <Link href="/" className="text-blue-600 font-medium hover:text-blue-800 transition-colors px-2 py-1">
                Accueil
              </Link>
              <Link href="#about" className="text-gray-700 font-medium hover:text-blue-600 transition-colors px-2 py-1">
                À propos
              </Link>
              <Link href="#services" className="text-gray-700 font-medium hover:text-blue-600 transition-colors px-2 py-1">
                Services
              </Link>
              <Link href="#appointment" className="text-gray-700 font-medium hover:text-blue-600 transition-colors px-2 py-1">
                Rendez-vous
              </Link>
              <Link href="#parteners" className="text-gray-700 font-medium hover:text-blue-600 transition-colors px-2 py-1">
                Partenaires
              </Link>
              <Link href="/blog" className="text-gray-700 font-medium hover:text-blue-600 transition-colors px-2 py-1">
                Blog
              </Link>
            </div>

            {/* Bouton menu mobile */}
            <button 
              onClick={toggleMenu}
              className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors p-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Menu mobile */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 pb-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  onClick={closeMenu}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  Accueil
                </Link>
                <Link 
                  href="#about" 
                  onClick={closeMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  À propos
                </Link>
                <Link 
                  href="#services" 
                  onClick={closeMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  Services
                </Link>
                <Link 
                  href="#appointment" 
                  onClick={closeMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  Rendez-vous
                </Link>
                <Link 
                  href="#parteners" 
                  onClick={closeMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  Partenaires
                </Link>
                <Link 
                  href="/blog" 
                  onClick={closeMenu}
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay pour fermer le menu en cliquant à côté (mobile) */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-[-1]"
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
      </nav>
    </header>
  );
}

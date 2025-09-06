import Link from 'next/link';

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
  return (
    <header>
      {liste_coordonnee.map((coo, index) => (
        <div key={index} className="bg-blue-700 text-white py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-2 md:mb-0">
                <a href={`mailto:${coo.Mail}`} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  {coo.Mail}
                </a>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {coo.Adresse}
                </div>
              </div>
              <div className="text-sm md:text-base">
                <a href={`tel:${coo.Telephone}`} className="flex items-center">
                  <span>Appelez Maintenant : </span>
                  <span className="font-bold ml-1">{coo.Telephone} / {coo.Telephone2}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              <img src="../imgs/Clinique_-_Logo-removebg-preview.png" alt="Clinique Totsi" className="h-20" />
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-blue-600 font-medium hover:text-blue-800">Accueil</Link>
              <Link href="#about" className="text-gray-700 font-medium hover:text-blue-600">À propos</Link>
              <Link href="#services" className="text-gray-700 font-medium hover:text-blue-600">Services</Link>
              <Link href="#appointment" className="text-gray-700 font-medium hover:text-blue-600">Rendez-vous</Link>
              <Link href="#parteners" className="text-gray-700 font-medium hover:text-blue-600">Partenaires</Link>
              <Link href="/blog" className="text-gray-700 font-medium hover:text-blue-600">Blog</Link>
            </div>

            <button className="md:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

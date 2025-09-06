export default function About() {
  return (
    <>
      {/* Section About */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Col gauche : 2 images */}
            <div className="space-y-4">
              <img
                src="/imgs/illustration4.png"
                alt="Clinique"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <img
                src="/imgs/illustration.jpg"
                alt="Clinique"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Col milieu : 1 image */}
            <div>
              <img
                src="/imgs/TGX210720_DR_WODOME_LUMIERE_DIVINE_OR_SURGERY_CB002_CB001_MID-1030x686-copie.jpg"
                alt="Clinique"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Col droite : texte */}
            <div className="md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-snug">
                Soins personnels &<br /> modes de vie sains
              </h2>
              <p className="mt-4 mb-6 text-gray-600">
                Nous fournissons les meilleurs services médicaux de premier plan.
              </p>
              <a
                href="/services"
                className="inline-flex items-center bg-blue-600 text-white font-medium px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
              >
                Services
                <svg
                  className="ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA / Counter */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-2">👨‍⚕️</div>
              <span className="text-3xl font-bold">10k</span>
              <p className="text-gray-600 mt-2">Personnes heureuses</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-2">🏳️</div>
              <span className="text-3xl font-bold">500+</span>
              <p className="text-gray-600 mt-2">Chirurgies complètes</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-2">🎖️</div>
              <span className="text-3xl font-bold">40+</span>
              <p className="text-gray-600 mt-2">Médecins experts</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-4xl mb-2">🌍</div>
              <span className="text-3xl font-bold">20</span>
              <p className="text-gray-600 mt-2">Partenaires</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

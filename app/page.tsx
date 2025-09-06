import Header from "../components/Header";
import Slider from "../components/Slider";
import About from "@/components/About";
import Services from "@/components/Services";
import Appointment from "@/components/Appointment";
import Partners from "@/components/Partners";
import Footer from "../components/Footer";

// Définition des types
interface HomePageProps {
  liste_coordonnee: Array<{
    Mail: string;
    Adresse: string;
    Telephone: string;
    Telephone2: string;
  }>;
  liste_departements: Array<{
    Titre: string;
  }>;
}

// Utilisation de la Metadata API (remplace <Head>)
export const metadata = {
  title: "Clinique de Totsi",
  description: "Votre partenaire de santé le plus fiable",
};

export default async function HomePage() {
  // Ici tu peux faire un fetch ou définir des données statiques
  const liste_coordonnee: HomePageProps["liste_coordonnee"] = [
    {
      Mail: "cliniquetotsi@gmail.com",
      Adresse: "Non loin du Bar 2N Totsi - 01 BP 47 - Lomé",
      Telephone: "+228 90 81 07 44",
      Telephone2: "+228 22 35 40 91",
    },
  ];

  const liste_departements: HomePageProps["liste_departements"] = [
    { Titre: "Cardiologie" },
    { Titre: "Pédiatrie" },
    { Titre: "Chirurgie" },
    { Titre: "Radiologie" },
  ];

  return (
    <>
      <Header liste_coordonnee={liste_coordonnee} />
      <Slider />
      <About />
      <Services />
      <Appointment />
      <Partners />
      <Footer
        liste_coordonnee={liste_coordonnee}
        liste_departements={liste_departements}
      />
    </>
  );
}

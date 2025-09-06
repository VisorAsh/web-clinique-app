import { getLatestArticles } from "@/lib/api/fetchData";
import ArticleCard from "../../components/article/ArticleCard";
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BlogPageProps {
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

export default async function ArticlesPage() {
    const articles = await getLatestArticles();

    const liste_coordonnee: BlogPageProps["liste_coordonnee"] = [
        {
            Mail: "cliniquetotsi@gmail.com",
            Adresse: "Non loin du Bar 2N Totsi - 01 BP 47 - Lomé",
            Telephone: "+228 90 81 07 44",
            Telephone2: "+228 22 35 40 91",
        },
    ];

    const liste_departements: BlogPageProps["liste_departements"] = [
        { Titre: "Cardiologie" },
        { Titre: "Pédiatrie" },
        { Titre: "Chirurgie" },
        { Titre: "Radiologie" },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <Header liste_coordonnee={liste_coordonnee} />

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Blog</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Contenu principal */}
            <div className="container mx-auto py-16 px-4">
                {/* Filtrer et trier (optionnel) */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-12 p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                        {articles.length} article{articles.length !== 1 ? 's' : ''} disponible{articles.length !== 1 ? 's' : ''}
                    </div>
                    <div className="">
                        <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                            <option>Trier par plus récent</option>
                            <option>Trier par plus ancien</option>
                            <option>Trier par popularité</option>
                        </select>
                    </div>
                </div>

                {/* Grille d'articles */}
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun article disponible</h3>
                        <p className="text-gray-500 mb-6">Revenez bientôt pour découvrir nos nouveaux contenus</p>
                        <Link
                            href="/"
                            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour à l'accueil
                        </Link>
                    </div>
                )}

                {/* Pagination (optionnel) */}
                {articles.length > 0 && (
                    <div className="flex justify-center mt-16">
                        <nav className="flex items-center space-x-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300">3</button>

                            <span className="px-2 text-gray-500">...</span>

                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300">10</button>

                            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                )}
            </div>

            <Footer
                liste_coordonnee={liste_coordonnee}
                liste_departements={liste_departements}
            />
        </main>
    );
}

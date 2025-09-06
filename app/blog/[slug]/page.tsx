import { getArticleBySlug } from '@/lib/api/fetchData';
import ArticleContent from '../../../components/article/ArticleContent';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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

// Génération des métadonnées
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: 'Article non trouvé',
        };
    }

    return {
        title: article.title,
        description: article.excerpt || article.content.substring(0, 160),
        openGraph: {
            title: article.title,
            description: article.excerpt || article.content.substring(0, 160),
            images: article.imageUrl ? [article.imageUrl] : [],
        },
    };
}

const ArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    // On await les params
    const { slug } = await params;

    // On await les données de l'article
    const article = await getArticleBySlug(slug);

    // Si l'article n'existe pas, on retourne une 404
    if (!article) {
        notFound();
    }

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
        <>
            <Header liste_coordonnee={liste_coordonnee} />

            <div className="pt-8 px-4 md:px-0 mx-auto max-w-3xl bg-white">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{article.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <article className="container mx-auto py-10 max-w-3xl px-4 md:px-0 bg-white">
                <div className="mb-8">
                    {article.category && (
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-md mb-4">
                            {article.category}
                        </span>
                    )}

                    <h1 className="text-3xl md:text-4xl font-bold my-4 text-gray-900">
                        {article.title}
                    </h1>

                    <div className="flex items-center text-gray-600 text-sm">
                        <span>Par {article.author}</span>
                        <span className="mx-2">•</span>
                        <span>
                            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'Date non disponible'}
                        </span>
                    </div>
                </div>

                {/* Image principale */}
                {article.imageUrl && (
                    <div className="relative w-full h-64 md:h-96 mb-8">
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Contenu de l'article */}
                <div className="prose prose-lg max-w-none">
                    {article.content ? (
                        <ArticleContent content={article.content} />
                    ) : (
                        <p className="text-gray-500">Contenu non disponible.</p>
                    )}
                </div>

                {/* Partage social */}
                {/* <SocialShare
                title={article.title}
                url={`/blog/${article.slug}`}
                className="mt-8 border-t pt-6"
            /> */}

                {/* Articles similaires pourrait être ajouté ici */}
            </article>
            <Footer
                liste_coordonnee={liste_coordonnee}
                liste_departements={liste_departements}
            />
        </>
    );
}

export default ArticlePage;

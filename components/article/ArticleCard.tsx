import { Article } from "@/lib/api/fetchData";
import Image from "next/image";
import Link from "next/link";

// components/article/ArticleCard.tsx
const ArticleCard = ({ article, compact = false }: {
    article: Article;
    compact?: boolean
}) => {
    // Formater la date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link
            href={`/blog/${article.slug}`}
            className={`block border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${compact ? '' : 'h-full'}`}
        >
            <div className="relative aspect-video">
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    // fill
                    className="object-cover h-[300px] w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-4">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded mb-2">
                    {article.category}
                </span>

                <h3 className={`font-bold mt-2 ${compact ? 'text-lg' : 'text-xl'} hover:text-blue-600 transition-colors`}>
                    {article.title}
                </h3>

                {!compact && (
                    <p className="mt-2 text-gray-600 line-clamp-2">
                        {article.excerpt}
                    </p>
                )}

                <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                    {article.readTime && (
                        <>
                            <span className="mx-2">•</span>
                            <span>{article.readTime} min</span>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;

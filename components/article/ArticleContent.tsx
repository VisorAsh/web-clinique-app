const ArticleContent = ({ content }: { content: string }) => {
    return (
        <div className="text-gray-700 leading-relaxed">
            {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}

export default ArticleContent;

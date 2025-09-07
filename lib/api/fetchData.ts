// Types pour les articles
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  readTime: number; // en minutes
  tags: string[];
}

// Données de test pour les articles
const articles: Article[] = [
    {
        id: '1',
        title: "L'intelligence artificielle révolutionne la médecine moderne",
        slug: 'intelligence-artificielle-medecine-moderne',
        excerpt: "Découvrez comment l'IA transforme le diagnostic et le traitement des maladies avec une précision inégalée.",
        content: "L'intelligence artificielle fait des vagues dans le domaine médical, offrant de nouvelles possibilités pour le diagnostic et le traitement des maladies. Les algorithmes d'IA peuvent analyser des images médicales avec une précision qui rivalise avec celle des radiologues expérimentés. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: 'Dr. Marie Dubois',
        publishedAt: '2024-01-15T10:30:00Z',
        category: 'Technologie',
        imageUrl: '../imgs/CMA180109_MCB_TRAINING_LIMBE_WHO_CHECKLIST_OR_ST001-1500x1000-1.jpg',
        featured: true,
        readTime: 8,
        tags: ['IA', 'Médecine', 'Innovation', 'Santé']
    },
    {
        id: '2',
        title: "Les énergies renouvelables : l'avenir de notre planète",
        slug: 'energies-renouvelables-avenir-planete',
        excerpt: "Un tour d'horizon des solutions durables pour réduire notre empreinte carbone et préserver l'environnement.",
        content: "Face aux défis climatiques, les énergies renouvelables s'imposent comme la solution d'avenir. L'éolien, le solaire et l'hydraulique connaissent un essor sans précédent. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: 'Pierre Martin',
        publishedAt: '2024-01-14T14:20:00Z',
        category: 'Environnement',
        imageUrl: '../imgs/portrait-infirmiere-noire_53419-1299.webp',
        featured: true,
        readTime: 6,
        tags: ['Énergie', 'Écologie', 'Développement durable', 'Climat']
    },
    {
        id: '3',
        title: 'Les nouvelles tendances du télétravail post-pandémie',
        slug: 'nouvelles-tendances-teletravail-post-pandemie',
        excerpt: 'Comment le travail à distance a transformé nos habitudes professionnelles et personnelles.',
        content: "La pandémie a accéléré l'adoption du télétravail, créant de nouvelles dynamiques dans le monde professionnel. Les entreprises adaptent leurs politiques pour répondre aux attentes des employés. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        author: 'Julie Moreau',
        publishedAt: '2024-01-11T11:30:00Z',
        category: 'Société',
        imageUrl: '../imgs/d7a94382a75116bb2ab5d1a5204b28.png',
        featured: false,
        readTime: 5,
        tags: ['Télétravail', 'Pandémie', 'Travail', 'Société']
    }
];

// Fonction pour récupérer les articles en vedette
export function getFeaturedArticles(): Article[] {
  return articles
    .filter(article => article.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Fonction pour récupérer les derniers articles
export function getLatestArticles(limit: number = 6): Article[] {
  return articles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Fonction pour récupérer un article par son slug
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find(article => article.slug === slug);
}

// Fonction pour récupérer les articles par catégorie
export function getArticlesByCategory(category: string): Article[] {
  return articles
    .filter(article => article.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Fonction pour récupérer toutes les catégories
export function getAllCategories(): string[] {
  const categories = articles.map(article => article.category);
  return [...new Set(categories)];
}

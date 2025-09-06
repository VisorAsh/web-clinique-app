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
    title: 'L\'intelligence artificielle révolutionne la médecine moderne',
    slug: 'intelligence-artificielle-medecine-moderne',
    excerpt: 'Découvrez comment l\'IA transforme le diagnostic et le traitement des maladies avec une précision inégalée.',
    content: 'L\'intelligence artificielle fait des vagues dans le domaine médical, offrant de nouvelles possibilités pour le diagnostic et le traitement des maladies. Les algorithmes d\'IA peuvent analyser des images médicales avec une précision qui rivalise avec celle des radiologues expérimentés...',
    author: 'Dr. Marie Dubois',
    publishedAt: '2024-01-15T10:30:00Z',
    category: 'Technologie',
    imageUrl: '/images/ai-medicine.jpg',
    featured: true,
    readTime: 8,
    tags: ['IA', 'Médecine', 'Innovation', 'Santé']
  },
  {
    id: '2',
    title: 'Les énergies renouvelables : l\'avenir de notre planète',
    slug: 'energies-renouvelables-avenir-planete',
    excerpt: 'Un tour d\'horizon des solutions durables pour réduire notre empreinte carbone et préserver l\'environnement.',
    content: 'Face aux défis climatiques, les énergies renouvelables s\'imposent comme la solution d\'avenir. L\'éolien, le solaire et l\'hydraulique connaissent un essor sans précédent...',
    author: 'Pierre Martin',
    publishedAt: '2024-01-14T14:20:00Z',
    category: 'Environnement',
    imageUrl: '/images/renewable-energy.jpg',
    featured: true,
    readTime: 6,
    tags: ['Énergie', 'Écologie', 'Développement durable', 'Climat']
  },
  {
    id: '3',
    title: 'La cuisine française classée au patrimoine de l\'UNESCO',
    slug: 'cuisine-francaise-patrimoine-unesco',
    excerpt: 'Une reconnaissance internationale pour l\'art culinaire français et ses traditions gastronomiques.',
    content: 'La cuisine française vient d\'être officiellement inscrite au patrimoine immatériel de l\'UNESCO. Cette distinction honore des siècles de tradition culinaire...',
    author: 'Sophie Laurent',
    publishedAt: '2024-01-13T09:15:00Z',
    category: 'Culture',
    imageUrl: '/images/french-cuisine.jpg',
    featured: false,
    readTime: 4,
    tags: ['Cuisine', 'France', 'UNESCO', 'Gastronomie']
  },
  {
    id: '4',
    title: 'Le boom des cryptomonnaies en 2024',
    slug: 'boom-cryptomonnaies-2024',
    excerpt: 'Analyse des tendances du marché des cryptomonnaies et des nouvelles technologies blockchain.',
    content: 'Le marché des cryptomonnaies connaît une année exceptionnelle en 2024. Bitcoin, Ethereum et les nouvelles cryptomonnaies attirent de plus en plus d\'investisseurs...',
    author: 'Thomas Bernard',
    publishedAt: '2024-01-12T16:45:00Z',
    category: 'Finance',
    imageUrl: '/images/cryptocurrency.jpg',
    featured: false,
    readTime: 7,
    tags: ['Cryptomonnaies', 'Blockchain', 'Finance', 'Investissement']
  },
  {
    id: '5',
    title: 'Les nouvelles tendances du télétravail post-pandémie',
    slug: 'nouvelles-tendances-teletravail-post-pandemie',
    excerpt: 'Comment le travail à distance a transformé nos habitudes professionnelles et personnelles.',
    content: 'La pandémie a accéléré l\'adoption du télétravail, créant de nouvelles dynamiques dans le monde professionnel. Les entreprises adaptent leurs politiques...',
    author: 'Julie Moreau',
    publishedAt: '2024-01-11T11:30:00Z',
    category: 'Société',
    imageUrl: '/images/remote-work.jpg',
    featured: false,
    readTime: 5,
    tags: ['Télétravail', 'Pandémie', 'Travail', 'Société']
  },
  {
    id: '6',
    title: 'L\'exploration spatiale : Mars, prochaine destination humaine',
    slug: 'exploration-spatiale-mars-destination-humaine',
    excerpt: 'Les dernières avancées dans la conquête spatiale et les projets de colonisation martienne.',
    content: 'Mars devient de plus en plus accessible grâce aux progrès technologiques. Les agences spatiales et entreprises privées multiplient les missions...',
    author: 'Marc Durand',
    publishedAt: '2024-01-10T13:20:00Z',
    category: 'Science',
    imageUrl: '/images/mars-exploration.jpg',
    featured: true,
    readTime: 9,
    tags: ['Espace', 'Mars', 'Exploration', 'Science']
  },
  {
    id: '7',
    title: 'L\'art contemporain africain en pleine renaissance',
    slug: 'art-contemporain-africain-renaissance',
    excerpt: 'Découverte des artistes africains qui redéfinissent l\'art contemporain sur la scène internationale.',
    content: 'L\'art contemporain africain connaît un véritable essor sur la scène internationale. Les artistes du continent créent des œuvres qui mêlent tradition et modernité...',
    author: 'Amina Diallo',
    publishedAt: '2024-01-09T15:10:00Z',
    category: 'Art',
    imageUrl: '/images/african-art.jpg',
    featured: false,
    readTime: 6,
    tags: ['Art', 'Afrique', 'Contemporain', 'Culture']
  },
  {
    id: '8',
    title: 'La révolution des véhicules électriques',
    slug: 'revolution-vehicules-electriques',
    excerpt: 'Comment les voitures électriques transforment l\'industrie automobile et nos modes de transport.',
    content: 'Les véhicules électriques révolutionnent l\'industrie automobile. Les constructeurs traditionnels et les nouveaux acteurs se lancent dans cette course technologique...',
    author: 'Lucas Petit',
    publishedAt: '2024-01-08T10:45:00Z',
    category: 'Automobile',
    imageUrl: '/images/electric-cars.jpg',
    featured: false,
    readTime: 7,
    tags: ['Électrique', 'Automobile', 'Écologie', 'Innovation']
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
export function getArticleBySlug(slug: string): Article | undefined {
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

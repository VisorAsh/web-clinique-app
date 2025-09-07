"use client";

// import type { Metadata } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Stethoscope,
    Users,
    FileText,
    UserCog,
    User,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { useState, useEffect } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const menuItems = [
    { name: "Accueil", href: "/dashboard", icon: LayoutDashboard },
    { name: "Consultations", href: "/dashboard/consultations", icon: Stethoscope },
    { name: "Patients", href: "/dashboard/patients", icon: Users },
    { name: "Examens", href: "/dashboard/examens", icon: FileText },
    { name: "Utilisateurs", href: "/dashboard/users", icon: UserCog },
    { name: "Profil", href: "/dashboard/profil", icon: User },
];

// metadata (Not in "use client component")
// export const metadata: Metadata = {
//     title: "Dashboard - Clinique de Totsi",
//     description: "Tableau de bord de la Clinique de Totsi",
// };

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        setMounted(true);
        // Récupérer les données utilisateur depuis le localStorage
        const userString = localStorage.getItem("user");
        if (userString) {
            try {
                setUserData(JSON.parse(userString));
            } catch (error) {
                console.error("Erreur lors de la lecture des données utilisateur:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/auth/login");
    };

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen h-screen bg-gray-50">
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-white shadow-md"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white transform transition-transform duration-300 ease-in-out flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex flex-col flex-1">
                    <Link
                        href="/"
                        className="flex justify-center items-center py-6 px-2 border-b border-blue-500 bg-gray-50 w-[90%] mx-auto rounded-lg mt-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <img
                            src="../imgs/Clinique_-_Logo-removebg-preview.png"
                            alt="Clinique Totsi"
                            className="h-12"
                        />
                    </Link>

                    <nav className="flex-1 p-4 space-y-1 mt-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-500/80 group",
                                        pathname === item.href && "bg-blue-500 shadow-md"
                                    )}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    <span className="font-medium">{item.name}</span>
                                    {pathname === item.href && (
                                        <div className="ml-auto w-2 h-2 rounded-full bg-white"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Section utilisateur connecté */}
                    {userData && (
                        <div className="pt-4 border-t border-blue-500">
                            <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg mb-4">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{userData.prenom} {userData.nom}</p>
                                    <p className="text-sm text-white/80 truncate">{userData.specialite}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-4 border-t border-blue-500">
                        <Button
                            variant="destructive"
                            className="w-full cursor-pointer flex items-center justify-center gap-2 py-5 font-medium"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            Déconnexion
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col h-screen lg:ml-0 transition-all duration-300">
                <div className="flex-1 flex flex-col min-h-0 p-6">
                    {/* Header amélioré */}
                    <header className="mb-12 shrink-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                    {menuItems.find((i) => i.href === pathname)?.name || "Tableau de bord"}
                                </h1>
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{menuItems.find((i) => i.href === pathname)?.name || "Accueil"}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-blue-700 font-medium">Système en ligne</span>
                                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">24/7</span>
                            </div>
                        </div>
                    </header>

                    {/* Contenu principal */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8 overflow-y-auto flex-1 min-h-0">
                        {children}
                    </div>
                </div>

                {/* Footer en bas de page */}
                <footer className="bg-white border-t border-gray-200 py-6 px-6 mt-auto shrink-0">
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                        <div className="text-center md:text-left">
                            <h3 className="font-semibold text-gray-800 mb-2">Statistiques global du jour</h3>
                            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 justify-center md:justify-start">
                                <div className="bg-blue-50 p-3 rounded-lg text-center min-w-[100px]">
                                    <p className="text-sm text-blue-600 font-medium">Patients</p>
                                    <p className="text-2xl font-bold text-blue-700">34</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center min-w-[100px]">
                                    <p className="text-sm text-green-600 font-medium">RDV</p>
                                    <p className="text-2xl font-bold text-green-700">9</p>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center min-w-[100px]">
                                    <p className="text-sm text-purple-600 font-medium">Nouveaux</p>
                                    <p className="text-2xl font-bold text-purple-700">12</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <h3 className="font-semibold text-gray-800 mb-2">Statut du système</h3>
                            <div className="flex items-center justify-end gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-600 font-medium">Tous les systèmes opérationnels</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Dernière mise à jour: {new Date().toLocaleTimeString()}</p>
                        </div> */}

                    {/* <div className="text-center md:text-right">
                            <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
                            <p className="text-sm text-gray-600">Besoin d'aide ? Contactez notre équipe</p>
                            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2 justify-center md:justify-end mt-2">
                                <a href="mailto:cliniquetotsi@gmail.com" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    cliniquetotsi@gmail.com
                                </a>
                                <span className="hidden sm:inline md:hidden lg:inline mx-2 text-gray-300">•</span>
                                <a href="tel:+22890810744" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    +228 90 81 07 44
                                </a>
                            </div>
                        </div> */}
                    {/* </div> */}

                    {/* Copyright */}
                    <div className="border-t border-gray-100 mt-6 pt-4 text-center">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Clinique Totsi. Tous droits réservés.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

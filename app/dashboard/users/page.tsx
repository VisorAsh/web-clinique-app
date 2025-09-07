"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Mail, Phone, Briefcase, Loader2 } from "lucide-react";

// Interface pour les données utilisateur
interface UserData {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    specialite: string;
    adresse: string;
    tel: string;
    dateEmbauche: string;
    autorisation: boolean;
    __v?: number;
}

const specialiteOptions = [
    "Cardiologie",
    "Pédiatrie",
    "Radiologie",
    "Chirurgie",
    "Dermatologie",
    "Neurologie",
    "Ophtalmologie",
    "Gynécologie"
];

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialite, setSelectedSpecialite] = useState("all");
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupération des utilisateurs depuis l'API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiUrl}/get-all-user`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();

                if (data.message === "ok" && data.users) {
                    // console.log("Données utilisateurs trouvées:", data.users);
                    setUsers(data.users);
                } else {
                    throw new Error("Données utilisateurs non trouvées");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
                console.error("Erreur lors de la récupération des utilisateurs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.specialite.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialite = selectedSpecialite === "all" || user.specialite === selectedSpecialite;

        return matchesSearch && matchesSpecialite;
    });

    const getAutorisationBadge = (autorisation: boolean) => {
        return autorisation ?
            <Badge variant="default">Activé</Badge> :
            <Badge variant="secondary">Désactivé</Badge>;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-muted-foreground">Chargement des utilisateurs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 max-w-md">
                        <h3 className="font-semibold text-red-800">Erreur</h3>
                        <p className="text-red-700 mt-1">{error}</p>
                        <button
                            className="mt-3 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                            onClick={() => window.location.reload()}
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Filtres et recherche */}
            <Card>
                <CardContent className="">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher par nom, prénom, email ou spécialité..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            value={selectedSpecialite}
                            onChange={(e) => setSelectedSpecialite(e.target.value)}
                            className="flex h-10 w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <option value="all">Toutes spécialités</option>
                            {specialiteOptions.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Tableau des utilisateurs */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des utilisateurs</CardTitle>
                    <CardDescription>
                        {filteredUsers.length} utilisateur(s) trouvé(s)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Utilisateur</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Spécialité</TableHead>
                                <TableHead>Accès</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user._id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.prenom} {user.nom}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Employé depuis {new Date(user.dateEmbauche).getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{user.tel}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                            <span>{user.specialite}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getAutorisationBadge(user.autorisation)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredUsers.length === 0 && users.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun utilisateur ne correspond à votre recherche</p>
                        </div>
                    )}

                    {users.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun utilisateur trouvé dans la base de données</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

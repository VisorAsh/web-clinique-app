"use client";

import { useState } from "react";
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
import { Search, User, Mail, Phone, Briefcase } from "lucide-react";

// Données mockées pour les utilisateurs
const users = [
    {
        _id: "1",
        nom: "Martin",
        prenom: "Sophie",
        email: "sophie.martin@clinique-totsi.com",
        specialite: "Cardiologie",
        tel: "+33 6 12 34 56 78",
        dateEmbauche: "2020-03-15",
        autorisation: true
    },
    {
        _id: "2",
        nom: "Dubois",
        prenom: "Pierre",
        email: "pierre.dubois@clinique-totsi.com",
        specialite: "Pédiatrie",
        tel: "+33 6 23 45 67 89",
        dateEmbauche: "2021-06-10",
        autorisation: true
    },
    {
        _id: "3",
        nom: "Bernard",
        prenom: "Lucie",
        email: "lucie.bernard@clinique-totsi.com",
        specialite: "Radiologie",
        tel: "+33 6 34 56 78 90",
        dateEmbauche: "2022-01-20",
        autorisation: true
    },
    {
        _id: "4",
        nom: "Garcia",
        prenom: "Thomas",
        email: "thomas.garcia@clinique-totsi.com",
        specialite: "Chirurgie",
        tel: "+33 6 45 67 89 01",
        dateEmbauche: "2023-08-05",
        autorisation: false
    },
    {
        _id: "5",
        nom: "Leroy",
        prenom: "Alice",
        email: "alice.leroy@clinique-totsi.com",
        specialite: "Dermatologie",
        tel: "+33 6 56 78 90 12",
        dateEmbauche: "2024-02-15",
        autorisation: true
    }
];

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

    return (
        <div className="space-y-6">
            {/* <div>
                <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
                <p className="text-muted-foreground">
                    Liste du personnel médical et administratif
                </p>
            </div> */}

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

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun utilisateur trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

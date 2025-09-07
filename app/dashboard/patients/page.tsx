"use client";

import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Calendar, User, Phone, Mail } from "lucide-react";

// Données mockées pour les patients
const patients = [
    {
        _id: "1",
        nom: "Dupont",
        prenom: "Jean",
        birthDate: "1985-05-15",
        telephone: "+33 6 12 34 56 78",
        email: "jean.dupont@email.com",
        ref: "PAT-001",
        gender: "male",
        emergencycontact: [
            { nom: "Dupont", prenom: "Marie", relation: "épouse", telephone: "+33 6 98 76 54 32" }
        ],
        createdAt: "2024-01-15",
    },
    {
        _id: "2",
        nom: "Dubois",
        prenom: "Marie",
        birthDate: "1990-08-22",
        telephone: "+33 6 23 45 67 89",
        email: "marie.dubois@email.com",
        ref: "PAT-002",
        gender: "female",
        emergencycontact: [
            { nom: "Dubois", prenom: "Pierre", relation: "père", telephone: "+33 6 87 65 43 21" }
        ],
        createdAt: "2024-02-10",
    },
    {
        _id: "3",
        nom: "Koné",
        prenom: "Ali",
        birthDate: "1978-12-03",
        telephone: "+33 6 34 56 78 90",
        email: "ali.kone@email.com",
        ref: "PAT-003",
        gender: "male",
        emergencycontact: [
            { nom: "Koné", prenom: "Aïcha", relation: "soeur", telephone: "+33 6 76 54 32 10" }
        ],
        createdAt: "2024-03-05",
    },
];

const genderOptions = [
    { value: "male", label: "Homme" },
    { value: "female", label: "Femme" },
    { value: "other", label: "Autre" },
];

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredPatients = patients.filter(patient => {
        const matchesSearch =
            patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.ref.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGender = selectedGender === "all" || patient.gender === selectedGender;

        return matchesSearch && matchesGender;
    });

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    type Gender = "male" | "female" | "other";

    const getGenderBadge = (gender: string) => {
        const genderConfig: Record<Gender, { label: string; variant: "default" | "secondary" | "outline" }> = {
            male: { label: "Homme", variant: "default" },
            female: { label: "Femme", variant: "secondary" },
            other: { label: "Autre", variant: "outline" },
        };

        if (["male", "female", "other"].includes(gender)) {
            const config = genderConfig[gender as Gender];
            return <Badge variant={config.variant}>{config.label}</Badge>;
        }
        return <Badge variant="outline">Inconnu</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* <div>
                    <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">
                        Gérez les dossiers de vos patients
                    </p>
                </div> */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Nouveau patient
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Nouveau patient</DialogTitle>
                            <DialogDescription>
                                Créez un nouveau dossier patient avec les informations requises
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="nom">Nom *</Label>
                                <Input id="nom" placeholder="Nom de famille" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prenom">Prénom *</Label>
                                <Input id="prenom" placeholder="Prénom" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birthDate">Date de naissance *</Label>
                                <Input id="birthDate" type="date" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Genre *</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner le genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genderOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telephone">Téléphone *</Label>
                                <Input id="telephone" placeholder="Numéro de téléphone" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Adresse email" />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="ref">Référence patient</Label>
                                <Input id="ref" placeholder="Référence unique (auto-générée si vide)" />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">
                                Créer le patient
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filtres et recherche */}
            <Card>
                <CardContent className="">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher un patient par nom, prénom, email..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedGender} onValueChange={setSelectedGender}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les genres</SelectItem>
                                {genderOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Tableau des patients */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des patients</CardTitle>
                    <CardDescription>
                        {filteredPatients.length} patient(s) trouvé(s)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Référence</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Âge</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Date d'inscription</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPatients.map((patient) => (
                                <TableRow key={patient._id} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{patient.ref}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {patient.prenom} {patient.nom}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {calculateAge(patient.birthDate)} ans
                                    </TableCell>
                                    <TableCell>
                                        {getGenderBadge(patient.gender)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{patient.telephone}</span>
                                            </div>
                                            {patient.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-sm">{patient.email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {new Date(patient.createdAt).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/dashboard/patients/${patient._id}`}>
                                                <Eye className="h-4 w-4 mr-1" />
                                                Détails
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredPatients.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun patient trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

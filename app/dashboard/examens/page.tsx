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
import { Plus, Search, Filter, Eye, Calendar, User, FileText, Download, Stethoscope, Microscope } from "lucide-react";
import { stat } from "fs";

// Données mockées pour les examens
const examens = [
    {
        _id: "1",
        patientId: { nom: "Dupont", prenom: "Jean" },
        medecin: "Dr. Martin",
        specialite: "Cardiologie",
        typeExamen: "Analyse",
        dateExamen: "2024-09-15T10:30:00",
        resultatExamen: "Électrocardiogramme normal",
        fichierUrl: "/documents/ecg-dupont.pdf",
        status: "completed"
    },
    {
        _id: "2",
        patientId: { nom: "Dubois", prenom: "Marie" },
        medecin: "Dr. Laurent",
        specialite: "Endocrinologie",
        typeExamen: "Analyse",
        dateExamen: "2024-09-10T14:15:00",
        resultatExamen: "Glycémie à jeun: 1.10 g/L",
        fichierUrl: "/documents/glycemie-dubois.pdf",
        status: "completed"
    },
    {
        _id: "3",
        patientId: { nom: "Koné", prenom: "Ali" },
        medecin: "Dr. Traoré",
        specialite: "Chirurgie",
        typeExamen: "Opération chirurgicale",
        dateExamen: "2024-09-05T08:00:00",
        resultatExamen: "Appendicectomie réussie",
        fichierUrl: "/documents/operation-kone.pdf",
        status: "completed"
    },
    {
        _id: "4",
        patientId: { nom: "Dupont", prenom: "Jean" },
        medecin: "Dr. Martin",
        specialite: "Cardiologie",
        typeExamen: "Analyse",
        dateExamen: "2024-09-20T09:00:00",
        resultatExamen: "En attente des résultats",
        status: "pending"
    },
];

const typeExamenOptions = [
    { value: "all", label: "Tous les types" },
    { value: "Analyse", label: "Analyses" },
    { value: "Opération chirurgicale", label: "Opérations chirurgicales" },
];

const specialiteOptions = [
    "Cardiologie",
    "Endocrinologie",
    "Chirurgie",
    "Radiologie",
    "Pédiatrie",
    "Gynécologie",
    "Dermatologie",
    "Neurologie"
];

export default function ExamensPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedSpecialite, setSelectedSpecialite] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredExamens = examens.filter(examen => {
        const matchesSearch =
            examen.patientId.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.patientId.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.medecin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.resultatExamen.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedType === "all" || examen.typeExamen === selectedType;
        const matchesSpecialite = selectedSpecialite === "all" || examen.specialite === selectedSpecialite;

        return matchesSearch && matchesType && matchesSpecialite;
    });


    type Status = "completed" | "pending" | "canceled";

    const getStatusBadge = (status: Status) => {
        const statusConfig: Record<Status, { label: string; variant: "default" | "secondary" | "outline" }> = {
            completed: { label: "Terminé", variant: "default" },
            pending: { label: "En attente", variant: "secondary" },
            canceled: { label: "Annulé", variant: "outline" },
        };

        if (["completed", "pending", "canceled"].includes(status)) {
            const config = statusConfig[status as Status];
            return <Badge variant={config.variant}>{config.label}</Badge>;
        }
        return <Badge variant="outline">Inconnu</Badge>;
    };

    const getTypeIcon = (type: string) => {
        return type === "Analyse" ?
            <Microscope className="h-4 w-4 text-blue-500" /> :
            <Stethoscope className="h-4 w-4 text-red-500" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* <div>
                    <h2 className="text-3xl font-bold tracking-tight">Examens médicaux</h2>
                    <p className="text-muted-foreground">
                        Gérez les examens et opérations des patients
                    </p>
                </div> */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Nouvel examen
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Nouvel examen médical</DialogTitle>
                            <DialogDescription>
                                Enregistrez un nouvel examen ou une opération chirurgicale
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="patient">Patient *</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner un patient" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Jean Dupont</SelectItem>
                                            <SelectItem value="2">Marie Dubois</SelectItem>
                                            <SelectItem value="3">Ali Koné</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="typeExamen">Type d'examen *</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner le type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Analyse">Analyse</SelectItem>
                                            <SelectItem value="Opération chirurgicale">Opération chirurgicale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="medecin">Médecin *</Label>
                                    <Input id="medecin" placeholder="Nom du médecin" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialite">Spécialité *</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une spécialité" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {specialiteOptions.map(spec => (
                                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dateExamen">Date et heure *</Label>
                                <Input id="dateExamen" type="datetime-local" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resultatExamen">Résultat *</Label>
                                <Input id="resultatExamen" placeholder="Résultat de l'examen" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fichier">Fichier joint</Label>
                                <Input id="fichier" type="file" />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">
                                Enregistrer l'examen
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
                                placeholder="Rechercher par patient, médecin ou résultat..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Type d'examen" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeExamenOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedSpecialite} onValueChange={setSelectedSpecialite}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Spécialité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes spécialités</SelectItem>
                                {specialiteOptions.map(spec => (
                                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Tableau des examens */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des examens</CardTitle>
                    <CardDescription>
                        {filteredExamens.length} examen(s) trouvé(s)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Médecin</TableHead>
                                <TableHead>Spécialité</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Résultat</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredExamens.map((examen) => (
                                <TableRow key={examen._id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {examen.patientId.prenom} {examen.patientId.nom}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(examen.typeExamen)}
                                            {examen.typeExamen}
                                        </div>
                                    </TableCell>
                                    <TableCell>{examen.medecin}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{examen.specialite}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {new Date(examen.dateExamen).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {examen.resultatExamen}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(examen.status as Status)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {examen.fichierUrl && (
                                                <Button variant="ghost" size="icon">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/dashboard/examens/${examen._id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredExamens.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun examen trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Calendar, User, Stethoscope } from "lucide-react";

// Données mockées
const consultations = [
    {
        _id: "1",
        patient: "Jean Dupont",
        date: "2025-09-01",
        motif: "Douleur thoracique",
        medecin: "Dr. Martin",
        specialite: "Cardiologie",
        tauxGlycemie: 120,
        poids: 78,
        temperature: 37.2,
    },
    {
        _id: "2",
        patient: "Marie Dubois",
        date: "2025-09-03",
        motif: "Suivi diabète",
        medecin: "Dr. Laurent",
        specialite: "Endocrinologie",
        tauxGlycemie: 145,
        poids: 65,
        temperature: 36.8,
    },
    {
        _id: "3",
        patient: "Ali Koné",
        date: "2025-09-05",
        motif: "Fièvre persistante",
        medecin: "Dr. Traoré",
        specialite: "Médecine générale",
        tauxGlycemie: 95,
        poids: 82,
        temperature: 38.5,
    },
];

const specialites = [
    "Cardiologie",
    "Endocrinologie",
    "Médecine générale",
    "Pédiatrie",
    "Gynécologie",
    "Dermatologie",
    "Neurologie",
    "Ophtalmologie"
];

export default function ConsultationsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialite, setSelectedSpecialite] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch = consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.medecin.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialite = selectedSpecialite === "all" || consultation.specialite === selectedSpecialite;

        return matchesSearch && matchesSpecialite;
    });

    //   const getStatusBadge = (status: any) => {
    //     const statusConfig = {
    //       completed: { label: "Terminée", variant: "default" },
    //       scheduled: { label: "Planifiée", variant: "secondary" },
    //       pending: { label: "En attente", variant: "outline" },
    //     };

    //     const config = statusConfig[status] || { label: "Inconnu", variant: "outline" };
    //     return <Badge variant={config.variant}>{config.label}</Badge>;
    //   };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* <div>
          <h2 className="text-3xl font-bold tracking-tight">Consultations</h2>
          <p className="text-muted-foreground">
            Gérez les consultations de vos patients
          </p>
        </div> */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center justify-end cursor-pointer">
                            <Plus className="h-4 w-4" />
                            Nouvelle consultation
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Nouvelle consultation</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations pour créer une nouvelle consultation
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                            {/* Colonne 1 - Informations de base */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Informations générales</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="patient">Patient</Label>
                                    <Input id="patient" placeholder="Nom du patient" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">Date et heure</Label>
                                    <Input id="date" type="datetime-local" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="motif">Motif de consultation</Label>
                                    <Input id="motif" placeholder="Raison de la visite" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="medecin">Médecin</Label>
                                    <Input id="medecin" placeholder="Nom du médecin" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="specialite">Spécialité</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner une spécialité" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {specialites.map(spec => (
                                                <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="teleconsultation">Type de consultation</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Sélectionner le type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="presentiel">Présentiel</SelectItem>
                                            <SelectItem value="teleconsultation">Téléconsultation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Colonne 2 - Informations médicales */}
                            <div className="space-y-4">
                                <h3 className="font-semibold">Données médicales</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="poids">Poids (kg)</Label>
                                        <Input id="poids" type="number" placeholder="70" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="taille">Taille (cm)</Label>
                                        <Input id="taille" type="number" placeholder="175" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="temperature">Température (°C)</Label>
                                        <Input id="temperature" type="number" placeholder="37.2" step="0.1" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tension">Tension artérielle</Label>
                                        <Input id="tension" placeholder="120/80" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="glycemie">Glycémie (mg/dL)</Label>
                                        <Input id="glycemie" type="number" placeholder="100" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="frequence">Fréquence cardiaque</Label>
                                        <Input id="frequence" type="number" placeholder="72" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="allergies">Allergies</Label>
                                    <Input id="allergies" placeholder="Liste des allergies" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="antecedents">Antécédents médicaux</Label>
                                    <Textarea id="antecedents" placeholder="Antécédents du patient" />
                                </div>
                            </div>

                            {/* Colonne pleine largeur pour les champs supplémentaires */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="font-semibold">Diagnostic et traitement</h3>

                                <div className="space-y-2">
                                    <Label htmlFor="diagnostic">Diagnostic</Label>
                                    <Textarea id="diagnostic" placeholder="Diagnostic établi" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="traitement">Traitement prescrit</Label>
                                    <Textarea id="traitement" placeholder="Traitement à suivre" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="medicaments">Médicaments</Label>
                                    <Textarea id="medicaments" placeholder="Liste des médicaments prescrits" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="instructions">Instructions</Label>
                                    <Textarea id="instructions" placeholder="Instructions supplémentaires" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes supplémentaires</Label>
                                    <Textarea id="notes" placeholder="Observations et remarques" />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button type="submit">
                                Créer la consultation
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
                                placeholder="Rechercher un patient, un motif..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedSpecialite} onValueChange={setSelectedSpecialite}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Spécialité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les spécialités</SelectItem>
                                {specialites.map(spec => (
                                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Tableau des consultations */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des consultations</CardTitle>
                    <CardDescription>
                        {filteredConsultations.length} consultation(s) trouvée(s)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Patient</TableHead>
                                <TableHead>Motif</TableHead>
                                <TableHead>Médecin</TableHead>
                                <TableHead>Spécialité</TableHead>
                                {/* <TableHead>Statut</TableHead> */}
                                <TableHead className="">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredConsultations.map((consultation) => (
                                <TableRow key={consultation._id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {new Date(consultation.date).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {consultation.patient}
                                        </div>
                                    </TableCell>
                                    <TableCell>{consultation.motif}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-4 w-4 text-muted-foreground" />
                                            {consultation.medecin}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{consultation.specialite}</Badge>
                                    </TableCell>
                                    {/* <TableCell>
                    {getStatusBadge(consultation.status)}
                  </TableCell> */}
                                    <TableCell className="">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/dashboard/consultations/${consultation._id}`}>
                                                <Eye className="h-4 w-4" />
                                                Détails
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredConsultations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucune consultation trouvée</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import Link from "next/link";
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
import { Plus, Search, Filter, Eye, Calendar, User, Stethoscope, Microscope, Loader2 } from "lucide-react";

// Interface pour les données de consultation
interface Consultation {
    _id: string;
    patientId: {
        _id: string;
        nom: string;
        prenom: string;
        birthDate: string;
        telephone: string;
        email: string;
        gender: string;
        emergencycontact: any[];
        createdAt: string;
        __v: number;
    };
    date: string;
    motif: string;
    diagnostic: string;
    traitement: string;
    medecin: string;
    specialite: string;
    tensionArterielle: string;
    tauxGlycemie: number;
    frequenceCardiaque: number;
    poids: number;
    temperature: number;
    notes: string;
    medicaments: string[];
    taille: number;
    instructions: string;
    allergies: string[];
    antecedentsMedicaux: string[];
    teleconsultation: boolean;
    visioLink: string | null;
    messages: any[];
    __v: number;
}

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
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [patients, setPatients] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        patientId: "",
        date: new Date().toISOString().slice(0, 16),
        motif: "",
        diagnostic: "",
        traitement: "",
        medecin: "",
        specialite: "",
        tensionArterielle: "",
        tauxGlycemie: "",
        frequenceCardiaque: "",
        poids: "",
        temperature: "",
        notes: "",
        medicaments: "",
        taille: "",
        instructions: "",
        allergies: "",
        antecedentsMedicaux: "",
        teleconsultation: "presentiel",
        visioLink: "",
    });

    const fetchConsultations = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-consultations`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Données des consultations reçues:", data);

            if (data.consultations) {
                setConsultations(data.consultations);
            } else {
                throw new Error("Données consultations non trouvées");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error("Erreur lors de la récupération des consultations:", err);
        } finally {
            setLoading(false);
        }
    };

    // Récupération des patients pour la sélection
    const fetchPatients = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-patient`);

            if (response.ok) {
                const data = await response.json();
                if (data.message === "ok" && data.patient) {
                    // console.log("Données patients reçues:", data.patient);
                    setPatients(data.patient);
                }
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des patients:", err);
        }
    };

    // Récupération des consultations depuis l'API
    useEffect(() => {
        fetchConsultations();
        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setCreating(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

            // Préparer les données pour l'API
            const consultationData = {
                patientId: formData.patientId,
                date: new Date(formData.date),
                motif: formData.motif,
                diagnostic: formData.diagnostic,
                traitement: formData.traitement,
                medecin: formData.medecin,
                specialite: formData.specialite,
                tensionArterielle: formData.tensionArterielle,
                tauxGlycemie: Number(formData.tauxGlycemie),
                frequenceCardiaque: formData.frequenceCardiaque ? Number(formData.frequenceCardiaque) : undefined,
                poids: Number(formData.poids),
                temperature: Number(formData.temperature),
                notes: formData.notes,
                medicaments: formData.medicaments.split(',').map(m => m.trim()).filter(m => m),
                taille: formData.taille ? Number(formData.taille) : undefined,
                instructions: formData.instructions,
                allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
                antecedentsMedicaux: formData.antecedentsMedicaux.split(',').map(a => a.trim()).filter(a => a),
                teleconsultation: formData.teleconsultation === "teleconsultation",
                visioLink: formData.visioLink,
                messages: []
            };

            // console.log("1 ... Données à envoyer:", consultationData);

            const response = await fetch(`${apiUrl}/create-consultation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(consultationData),
            });

            // console.log("2 ... Réponse de l'API:", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            // console.log("3 ... Données reçues:", data);

            if (data.message === "Consultation ajoutée avec succès !") {
                // Réinitialiser le formulaire
                setFormData({
                    patientId: "",
                    date: new Date().toISOString().slice(0, 16),
                    motif: "",
                    diagnostic: "",
                    traitement: "",
                    medecin: "",
                    specialite: "",
                    tensionArterielle: "",
                    tauxGlycemie: "",
                    frequenceCardiaque: "",
                    poids: "",
                    temperature: "",
                    notes: "",
                    medicaments: "",
                    taille: "",
                    instructions: "",
                    allergies: "",
                    antecedentsMedicaux: "",
                    teleconsultation: "presentiel",
                    visioLink: "",
                });

                // Fermer le dialog
                setIsDialogOpen(false);

                // Recharger la liste des consultations
                await fetchConsultations();

                // Afficher un message de succès
                alert("Consultation créée avec succès !");
            } else {
                throw new Error("Erreur lors de la création de la consultation");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création");
            console.error("Erreur lors de la création de la consultation:", err);
            alert(`Erreur: ${err instanceof Error ? err.message : "Une erreur est survenue"}`);
        } finally {
            setCreating(false);
        }
    };

    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch =
            consultation.patientId.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.patientId.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.medecin.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialite = selectedSpecialite === "all" || consultation.specialite === selectedSpecialite;

        return matchesSearch && matchesSpecialite;
    });

    const getTypeIcon = (type: string) => {
        return type === "Analyse" ?
            <Microscope className="h-4 w-4 text-blue-500" /> :
            <Stethoscope className="h-4 w-4 text-red-500" />;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-muted-foreground">Chargement des consultations...</p>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                                {/* Colonne 1 - Informations de base */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Informations générales</h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="patientId">Patient *</Label>
                                        <Select
                                            value={formData.patientId}
                                            onValueChange={(value) => handleSelectChange('patientId', value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un patient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {patients.map(patient => (
                                                    <SelectItem key={patient._id} value={patient._id}>
                                                        {patient.prenom} {patient.nom}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">
                                            Date et heure <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="date"
                                            type="datetime-local"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="motif">
                                            Motif de consultation <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="motif"
                                            placeholder="Raison de la visite"
                                            value={formData.motif}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="medecin">
                                            Médecin <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="medecin"
                                            placeholder="Nom du médecin"
                                            value={formData.medecin}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specialite">
                                            Spécialité <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={formData.specialite}
                                            onValueChange={(value) => handleSelectChange("specialite", value)}
                                            required
                                        >
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
                                        <Select
                                            value={formData.teleconsultation}
                                            onValueChange={(value) => handleSelectChange("teleconsultation", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="presentiel">Présentiel</SelectItem>
                                                <SelectItem value="teleconsultation">Téléconsultation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {formData.teleconsultation === "teleconsultation" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="visioLink">Lien de visioconférence</Label>
                                            <Input
                                                id="visioLink"
                                                placeholder="https://..."
                                                value={formData.visioLink}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Colonne 2 - Informations médicales */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Données médicales</h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="poids">
                                                Poids (kg) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="poids"
                                                type="number"
                                                placeholder="70"
                                                value={formData.poids}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="taille">Taille (cm)</Label>
                                            <Input
                                                id="taille"
                                                type="number"
                                                placeholder="175"
                                                value={formData.taille}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="temperature">
                                                Température (°C) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="temperature"
                                                type="number"
                                                placeholder="37.2"
                                                step="0.1"
                                                value={formData.temperature}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tensionArterielle">
                                                Tension artérielle <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="tensionArterielle"
                                                placeholder="120/80"
                                                value={formData.tensionArterielle}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="tauxGlycemie">
                                                Glycémie (mg/dL) <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="tauxGlycemie"
                                                type="number"
                                                placeholder="100"
                                                value={formData.tauxGlycemie}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="frequenceCardiaque">Fréquence cardiaque</Label>
                                            <Input
                                                id="frequenceCardiaque"
                                                type="number"
                                                placeholder="72"
                                                value={formData.frequenceCardiaque}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="allergies">Allergies</Label>
                                        <Input
                                            id="allergies"
                                            placeholder="Liste des allergies (séparées par des virgules)"
                                            value={formData.allergies}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="antecedentsMedicaux">Antécédents médicaux</Label>
                                        <Textarea
                                            id="antecedentsMedicaux"
                                            placeholder="Antécédents du patient (séparés par des virgules)"
                                            value={formData.antecedentsMedicaux}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Colonne pleine largeur pour les champs supplémentaires */}
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="font-semibold">Diagnostic et traitement</h3>

                                    <div className="space-y-2">
                                        <Label htmlFor="diagnostic">
                                            Diagnostic <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="diagnostic"
                                            placeholder="Diagnostic établi"
                                            value={formData.diagnostic}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="traitement">
                                            Traitement prescrit <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="traitement"
                                            placeholder="Traitement à suivre"
                                            value={formData.traitement}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="medicaments">Médicaments</Label>
                                        <Textarea
                                            id="medicaments"
                                            placeholder="Liste des médicaments prescrits (séparés par des virgules)"
                                            value={formData.medicaments}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="instructions">Instructions</Label>
                                        <Textarea
                                            id="instructions"
                                            placeholder="Instructions supplémentaires"
                                            value={formData.instructions}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">
                                            Notes supplémentaires <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Observations et remarques"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button" className="cursor-pointer">
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={creating} className="cursor-pointer">
                                    {creating ? "Création..." : "Créer la consultation"}
                                </Button>
                            </DialogFooter>
                        </form>
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
                                            {consultation.patientId.prenom} {consultation.patientId.nom}
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

                    {filteredConsultations.length === 0 && consultations.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucune consultation ne correspond à votre recherche</p>
                        </div>
                    )}

                    {consultations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucune consultation trouvée</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

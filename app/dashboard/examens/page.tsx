"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
import { Plus, Search, Filter, Eye, Calendar, User, FileText, Download, Stethoscope, Microscope, Loader2 } from "lucide-react";

// Interface pour les données d'examen
interface Examen {
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
    medecin: string;
    specialite: string;
    typeExamen: string;
    dateExamen: string;
    resulatExamen: string;
    fichierUrl?: string;
    __v: number;
}

const typeExamenOptions = [
    { value: "all", label: "Tous les types" },
    { value: "Analyse", label: "Analyse" },
    { value: "Radiographie", label: "Radiographie" },
    { value: "Échographie", label: "Échographie" },
    { value: "Scanner", label: "Scanner" },
    { value: "IRM", label: "IRM" },
    { value: "Opération chirurgicale", label: "Opération chirurgicale" },
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
    const [examens, setExamens] = useState<Examen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [patients, setPatients] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        patientId: "",
        typeExamen: "",
        medecin: "",
        specialite: "",
        dateExamen: "",
        resulatExamen: "",
        fichierUrl: ""
    });

    // Récupération des examens depuis l'API
    const fetchExamens = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-examens`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "Examens médicaux récupérés avec succès !" && data.examens) {
                setExamens(data.examens);
            } else {
                throw new Error("Données examens non trouvées");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error("Erreur lors de la récupération des examens:", err);
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

    useEffect(() => {
        fetchExamens();
        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setCreating(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

            // Préparer les données pour l'API
            const examenData = {
                patientId: formData.patientId,
                typeExamen: formData.typeExamen,
                medecin: formData.medecin,
                specialite: formData.specialite,
                dateExamen: formData.dateExamen,
                resulatExamen: formData.resulatExamen,
                fichierUrl: formData.fichierUrl || ""
            };

            // console.log("1 ... Données à envoyer:", examenData);

            const response = await fetch(`${apiUrl}/create-examen`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(examenData),
            });

            // console.log("2 ... Réponse de l'API:", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            // console.log("3 ... Données reçues:", data);

            if (data.message === "Examen médical crée avec succès !") {
                // Réinitialiser le formulaire
                setFormData({
                    patientId: "",
                    typeExamen: "",
                    medecin: "",
                    specialite: "",
                    dateExamen: "",
                    resulatExamen: "",
                    fichierUrl: ""
                });

                // Fermer le dialog
                setIsDialogOpen(false);

                // Recharger la liste des examens
                await fetchExamens();

                // Afficher un message de succès
                alert("Examen créé avec succès !");
            } else {
                throw new Error("Erreur lors de la création de l'examen");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création");
            console.error("Erreur lors de la création de l'examen:", err);
            alert(`Erreur: ${err instanceof Error ? err.message : "Une erreur est survenue"}`);
        } finally {
            setCreating(false);
        }
    };

    const filteredExamens = examens.filter(examen => {
        const matchesSearch =
            examen.patientId.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.patientId.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.medecin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            examen.resulatExamen.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedType === "all" || examen.typeExamen === selectedType;
        const matchesSpecialite = selectedSpecialite === "all" || examen.specialite === selectedSpecialite;

        return matchesSearch && matchesType && matchesSpecialite;
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
                    <p className="mt-2 text-muted-foreground">Chargement des examens...</p>
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
                        <Button className="flex items-center gap-2 cursor-pointer">
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

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label htmlFor="typeExamen">Type d'examen *</Label>
                                        <Select
                                            value={formData.typeExamen}
                                            onValueChange={(value) => handleSelectChange('typeExamen', value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner le type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {typeExamenOptions.map(type => (
                                                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="medecin">Médecin *</Label>
                                        <Input
                                            id="medecin"
                                            placeholder="Nom du médecin"
                                            required
                                            value={formData.medecin}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="specialite">Spécialité *</Label>
                                        <Select
                                            value={formData.specialite}
                                            onValueChange={(value) => handleSelectChange('specialite', value)}
                                            required
                                        >
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
                                    <Input
                                        id="dateExamen"
                                        type="datetime-local"
                                        required
                                        value={formData.dateExamen}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="resulatExamen">Résultat *</Label>
                                    <Input
                                        id="resulatExamen"
                                        placeholder="Résultat de l'examen"
                                        required
                                        value={formData.resulatExamen}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="fichier">Fichier joint</Label>
                                    <Input
                                        id="fichierUrl"
                                        placeholder="URL du fichier (optionnel)"
                                        value={formData.fichierUrl}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(false)}
                                    disabled={creating}
                                    className="cursor-pointer"
                                >
                                    Annuler
                                </Button>
                                <Button type="submit" disabled={creating} className="cursor-pointer">
                                    {creating ? "Création..." : "Enregistrer l'examen"}
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
                                {/* <TableHead>Statut</TableHead> */}
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
                                        {examen.resulatExamen}
                                    </TableCell>
                                    {/* <TableCell>
                                        {getStatusBadge(examen.status as Status)}
                                    </TableCell> */}
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

                    {filteredExamens.length === 0 && examens.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun examen ne correspond à votre recherche</p>
                        </div>
                    )}

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

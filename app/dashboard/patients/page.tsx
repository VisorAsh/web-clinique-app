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
import { Plus, Search, Filter, Eye, Calendar, User, Phone, Mail, Loader2 } from "lucide-react";

// Interface pour les données patient
interface Patient {
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
}

const genderOptions = [
    { value: "male", label: "Homme" },
    { value: "female", label: "Femme" },
    // { value: "other", label: "Autre" },
];

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        birthDate: "",
        telephone: "",
        email: "",
        gender: "",
        // ref: ""
    });
    // État pour les contacts d'urgence (au moins 1 requis)
    const [emergencyContacts, setEmergencyContacts] = useState([
        { nom: "", prenom: "", relation: "", telephone: "" }
    ]);

    // Récupération des patients depuis l'API
    const fetchPatients = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-patient`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "ok" && data.patient) {
                setPatients(data.patient);
            } else {
                throw new Error("Données patients non trouvées");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error("Erreur lors de la récupération des patients:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            gender: value
        }));
    };

    // Gestion des changements pour les contacts d'urgence
    const handleEmergencyContactChange = (index: number, field: string, value: string) => {
        const updatedContacts = [...emergencyContacts];
        updatedContacts[index] = {
            ...updatedContacts[index],
            [field]: value
        };
        setEmergencyContacts(updatedContacts);
    };

    // Ajouter un nouveau contact d'urgence
    const addEmergencyContact = () => {
        if (emergencyContacts.length < 2) {
            setEmergencyContacts([...emergencyContacts, { nom: "", prenom: "", relation: "", telephone: "" }]);
        }
    };

    // Supprimer un contact d'urgence
    const removeEmergencyContact = (index: number) => {
        if (emergencyContacts.length > 1) {
            const updatedContacts = [...emergencyContacts];
            updatedContacts.splice(index, 1);
            setEmergencyContacts(updatedContacts);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation des contacts d'urgence
        const hasEmptyContact = emergencyContacts.some(contact =>
            !contact.nom || !contact.prenom || !contact.relation || !contact.telephone
        );

        if (hasEmptyContact) {
            alert("Veuillez remplir tous les champs des contacts d'urgence");
            return;
        }

        try {
            setCreating(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

            // Préparer les données pour l'API
            const patientData = {
                nom: formData.nom,
                prenom: formData.prenom,
                birthDate: formData.birthDate,
                telephone: formData.telephone,
                email: formData.email || undefined,
                gender: formData.gender,
                // ref: formData.ref || undefined,
                emergencyContacts: emergencyContacts.filter(contact =>
                    contact.nom && contact.prenom && contact.relation && contact.telephone
                )
            };

            // console.log("1 .. Données du patient:", patientData);

            const response = await fetch(`${apiUrl}/create-patient`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(patientData),
            });

            // console.log("2 .. Response de l'API:", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            // console.log("3 .. Données du patient:", data);

            if (data.message === "ok") {
                // Réinitialiser le formulaire
                setFormData({
                    nom: "",
                    prenom: "",
                    birthDate: "",
                    telephone: "",
                    email: "",
                    gender: "",
                    // ref: ""
                });
                setEmergencyContacts([{ nom: "", prenom: "", relation: "", telephone: "" }]);

                // Fermer le dialog
                setIsDialogOpen(false);

                // Recharger la liste des patients
                await fetchPatients();

                // Afficher un message de succès
                alert("Patient créé avec succès !");
            } else {
                throw new Error("Erreur lors de la création du patient");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue lors de la création");
            console.error("Erreur lors de la création du patient:", err);
            alert(`Erreur: ${err instanceof Error ? err.message : "Une erreur est survenue"}`);
        } finally {
            setCreating(false);
        }
    };

    const filteredPatients = patients.filter(patient => {
        const matchesSearch =
            patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.telephone.toLowerCase().includes(searchTerm.toLowerCase());

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-muted-foreground">Chargement des patients...</p>
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
                {/* <div>
                    <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
                    <p className="text-muted-foreground">
                        Gérez les dossiers de vos patients
                    </p>
                </div> */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 cursor-pointer">
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

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom *</Label>
                                    <Input
                                        id="nom"
                                        placeholder="Nom de famille"
                                        required
                                        value={formData.nom}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="prenom">Prénom *</Label>
                                    <Input
                                        id="prenom"
                                        placeholder="Prénom"
                                        required
                                        value={formData.prenom}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="birthDate">Date de naissance *</Label>
                                    <Input
                                        id="birthDate"
                                        type="date"
                                        required
                                        value={formData.birthDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Genre *</Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={handleSelectChange}
                                        required
                                    >
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
                                    <Input
                                        id="telephone"
                                        placeholder="Numéro de téléphone"
                                        required
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Adresse email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="ref">Référence patient</Label>
                                    <Input
                                        id="ref"
                                        placeholder="Référence unique (auto-générée si vide)"
                                        value={formData.ref}
                                        onChange={handleInputChange}
                                    />
                                </div> */}

                                {/* Contacts d'urgence */}
                                <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Contacts d'urgence *</Label>
                                        {emergencyContacts.length < 2 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addEmergencyContact}
                                                className="flex items-center gap-1"
                                            >
                                                <Plus className="h-3 w-3" />
                                                Ajouter un contact
                                            </Button>
                                        )}
                                    </div>

                                    {emergencyContacts.map((contact, index) => (
                                        <div key={index} className="p-4 border rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium">Contact {index + 1}</h4>
                                                {emergencyContacts.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeEmergencyContact(index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Supprimer
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`emergency-nom-${index}`}>Nom *</Label>
                                                    <Input
                                                        id={`emergency-nom-${index}`}
                                                        placeholder="Nom"
                                                        required
                                                        value={contact.nom}
                                                        onChange={(e) => handleEmergencyContactChange(index, 'nom', e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`emergency-prenom-${index}`}>Prénom *</Label>
                                                    <Input
                                                        id={`emergency-prenom-${index}`}
                                                        placeholder="Prénom"
                                                        required
                                                        value={contact.prenom}
                                                        onChange={(e) => handleEmergencyContactChange(index, 'prenom', e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`emergency-relation-${index}`}>Relation *</Label>
                                                    <Input
                                                        id={`emergency-relation-${index}`}
                                                        placeholder="Relation (épouse, frère, etc.)"
                                                        required
                                                        value={contact.relation}
                                                        onChange={(e) => handleEmergencyContactChange(index, 'relation', e.target.value)}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`emergency-telephone-${index}`}>Téléphone *</Label>
                                                    <Input
                                                        id={`emergency-telephone-${index}`}
                                                        placeholder="Numéro de téléphone"
                                                        required
                                                        value={contact.telephone}
                                                        onChange={(e) => handleEmergencyContactChange(index, 'telephone', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                    {creating ? "Création..." : "Créer le patient"}
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
                                    <TableCell>
                                        {/* <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {patient.prenom} {patient.nom}
                                        </div> */}
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{patient.prenom} {patient.nom}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    ID: {patient._id.substring(0, 8)}...
                                                </div>
                                            </div>
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

                    {filteredPatients.length === 0 && patients.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun patient ne correspond à votre recherche</p>
                        </div>
                    )}

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

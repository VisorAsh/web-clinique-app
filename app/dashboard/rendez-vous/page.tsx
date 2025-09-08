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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Calendar, User, Phone, Mail, Loader2, Clock, MoreHorizontal, Edit, CalendarCheck, X, CheckCircle, XCircle } from "lucide-react";
// import { toast } from "sonner";

// Interface pour les données RendezVous
interface RendezVous {
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
    motif: string;
    specialite: string;
    heure: string;
    dateReservation: string;
    dateRdv: string;
    status: string;
    notification: false;
    type: string;
    __v: number;
}

const genderOptions = [
    { value: "male", label: "Homme" },
    { value: "female", label: "Femme" },
];

export default function RendezVousPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGender, setSelectedGender] = useState("all");
    const [rendezvous, setRendezVous] = useState<RendezVous[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Récupération des rendez-vous depuis l'API
    const fetchRendezVous = async () => {
        try {
            setLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-rendezvous`);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            if (data.message === "Rendez-vous récupérés avec succès !" && data.rendezvous) {
                setRendezVous(data.rendezvous);
            } else {
                throw new Error("Données rendez-vous non trouvées");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue");
            console.error("Erreur lors de la récupération des rendez-vous:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRendezVous();
    }, []);

    // Fonction pour mettre à jour le statut d'un rendez-vous
    const updateRendezVousStatus = async (id: string, newStatus: string) => {
        try {
            setUpdatingId(id);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

            const response = await fetch(`${apiUrl}/update-rendezvous/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rendezVousId: id,
                    status: newStatus
                }),
            });

            // console.log("Response de l'API : ", response);

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Données reçues après mise à jour :", data);

            if (data.message === "rendez-vous modifié avec succès !") {
                // Mettre à jour l'état local
                setRendezVous(prev => prev.map(rdv =>
                    rdv._id === id ? { ...rdv, status: newStatus } : rdv
                ));

                // toast.success(`Rendez-vous ${newStatus.toLowerCase()} avec succès`);
            } else {
                throw new Error("Erreur lors de la mise à jour");
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
            // toast.error(errorMessage);
            console.error("Erreur lors de la mise à jour du rendez-vous:", err);
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredRendezVous = rendezvous.filter(rdv => {
        const matchesSearch =
            rdv.patientId.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.patientId.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.patientId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rdv.patientId.telephone.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGender = selectedGender === "all" || rdv.patientId.gender === selectedGender;

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
                    <p className="mt-2 text-muted-foreground">Chargement des rendez-vous...</p>
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
                                placeholder="Rechercher un rendez-vous par le nom, prénom, email... d'un patient"
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

            {/* Tableau des rendez-vous */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des rendez-vous</CardTitle>
                    <CardDescription>
                        {filteredRendezVous.length} rendez-vous trouvés
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Motif</TableHead>
                                <TableHead>Spécialité</TableHead>
                                <TableHead>Date et heure</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRendezVous.map((rendezVous) => (
                                <TableRow key={rendezVous._id} className="hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {rendezVous.patientId?.prenom || "N/A"} {rendezVous.patientId?.nom || "N/A"}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    ID: {rendezVous.patientId && typeof rendezVous.patientId._id === "string"
                                                        ? rendezVous.patientId._id.substring(0, 8)
                                                        : "N/A"
                                                    }...
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[200px] truncate" title={rendezVous.motif}>
                                            {rendezVous.motif}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                            {rendezVous.specialite}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">
                                                    {new Date(rendezVous.dateRdv).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{rendezVous.heure}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={rendezVous.type === "Téléconsultation" ? "default" : "secondary"}
                                            className={rendezVous.type === "Téléconsultation"
                                                ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                            }
                                        >
                                            {rendezVous.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                rendezVous.status === "Confirmé"
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : rendezVous.status === "Annulé"
                                                        ? "bg-red-50 text-red-700 border-red-200"
                                                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                            }
                                        >
                                            {rendezVous.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="cursor-pointer"
                                                        disabled={updatingId === rendezVous._id}
                                                    >
                                                        {updatingId === rendezVous._id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {rendezVous.status !== "Confirmé" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onClick={() => updateRendezVousStatus(rendezVous._id, "Confirmé")}
                                                            disabled={updatingId === rendezVous._id}
                                                        >
                                                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                                            Confirmer
                                                        </DropdownMenuItem>
                                                    )}
                                                    {rendezVous.status !== "Annulé" && (
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onClick={() => updateRendezVousStatus(rendezVous._id, "Annulé")}
                                                            disabled={updatingId === rendezVous._id}
                                                        >
                                                            <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                                            Annuler
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredRendezVous.length === 0 && rendezvous.length > 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun rendez-vous ne correspond à votre recherche</p>
                        </div>
                    )}

                    {rendezvous.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Aucun rendez-vous trouvé</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

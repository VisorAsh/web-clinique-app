"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, FileText, Download, Stethoscope, Microscope, Clock, UserCheck, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Données mockées (normalement récupérées via API avec l'id)
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
    fichierUrl: string;
}

export default function ExamenDetailsPage() {
    const params = useParams();
    const examenId = params.id as string;

    const [examenDetails, setExamenDetails] = useState<Examen | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupération des données de consultation depuis l'API
    useEffect(() => {
        // console.log("Récupération des détails de la consultation pour l'ID:", examenId);
        const fetchExamenDetails = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
                const response = await fetch(`${apiUrl}/get-examen/${examenId}`);

                // console.log("Response de l'API : ", response);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Données reçues de l'API : ", data);

                if (data.data) {
                    setExamenDetails(data.data);
                } else {
                    throw new Error("Examen non trouvé");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setLoading(false);
            }
        };

        if (examenId) {
            fetchExamenDetails();
        }
    }, [examenId]);

    const formattedDate = examenDetails
        ? new Date(examenDetails.dateExamen).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    const formattedTime = examenDetails
        ? new Date(examenDetails.dateExamen).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "";

    // Calcul de l'âge du patient
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

    const age = examenDetails ? calculateAge(examenDetails.patientId.birthDate) : null;

    // Badge pour le type d'examen
    const getTypeBadge = (type: string) => {
        const typeConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline"; icon: any }> = {
            Analyse: { label: "Analyse", variant: "default", icon: Microscope },
            Radiographie: { label: "Radiographie", variant: "secondary", icon: FileText },
            Échographie: { label: "Échographie", variant: "secondary", icon: Stethoscope },
            Scanner: { label: "Scanner", variant: "default", icon: FileText },
            IRM: { label: "IRM", variant: "default", icon: FileText },
            Opération: { label: "Opération chirurgicale", variant: "secondary", icon: Stethoscope },
        };

        const config = typeConfig[type] || { label: "Inconnu", variant: "outline" as const, icon: FileText };
        const IconComponent = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <IconComponent className="h-3 w-3" />
                {config.label}
            </Badge>
        );
    };


    // Badge pour le statut
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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-muted-foreground">Chargement des détails de l'examen...</p>
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
                        <Button
                            variant="outline"
                            className="mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Réessayer
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!examenDetails) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground">Aucune donnée de consultation disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Détails de l'examen</h2>
                    <p className="text-muted-foreground">
                        {examenDetails.typeExamen} de {examenDetails.patientId.prenom} {examenDetails.patientId.nom}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="cursor-pointer">Modifier</Button>
                    {examenDetails.fichierUrl && (
                        <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
                            <Download className="h-4 w-4" />
                            Télécharger
                        </Button>
                    )}
                    <Button variant="outline" className="cursor-pointer">Imprimer</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Informations générales */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Informations générales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Date
                                </div>
                                <p className="font-medium">{formattedDate}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Heure
                                </div>
                                <p className="font-medium">{formattedTime}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Type
                                </div>
                                <div className="font-medium">{getTypeBadge(examenDetails.typeExamen)}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Statut
                                </div>
                                <Badge variant="default">Terminé</Badge>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <UserCheck className="h-4 w-4" />
                                    Médecin
                                </div>
                                <p className="font-medium">{examenDetails.medecin}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Spécialité
                                </div>
                                <p className="font-medium">{examenDetails.specialite}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Résultats de l'examen */}
                    <Card>
                        <CardHeader className="">
                            <CardTitle>Résultats de l'examen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="whitespace-pre-line">{examenDetails.resulatExamen}</p>
                            </div>

                            {/* {examenDetails.resulatExamen && (
                                <>
                                    <Separator className="my-4" />
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes supplémentaires</h3>
                                        <p className="text-sm">{examenDetails.resulatExamen}</p>
                                    </div>
                                </>
                            )} */}
                        </CardContent>
                    </Card>
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                    {/* Informations du patient */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informations du patient
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Patient</div>
                                <p className="font-medium">{examenDetails.patientId.prenom} {examenDetails.patientId.nom}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Âge</div>
                                <p className="font-medium">{age} ans</p>
                            </div>

                            {/* <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Référence</div>
                                <p className="font-medium">{examenDetails.patientId.ref}</p>
                            </div> */}

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Téléphone</div>
                                <p className="font-medium">{examenDetails.patientId.telephone}</p>
                            </div>

                            {examenDetails.patientId.email && (
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Email</div>
                                    <p className="font-medium">{examenDetails.patientId.email}</p>
                                </div>
                            )}

                            <Button variant="outline" className="w-full mt-2 cursor-pointer" asChild>
                                <a href={`/dashboard/patients/${examenDetails.patientId._id}`}>
                                    Voir le dossier patient
                                </a>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Fichiers joints */}
                    {examenDetails.fichierUrl && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Fichiers joints</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Rapport d'examen</p>
                                            <p className="text-xs text-muted-foreground">PDF</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={examenDetails.fichierUrl} target="_blank" rel="noopener noreferrer" download>
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions rapides */}
                    {/* <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <FileText className="h-4 w-4 mr-2" />
                                Générer un rapport
                            </Button>
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <Calendar className="h-4 w-4 mr-2" />
                                Planifier un suivi
                            </Button>
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <User className="h-4 w-4 mr-2" />
                                Contacter le patient
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>
            </div>

            {/* Examens similaires */}
            {/* <Card>
                <CardHeader>
                    <CardTitle>Examens similaires</CardTitle>
                    <CardDescription>
                        Autres examens de {examenDetails.patientId.prenom} {examenDetails.patientId.nom}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    {getTypeBadge(examenDetails.typeExamen)}
                                    <div>
                                        <div className="font-medium">{examenDetails.typeExamen} #{item}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(examenDetails.dateExamen).toLocaleDateString()} - {examenDetails.medecin}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    Voir détails
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Button variant="outline">Voir tout l'historique</Button>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    );
}

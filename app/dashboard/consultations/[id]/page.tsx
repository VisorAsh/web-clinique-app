"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, FileText, Download, Stethoscope, Microscope, Clock, UserCheck, Loader2 } from "lucide-react";

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

export default function ConsultationDetailsPage() {
    const params = useParams();
    const consultationId = params.id as string;

    const [consultation, setConsultation] = useState<Consultation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupération des données de consultation depuis l'API
    useEffect(() => {
        // console.log("Récupération des détails de la consultation pour l'ID:", consultationId);
        const fetchConsultationDetails = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
                const response = await fetch(`${apiUrl}/get-consultation/${consultationId}`);

                // console.log("Response de l'API : ", response);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                // console.log("Données reçues de l'API : ", data);

                if (data.data) {
                    setConsultation(data.data);
                } else {
                    throw new Error("Consultation non trouvée");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setLoading(false);
            }
        };

        if (consultationId) {
            fetchConsultationDetails();
        }
    }, [consultationId]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-muted-foreground">Chargement des détails de la consultation...</p>
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

    if (!consultation) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground">Aucune donnée de consultation disponible</p>
                </div>
            </div>
        );
    }

    // Formatage de la date de l'examen
    const formattedDateExamen = new Date(consultation.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Calcul de l'âge du patient
    const age = calculateAge(consultation.patientId.birthDate);

    // Badge pour le type d'examen
    const getTypeBadge = () => {
        return (
            <Badge variant="default" className="flex items-center gap-1">
                <Stethoscope className="h-3 w-3" />
                Consultation
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Détails de la consultation</h2>
                    <p className="text-muted-foreground">
                        Consultation du {new Date(consultation.date).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Modifier</Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Télécharger
                    </Button>
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
                                    Date et heure
                                </div>
                                <p className="font-medium">{formattedDateExamen}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Type
                                </div>
                                <div className="font-medium">{getTypeBadge()}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <UserCheck className="h-4 w-4" />
                                    Médecin
                                </div>
                                <p className="font-medium">{consultation.medecin}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Spécialité
                                </div>
                                <p className="font-medium">{consultation.specialite}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    Motif
                                </div>
                                <p className="font-medium">{consultation.motif}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Téléconsultation
                                </div>
                                <Badge variant={consultation.teleconsultation ? "secondary" : "default"}>
                                    {consultation.teleconsultation ? "Oui" : "Non"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Diagnostic et traitement */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Diagnostic et traitement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Diagnostic</h3>
                                <p className="font-medium">{consultation.diagnostic}</p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Traitement prescrit</h3>
                                <p>{consultation.traitement}</p>
                            </div>


                            {
                                consultation.medicaments.length > 0 && (
                                    <div className="space-y-4">
                                        <Separator />
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                                            Médicaments
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1 mt-2">
                                            {consultation.medicaments.map((med, index) => (
                                                <li key={index} className="text-sm">{med}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            }


                            {
                                consultation.instructions && (
                                    <div className="space-y-4">
                                        <Separator />
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Instructions</h3>
                                        <p className="text-sm">{consultation.instructions}</p>
                                    </div>
                                )
                            }
                        </CardContent>
                    </Card>

                    {/* Notes supplémentaires */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Notes et observations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{consultation.notes}</p>
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
                                <p className="font-medium">{consultation.patientId.prenom} {consultation.patientId.nom}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Âge</div>
                                <p className="font-medium">{age} ans</p>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Téléphone</div>
                                <p className="font-medium">{consultation.patientId.telephone}</p>
                            </div>

                            {consultation.patientId.email && (
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Email</div>
                                    <p className="font-medium">{consultation.patientId.email}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Signes vitaux */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Signes vitaux</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Tension art.</div>
                                    <p className="font-medium">{consultation.tensionArterielle} mmHg</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Glycémie</div>
                                    <p className="font-medium">{consultation.tauxGlycemie} mg/dL</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">FC</div>
                                    <p className="font-medium">{consultation.frequenceCardiaque} bpm</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Température</div>
                                    <p className="font-medium">{consultation.temperature} °C</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Poids</div>
                                    <p className="font-medium">{consultation.poids} kg</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Taille</div>
                                    <p className="font-medium">{consultation.taille} cm</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Antécédents et allergies */}
                    <Card>
                        <CardHeader className="">
                            <CardTitle>Antécédents médicaux</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {consultation.allergies.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {consultation.allergies.map((allergie, index) => (
                                            <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                                {allergie}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {consultation.antecedentsMedicaux.length > 0 && (
                                <>
                                    <Separator />
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Antécédents</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {consultation.antecedentsMedicaux.map((antecedent, index) => (
                                                <Badge key={index} variant="secondary">
                                                    {antecedent}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

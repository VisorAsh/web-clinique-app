"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Phone, Mail, VenusAndMars, Clock, AlertCircle, Contact, Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Interface pour les données patient
interface Patient {
    _id: string;
    nom: string;
    prenom: string;
    birthDate: string;
    telephone: string;
    email: string;
    gender: string;
    emergencycontact: Array<{
        nom: string;
        prenom: string;
        relation: string;
        telephone: string;
        email?: string;
    }>;
    createdAt: string;
    __v: number;
}

// Interfaces pour les données supplémentaires
interface Consultation {
    _id: string;
    date: string;
    motif: string;
    medecin: string;
    specialite: string;
    diagnostic: string;
}

interface Examen {
    _id: string;
    dateExamen: string;
    typeExamen: string;
    medecin: string;
    specialite: string;
    resultatExamen: string;
}

export default function PatientDetailsPage() {
    const params = useParams();
    const patientId = params.id as string;

    const [patient, setPatient] = useState<Patient | null>(null);
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [examens, setExamens] = useState<Examen[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Récupération des données patient depuis l'API
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                setLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

                // Récupération des infos du patient
                const patientResponse = await fetch(`${apiUrl}/get-patient/${patientId}`);

                if (!patientResponse.ok) {
                    throw new Error(`Erreur HTTP: ${patientResponse.status}`);
                }

                const patientData = await patientResponse.json();

                if (patientData.message === "ok" && patientData.patient) {
                    setPatient(patientData.patient);

                    // Récupération des consultations du patient
                    const consultationsResponse = await fetch(`${apiUrl}/get-consultations-patient/${patientId}`);
                    if (consultationsResponse.ok) {
                        const consultationsData = await consultationsResponse.json();
                        if (consultationsData.consultations) {
                            setConsultations(consultationsData.consultations.slice(0, 5)); // Limiter à 5 consultations
                        }
                    }

                    // Récupération des examens du patient
                    const examensResponse = await fetch(`${apiUrl}/get-examen-patient/${patientId}`);
                    if (examensResponse.ok) {
                        const examensData = await examensResponse.json();
                        if (examensData.examens) {
                            setExamens(examensData.examens.slice(0, 5)); // Limiter à 5 examens
                        }
                    }
                } else {
                    throw new Error("Patient non trouvé");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Une erreur est survenue");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setLoading(false);
            }
        };

        if (patientId) {
            fetchPatientData();
        }
    }, [patientId]);

    // Calcul de l'âge
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

    // Badge pour le genre
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
                    <p className="mt-2 text-muted-foreground">Chargement des données du patient...</p>
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

    if (!patient) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-muted-foreground">Aucune donnée patient disponible</p>
                </div>
            </div>
        );
    }

    const age = calculateAge(patient.birthDate);
    const formattedBirthDate = new Date(patient.birthDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedCreatedAt = new Date(patient.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Détails du patient</h2>
                    <p className="text-muted-foreground">
                        Dossier médical de {patient.prenom} {patient.nom}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Modifier
                    </Button>
                    <Button variant="outline">Imprimer</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Informations personnelles */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Informations personnelles
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    Nom complet
                                </div>
                                <p className="font-medium">{patient.prenom} {patient.nom}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <VenusAndMars className="h-4 w-4" />
                                    Genre
                                </div>
                                <div className="font-medium">{getGenderBadge(patient.gender)}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    Date de naissance
                                </div>
                                <p className="font-medium">{formattedBirthDate}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Âge
                                </div>
                                <p className="font-medium">{age} ans</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    ID Patient
                                </div>
                                <p className="font-medium text-sm">{patient._id}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Date d'inscription
                                </div>
                                <p className="font-medium">{formattedCreatedAt}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Informations de contact */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <Phone className="h-5 w-5" />
                                Informations de contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        Téléphone
                                    </div>
                                    <p className="font-medium">{patient.telephone}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </div>
                                    <p className="font-medium">{patient.email || "Non renseigné"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                    {/* Personnes à contacter en cas d'urgence */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Contacts d'urgence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {patient.emergencycontact.length > 0 ? (
                                patient.emergencycontact.map((contact, index) => (
                                    <div key={index} className="space-y-2 p-3 bg-muted/50 rounded-lg">
                                        <div className="font-medium">{contact.prenom} {contact.nom}</div>
                                        <div className="text-sm text-muted-foreground">{contact.relation}</div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Phone className="h-3 w-3" />
                                            {contact.telephone}
                                        </div>
                                        {contact.email && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Mail className="h-3 w-3" />
                                                {contact.email}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm">Aucun contact d'urgence renseigné</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Actions rapides */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <Edit className="h-4 w-4 mr-2" />
                                Modifier les informations
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Phone className="h-4 w-4 mr-2" />
                                Contacter le patient
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2" />
                                Prendre un rendez-vous
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Statistiques */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Statistiques</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Consultations</span>
                                <Badge variant="outline">{consultations.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Examens</span>
                                <Badge variant="outline">{examens.length}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Dernière visite</span>
                                <span className="text-sm font-medium">
                                    {consultations.length > 0
                                        ? new Date(consultations[0].date).toLocaleDateString()
                                        : "Aucune"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dernières consultations */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Historique des consultations</CardTitle>
                    <CardDescription>
                        Les dernières consultations de {patient.prenom} {patient.nom}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {consultations.length > 0 ? (
                            consultations.map((consultation) => (
                                <div key={consultation._id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">{consultation.motif}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(consultation.date).toLocaleDateString()} - {consultation.medecin} ({consultation.specialite})
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={`/dashboard/consultations/${consultation._id}`}>
                                            Voir détails
                                        </a>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground py-4">Aucune consultation trouvée</p>
                        )}
                    </div>
                    {/* {consultations.length > 0 && (
                        <div className="mt-4 text-center">
                            <Button variant="outline">Voir tout l'historique</Button>
                        </div>
                    )} */}
                </CardContent>
            </Card>

            {/* Derniers examens */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Historique des examens</CardTitle>
                    <CardDescription>
                        Les 5 derniers examens de {patient.prenom} {patient.nom}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {examens.length > 0 ? (
                            examens.map((examen) => (
                                <div key={examen._id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <div className="font-medium">{examen.typeExamen}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(examen.dateExamen).toLocaleDateString()} - {examen.medecin} ({examen.specialite})
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={`/dashboard/examens/${examen._id}`}>
                                            Voir détails
                                        </a>
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground py-4">Aucun examen trouvé</p>
                        )}
                    </div>
                    {/* {examens.length > 0 && (
                        <div className="mt-4 text-center">
                            <Button variant="outline">Voir tout l'historique</Button>
                        </div>
                    )} */}
                </CardContent>
            </Card>
        </div>
    );
}

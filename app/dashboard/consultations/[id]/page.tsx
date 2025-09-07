"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Stethoscope, FileText, Pill, AlertCircle, Clock, Ruler, Thermometer, Heart, Scale, Syringe } from "lucide-react";

// Données mockées (normalement récupérées via API avec l'id)
const consultationDetails = {
    _id: "1",
    patientId: "Jean Dupont",
    date: "2025-09-01T10:30:00",
    motif: "Douleur thoracique",
    diagnostic: "Angine de poitrine",
    traitement: "Repos, bêtabloquants",
    medecin: "Dr. Martin",
    specialite: "Cardiologie",
    tensionArterielle: "140/90",
    tauxGlycemie: 1.1,
    frequenceCardiaque: 78,
    poids: 78,
    temperature: 37.2,
    notes: "Patient en amélioration, symptômes stabilisés. Recommandation de suivi dans un mois avec tests supplémentaires si nécessaire.",
    medicaments: ["Aspirine 100mg", "Bisoprolol 5mg", "Atorvastatine 20mg"],
    taille: 175,
    instructions: "Prendre les médicaments après les repas. Éviter les efforts physiques intenses. Contacter immédiatement en cas de douleur thoracique persistante.",
    allergies: ["Pénicilline", "Arachides"],
    antecedentsMedicaux: ["Hypertension artérielle", "Diabète type 2", "Hypercholestérolémie"],
    teleconsultation: false,
    status: "completed",
    duree: "30 minutes",
    imc: 25.5
};

export default function ConsultationDetailsPage() {
    // Calcul de l'IMC
    const imc = consultationDetails.poids / Math.pow(consultationDetails.taille / 100, 2);

    // Interprétation de l'IMC
    const getImcStatus = (imc: number) => {
        if (imc < 18.5) return { status: "Insuffisance pondérale", variant: "secondary" as const };
        if (imc < 25) return { status: "Poids normal", variant: "default" as const };
        if (imc < 30) return { status: "Surpoids", variant: "outline" as const };
        return { status: "Obésité", variant: "destructive" as const };
    };

    const imcStatus = getImcStatus(imc);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Détails de la consultation</h2>
                    <p className="text-muted-foreground">
                        Consultation du {new Date(consultationDetails.date).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="cursor-pointer">Modifier</Button>
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
                                    Date et heure
                                </div>
                                <p className="font-medium">
                                    {new Date(consultationDetails.date).toLocaleDateString()} à {' '}
                                    {new Date(consultationDetails.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Durée
                                </div>
                                <p className="font-medium">{consultationDetails.duree}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    Patient
                                </div>
                                <p className="font-medium">{consultationDetails.patientId}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Stethoscope className="h-4 w-4" />
                                    Médecin
                                </div>
                                <p className="font-medium">
                                    {consultationDetails.medecin} ({consultationDetails.specialite})
                                </p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="h-4 w-4" />
                                    Motif
                                </div>
                                <p className="font-medium">{consultationDetails.motif}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    Type
                                </div>
                                <Badge variant={consultationDetails.teleconsultation ? "secondary" : "default"}>
                                    {consultationDetails.teleconsultation ? "Téléconsultation" : "Présentiel"}
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
                                <p className="font-medium">{consultationDetails.diagnostic}</p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Traitement prescrit</h3>
                                <p>{consultationDetails.traitement}</p>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
                                    <Pill className="h-4 w-4" />
                                    Médicaments
                                </h3>
                                <ul className="list-disc list-inside space-y-1 mt-2">
                                    {consultationDetails.medicaments.map((med, index) => (
                                        <li key={index} className="text-sm">{med}</li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Instructions</h3>
                                <p className="text-sm">{consultationDetails.instructions}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes supplémentaires */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Notes et observations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{consultationDetails.notes}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Colonne latérale */}
                <div className="space-y-6">
                    {/* Signes vitaux */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                Signes vitaux
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Thermometer className="h-4 w-4" />
                                        Température
                                    </div>
                                    <p className="font-medium">{consultationDetails.temperature} °C</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Heart className="h-4 w-4" />
                                        FC
                                    </div>
                                    <p className="font-medium">{consultationDetails.frequenceCardiaque} bpm</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Tension art.</div>
                                    <p className="font-medium">{consultationDetails.tensionArterielle} mmHg</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground">Glycémie</div>
                                    <p className="font-medium">{consultationDetails.tauxGlycemie} g/L</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Scale className="h-4 w-4" />
                                        Poids
                                    </div>
                                    <p className="font-medium">{consultationDetails.poids} kg</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Ruler className="h-4 w-4" />
                                        Taille
                                    </div>
                                    <p className="font-medium">{consultationDetails.taille} cm</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">IMC</div>
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">{imc.toFixed(1)} kg/m²</p>
                                    <Badge variant={imcStatus.variant}>{imcStatus.status}</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Antécédents et allergies */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Informations médicales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {consultationDetails.allergies.map((allergie, index) => (
                                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                                            {allergie}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Antécédents médicaux</h3>
                                <div className="flex flex-wrap gap-2">
                                    {consultationDetails.antecedentsMedicaux.map((antecedent, index) => (
                                        <Badge key={index} variant="secondary">
                                            {antecedent}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions rapides */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <FileText className="h-4 w-4 mr-2" />
                                Générer un compte-rendu
                            </Button>
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <Pill className="h-4 w-4 mr-2" />
                                Prescription électronique
                            </Button>
                            <Button variant="outline" className="w-full justify-start cursor-pointer">
                                <Calendar className="h-4 w-4 mr-2" />
                                Planifier un suivi
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

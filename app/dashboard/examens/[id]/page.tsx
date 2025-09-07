"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, FileText, Download, Stethoscope, Microscope, Clock, UserCheck } from "lucide-react";

// Données mockées (normalement récupérées via API avec l'id)
const examenDetails = {
    _id: "1",
    patientId: {
        _id: "1",
        nom: "Dupont",
        prenom: "Jean",
        birthDate: "1985-05-15",
        telephone: "+33 6 12 34 56 78",
        email: "jean.dupont@email.com",
        ref: "PAT-001",
        gender: "male"
    },
    medecin: "Dr. Martin",
    specialite: "Cardiologie",
    typeExamen: "Analyse",
    dateExamen: "2024-09-15T10:30:00",
    resultatExamen: "Électrocardiogramme normal. Rythme sinusal régulier à 72 battements par minute. Ondes P, complexes QRS et ondes T normaux. Aucune anomalie détectée. Intervalle PR et QT dans les limites normales.",
    fichierUrl: "/documents/ecg-dupont.pdf",
    status: "completed",
    duree: "30 minutes",
    notes: "Patient coopératif. Aucune douleur ressentie pendant l'examen. Recommandation de suivi dans 6 mois."
};

export default function ExamenDetailsPage() {
    // Formatage de la date de l'examen
    const formattedDateExamen = new Date(examenDetails.dateExamen).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

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

    const age = calculateAge(examenDetails.patientId.birthDate);

    // Badge pour le type d'examen
    const getTypeBadge = (type: string) => {
        const typeConfig = {
            Analyse: { label: "Analyse", variant: "default" as const, icon: Microscope },
            "Opération chirurgicale": { label: "Opération chirurgicale", variant: "secondary" as const, icon: Stethoscope },
        };

        const config = (typeConfig as Record<string, typeof typeConfig[keyof typeof typeConfig]>)[type] || { label: "Inconnu", variant: "outline" as const, icon: FileText };
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
                    <Button variant="outline">Modifier</Button>
                    {examenDetails.fichierUrl && (
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Télécharger
                        </Button>
                    )}
                    <Button variant="outline">Imprimer</Button>
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
                                    <Clock className="h-4 w-4" />
                                    Durée
                                </div>
                                <p className="font-medium">{examenDetails.duree}</p>
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
                                <div className="font-medium">{getStatusBadge(examenDetails.status as Status)}</div>
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
                        <CardHeader className="pb-3">
                            <CardTitle>Résultats de l'examen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="whitespace-pre-line">{examenDetails.resultatExamen}</p>
                            </div>

                            {examenDetails.notes && (
                                <>
                                    <Separator className="my-4" />
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Notes supplémentaires</h3>
                                        <p className="text-sm">{examenDetails.notes}</p>
                                    </div>
                                </>
                            )}
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

                            <div className="space-y-1">
                                <div className="text-sm text-muted-foreground">Référence</div>
                                <p className="font-medium">{examenDetails.patientId.ref}</p>
                            </div>

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

                            <Button variant="outline" className="w-full mt-2" asChild>
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
                                            <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions rapides */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                Générer un rapport
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar className="h-4 w-4 mr-2" />
                                Planifier un suivi
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <User className="h-4 w-4 mr-2" />
                                Contacter le patient
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Examens similaires */}
            <Card>
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
            </Card>
        </div>
    );
}

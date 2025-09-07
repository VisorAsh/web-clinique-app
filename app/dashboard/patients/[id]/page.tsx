"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Phone, Mail, VenusAndMars, Clock, AlertCircle, Contact, Edit } from "lucide-react";

// Données mockées (normalement récupérées via API avec l'id)
const patientDetails = {
    _id: "1",
    nom: "Dupont",
    prenom: "Jean",
    birthDate: "1985-05-15",
    telephone: "+33 6 12 34 56 78",
    email: "jean.dupont@email.com",
    ref: "PAT-001",
    gender: "male",
    emergencycontact: [
        {
            nom: "Dupont",
            prenom: "Marie",
            relation: "épouse",
            telephone: "+33 6 98 76 54 32",
            email: "marie.dupont@email.com"
        },
        {
            nom: "Dupont",
            prenom: "Luc",
            relation: "fils",
            telephone: "+33 6 87 65 43 21"
        }
    ],
    createdAt: "2024-01-15T10:30:00",
};

export default function PatientDetailsPage() {
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

    const age = calculateAge(patientDetails.birthDate);

    // Formatage de la date de naissance
    const formattedBirthDate = new Date(patientDetails.birthDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Formatage de la date de création
    const formattedCreatedAt = new Date(patientDetails.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Détails du patient</h2>
                    <p className="text-muted-foreground">
                        Dossier médical de {patientDetails.prenom} {patientDetails.nom}
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
                                <p className="font-medium">{patientDetails.prenom} {patientDetails.nom}</p>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <VenusAndMars className="h-4 w-4" />
                                    Genre
                                </div>
                                <div className="font-medium">{getGenderBadge(patientDetails.gender)}</div>
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
                                    Référence
                                </div>
                                <p className="font-medium">{patientDetails.ref}</p>
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
                                <Contact className="h-5 w-5" />
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
                                    <p className="font-medium">{patientDetails.telephone}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </div>
                                    <p className="font-medium">{patientDetails.email || "Non renseigné"}</p>
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
                            {patientDetails.emergencycontact.length > 0 ? (
                                patientDetails.emergencycontact.map((contact, index) => (
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
                                <Badge variant="outline">12</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Dernière visite</span>
                                <span className="text-sm font-medium">15 Sep 2024</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Prochain RDV</span>
                                <span className="text-sm font-medium">30 Sep 2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Dernières consultations */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Historique des consultations récentes</CardTitle>
                    <CardDescription>
                        Les 5 dernières consultations de {patientDetails.prenom} {patientDetails.nom}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <div className="font-medium">Consultation #{item}</div>
                                    <div className="text-sm text-muted-foreground">15 Septembre 2024 - Dr. Martin</div>
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

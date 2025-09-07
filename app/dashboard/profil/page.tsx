"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Eye, EyeOff } from "lucide-react";

// Données mockées de l'utilisateur connecté
const userData = {
    _id: "1",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@clinique-totsi.com",
    specialite: "Cardiologie",
    adresse: "123 Rue de la Médecine, 75000 Paris",
    tel: "+33 6 12 34 56 78",
    dateEmbauche: "2020-03-15",
    autorisation: true
};

export default function ProfilePage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Formatage de la date d'embauche
    const formattedDateEmbauche = new Date(userData.dateEmbauche).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Calcul de l'ancienneté
    const calculateAnciennete = (dateEmbauche: string) => {
        const today = new Date();
        const embauche = new Date(dateEmbauche);
        const years = today.getFullYear() - embauche.getFullYear();
        const months = today.getMonth() - embauche.getMonth();

        if (months < 0) {
            return `${years - 1} ans et ${12 + months} mois`;
        }
        return `${years} ans et ${months} mois`;
    };

    const anciennete = calculateAnciennete(userData.dateEmbauche);

    return (
        <div className="space-y-6">
            {/* <div>
                <h2 className="text-3xl font-bold tracking-tight">Mon Profil</h2>
                <p className="text-muted-foreground">
                    Gérez vos informations personnelles et votre mot de passe
                </p>
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations personnelles */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Informations personnelles
                        </CardTitle>
                        <CardDescription>
                            Vos informations de compte
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{userData.prenom} {userData.nom}</h3>
                                <p className="text-muted-foreground">{userData.specialite}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{userData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Téléphone</p>
                                    <p className="font-medium">{userData.tel}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Adresse</p>
                                    <p className="font-medium">{userData.adresse}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Spécialité</p>
                                    <p className="font-medium">{userData.specialite}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Date d'embauche</p>
                                    <p className="font-medium">{formattedDateEmbauche}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Statut du compte</p>
                                    <Badge variant={userData.autorisation ? "default" : "secondary"}>
                                        {userData.autorisation ? "Activé" : "Désactivé"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">Ancienneté</h4>
                            <p className="text-blue-700">{anciennete} au sein de la clinique</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Modification du mot de passe */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Sécurité du compte
                        </CardTitle>
                        <CardDescription>
                            Modifiez votre mot de passe
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder="Entrez votre mot de passe actuel"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">
                                            {showCurrentPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="Entrez votre nouveau mot de passe"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">
                                            {showNewPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirmez votre nouveau mot de passe"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">
                                            {showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                <h4 className="font-semibold text-amber-800 mb-2">Recommandations de sécurité</h4>
                                <ul className="text-amber-700 text-sm space-y-1">
                                    <li>• Minimum 8 caractères</li>
                                    <li>• Au moins une majuscule</li>
                                    <li>• Au moins un chiffre</li>
                                    <li>• Au moins un caractère spécial</li>
                                </ul>
                            </div>

                            <Button type="submit" className="w-full">
                                Mettre à jour le mot de passe
                            </Button>
                        </form>

                        <Separator />

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h4 className="font-semibold text-green-800 mb-2">Dernière modification</h4>
                            <p className="text-green-700 text-sm">
                                Votre mot de passe a été mis à jour le {new Date().toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Statistiques d'utilisation */}
            <Card>
                <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>
                        Votre activité sur la plateforme au cours des 30 derniers jours
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-blue-600">24</div>
                            <div className="text-sm text-blue-500">Consultations</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-green-600">12</div>
                            <div className="text-sm text-green-500">Examens réalisés</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-purple-600">18</div>
                            <div className="text-sm text-purple-500">Patients suivis</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

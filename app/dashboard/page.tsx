"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    Calendar,
    FileText,
    Stethoscope,
    TrendingUp,
    Clock,
    AlertCircle,
    ArrowUp,
    ArrowDown,
    Loader2
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        patients: 0,
        consultations: 0,
        examens: 0,
        rdvAujourdhui: 0,
        tauxRemplissage: 0,
        evolutionPatients: 0,
        evolutionConsultations: 0,
    });
    const [consultations, setConsultations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Si l'utilisateur n'est pas connecté, il retourne sur la page de login
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/auth/login";
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [patientsRes, consultationsRes, examensRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-patient`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-consultations`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-examens`),
                ]);
                const patientsData = await patientsRes.json();
                const consultationsData = await consultationsRes.json();
                const examensData = await examensRes.json();
                // console.log({ patientsData, consultationsData, examensData });

                // Statistiques
                setStats({
                    patients: patientsData.patient.length,
                    consultations: consultationsData.consultations.length,
                    examens: examensData.examens.length,
                    rdvAujourdhui: consultationsData.consultations.filter((c: any) => {
                        const today = new Date();
                        const date = new Date(c.date);
                        return (
                            date.getDate() === today.getDate() &&
                            date.getMonth() === today.getMonth() &&
                            date.getFullYear() === today.getFullYear()
                        );
                    }).length,
                    tauxRemplissage: Math.round((consultationsData.consultations.length / 100) * 100), // à adapter selon logique métier
                    evolutionPatients: 0, // à calculer selon historique
                    evolutionConsultations: 0, // à calculer selon historique
                });

                // Consultations récentes (exemple : les 5 dernières)
                setConsultations(
                    consultationsData.consultations
                        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 5)
                        .map((c: any) => ({
                            patient: `${c.patientId?.nom || "?"} ${c.patientId?.prenom || ""}`,
                            heure: c.date ? new Date(c.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "",
                            medecin: c.medecin || "",
                            status: c.status || "scheduled",
                        }))
                );
            } catch (err: any) {
                setError("Erreur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    type StatusKey = "completed" | "in-progress" | "scheduled";

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<StatusKey, { label: string; variant: "default" | "secondary" | "outline" }> = {
            completed: { label: "Terminée", variant: "default" },
            "in-progress": { label: "En cours", variant: "secondary" },
            scheduled: { label: "Planifiée", variant: "outline" },
        };

        const config =
            statusConfig[status as StatusKey] ||
            { label: "Inconnu", variant: "outline" as const };

        return (
            <span className={`text-xs px-2 py-1 rounded-full ${status === "completed" ? "bg-green-100 text-green-800" :
                status === "in-progress" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                }`}>
                {config.label}
            </span>
        );
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
            {/* En-tête */}
            {/* <div>
                <h2 className="text-3xl font-bold tracking-tight">Tableau de Bord</h2>
                <p className="text-muted-foreground">
                    Aperçu des activités de la clinique
                </p>
            </div> */}

            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Patients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.patients}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            {stats.evolutionPatients > 0 ? (
                                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            {stats.evolutionPatients}% ce mois-ci
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Consultations</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.consultations}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                            {stats.evolutionConsultations > 0 ? (
                                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                            ) : (
                                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                            )}
                            {Math.abs(stats.evolutionConsultations)}% ce mois-ci
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Examens</CardTitle>
                        <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.examens}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 aujourd'hui
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">RDV Aujourd'hui</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.rdvAujourdhui}</div>
                        <div className="flex items-center">
                            <Progress value={stats.tauxRemplissage} className="h-2 mr-2" />
                            <span className="text-xs text-muted-foreground">{stats.tauxRemplissage}%</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prochaines consultations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Consultations aujourd'hui
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {consultations.map((consultation, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${consultation.status === "completed" ? "bg-green-100" :
                                            consultation.status === "in-progress" ? "bg-blue-100" :
                                                "bg-gray-100"
                                            }`}>
                                            <div className={`h-2 w-2 rounded-full ${consultation.status === "completed" ? "bg-green-500" :
                                                consultation.status === "in-progress" ? "bg-blue-500" :
                                                    "bg-gray-400"
                                                }`} />
                                        </div>
                                        <div>
                                            <div className="font-medium">{consultation.patient}</div>
                                            <div className="text-sm text-muted-foreground">{consultation.medecin}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">{consultation.heure}</div>
                                        {getStatusBadge(consultation.status)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <Button variant="outline" className="w-full mt-4">
                            Voir tout l'agenda
                        </Button> */}
                    </CardContent>
                </Card>

                {/* Actions rapides et alertes */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Actions rapides
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="h-16 flex flex-col gap-1 cursor-pointer"
                                onClick={() => window.location.href = "/dashboard/patients"}
                            >
                                <Users className="h-5 w-5" />
                                <span className="text-xs">Nouveau patient</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-16 flex flex-col gap-1 cursor-pointer"
                                onClick={() => window.location.href = "/dashboard/appointments"}
                            >
                                <Calendar className="h-5 w-5" />
                                <span className="text-xs">Programmer un RDV</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-16 flex flex-col gap-1 cursor-pointer"
                                onClick={() => window.location.href = "/dashboard/consultations"}
                            >
                                <FileText className="h-5 w-5" />
                                <span className="text-xs">Nouvelle consultation</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-16 flex flex-col gap-1 cursor-pointer"
                                onClick={() => window.location.href = "/dashboard/examens"}
                            >
                                <Stethoscope className="h-5 w-5" />
                                <span className="text-xs">Ajouter examen</span>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                                Alertes et rappels
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                                <div>
                                    <div className="font-medium">3 résultats d'analyse en attente</div>
                                    <div className="text-sm text-amber-700">Depuis hier</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                    <div className="font-medium">2 rappels de vaccination</div>
                                    <div className="text-sm text-blue-700">Pour cette semaine</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-green-500 mt-0.5" />
                                <div>
                                    <div className="font-medium">5 consultations de suivi</div>
                                    <div className="text-sm text-green-700">À planifier</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card> */}
                </div>
            </div>

            {/* Statistiques mensuelles */}
            <Card>
                <CardHeader>
                    <CardTitle>Activité du mois</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">42</div>
                            <div className="text-sm text-blue-500">Consultations</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">18</div>
                            <div className="text-sm text-green-500">Nouveaux patients</div>
                        </div>
                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                            <div className="text-2xl font-bold text-amber-600">24</div>
                            <div className="text-sm text-amber-500">Examens réalisés</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">92%</div>
                            <div className="text-sm text-purple-500">Taux de satisfaction</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

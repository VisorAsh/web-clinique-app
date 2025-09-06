// "use client";

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function Dashboard() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState<any>(null);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const storedUser = localStorage.getItem("user");

//         if (!token || !storedUser) {
//             navigate("/auth/login"); // redirection si pas connecté
//             return;
//         }

//         try {
//             setUser(JSON.parse(storedUser));
//         } catch (err) {
//             console.error("Erreur lors du parsing user :", err);
//             navigate("/auth/login");
//         }
//     }, [navigate]);

//     if (!user) {
//         return null; // éviter le flash avant redirection
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-4xl mx-auto space-y-6">
//                 {/* Header */}
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold">Tableau de bord</h1>
//                     <Button
//                         variant="destructive"
//                         onClick={() => {
//                             localStorage.removeItem("token");
//                             localStorage.removeItem("user");
//                             navigate("/auth/login");
//                         }}
//                     >
//                         Déconnexion
//                     </Button>
//                 </div>

//                 {/* Carte d'accueil */}
//                 <Card className="shadow-lg">
//                     <CardHeader>
//                         <CardTitle>Bienvenue 👋</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p className="text-lg">
//                             Bonjour <span className="font-semibold">{user.nom} {user.prenom}</span>
//                         </p>
//                         <p className="text-gray-600">Spécialité : {user.specialite}</p>
//                     </CardContent>
//                 </Card>

//                 {/* Exemple de stats (placeholders) */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <Card className="p-4">
//                         <CardTitle>Patients</CardTitle>
//                         <CardContent>
//                             <p className="text-2xl font-bold">152</p>
//                         </CardContent>
//                     </Card>
//                     <Card className="p-4">
//                         <CardTitle>Rendez-vous</CardTitle>
//                         <CardContent>
//                             <p className="text-2xl font-bold">34</p>
//                         </CardContent>
//                     </Card>
//                     <Card className="p-4">
//                         <CardTitle>Médecins actifs</CardTitle>
//                         <CardContent>
//                             <p className="text-2xl font-bold">12</p>
//                         </CardContent>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Tableau de bord</h1>
                <p className="text-gray-600">Cette fonctionnalité sera bientôt disponible. Restez à l'écoute !</p>
            </div>
        </div>
    );
}
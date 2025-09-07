"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Si l'utilisateur est déjà connecté, il passe sur le dashboard
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
            return null;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // console.log("Données de connexion : ", { email, password });
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Identifiants invalides");
            }

            console.log("Response de l'API : ", res);
            const data = await res.json();

            // console.log("Données reçues : ", data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Rediriger vers la page de tableau de bord
            window.location.href = "/dashboard";
        } catch (err: any) {
            setError(err.message || "Erreur lors de la connexion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f8fa] p-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Connexion</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-8 min-h-screen items-center justify-center bg-[#f7f8fa]">
                <Link href="/" className="text-2xl font-bold text-blue-600 flex-shrink-0">
                    <img
                        src="../imgs/Clinique_-_Logo-removebg-preview.png"
                        alt="Clinique Totsi"
                        className="h-12 sm:h-16 lg:h-20 w-auto"
                    />
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-[#2d3748]">
                        Connexion à votre espace
                    </h2>
                    {error && (
                        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
}

"use client";
import React, { useEffect, useState } from 'react';

interface Patient {
    _id: string;
    noms: string;
    telephone: string;
}

interface AppointmentFormData {
    patientId: string;
    type: string;
    specialite: string;
    dateRdv: string;
    heure: string;
    motif: string;
}

const Appointment: React.FC = () => {
    const [formData, setFormData] = useState<AppointmentFormData>({
        patientId: '',
        type: '',
        specialite: '',
        dateRdv: '',
        heure: '',
        motif: ''
    });
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [patients, setPatients] = useState<Patient[]>([]);

    const fetchPatients = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";
            const response = await fetch(`${apiUrl}/get-all-patient`);

            if (response.ok) {
                const data = await response.json();
                if (data.message === "ok" && data.patient) {
                    setPatients(data.patient);
                }
            } else {
                throw new Error("Erreur lors de la récupération des patients");
            }
        } catch (err) {
            console.error("Erreur lors de la récupération des patients:", err);
            setErrorMessage("Impossible de charger la liste des patients");
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-clinique-app.vercel.app/api";

            // Préparer les données pour l'API
            const rendezVousData = {
                patientId: formData.patientId,
                motif: formData.motif,
                specialite: formData.specialite,
                heure: formData.heure,
                dateRdv: formData.dateRdv,
                type: formData.type
            };

            const response = await fetch(`${apiUrl}/create-rendezvous`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rendezVousData),
            });

            console.log("Response de l'API : ", response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            console.log("Données reçues de l'API:", data);

            if (data.message === "rendez-vous prise en compte !") {
                setSuccessMessage('Votre rendez-vous a été programmé avec succès !');
                setFormData({
                    patientId: '',
                    type: '',
                    specialite: '',
                    dateRdv: '',
                    heure: '',
                    motif: ''
                });

                // Effacer le message de succès après 5 secondes
                setTimeout(() => setSuccessMessage(''), 5000);
            } else {
                throw new Error("Erreur lors de la création du rendez-vous");
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue";
            setErrorMessage(errorMsg);
            console.error("Erreur lors de la création du rendez-vous:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Obtenir la date minimale (aujourd'hui)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Numéro de téléphone d'urgence
    const emergencyPhone = '+228 90 81 07 44';

    return (
        <section id="appointment" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* Image et numéro d'urgence */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative">
                            <img
                                src="../imgs/pexels-ivan-samkov-4989148.jpg"
                                alt="Medical consultation"
                                className="w-full rounded-lg h-[800px] object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg">
                                <h2 className="text-lg font-bold flex items-center">
                                    <i className="icofont-phone-circle text-xl mr-2"></i>
                                    {emergencyPhone}
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire de rendez-vous */}
                    <div className="lg:w-1/2 w-full">
                        <div className="bg-white p-8 rounded-lg">
                            <h2 className="text-4xl font-bold text-blue-600 mb-4" id="Programmer">
                                Programmer un Rendez-vous
                            </h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Cher patient, nous sommes ravis de vous proposer nos services médicaux
                                de qualité à notre clinique. Si vous souhaitez programmer un rendez-vous,
                                nous avons simplifié le processus pour rendre votre expérience aussi
                                pratique et fluide que possible.
                            </p>

                            {/* Messages d'alerte */}
                            {successMessage && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Patient */}
                                    <div>
                                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                                            Patient *
                                        </label>
                                        <select
                                            name="patientId"
                                            value={formData.patientId}
                                            onChange={handleSelectChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Sélectionner un patient</option>
                                            {patients.map(patient => (
                                                <option key={patient._id} value={patient._id}>
                                                    {patient.noms} - {patient.telephone}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Type de rendez-vous */}
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                                            Type de rendez-vous *
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleSelectChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Sélectionner le type</option>
                                            <option value="Présentiel">Présentiel</option>
                                            <option value="Téléconsultation">Téléconsultation</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Spécialité */}
                                    <div>
                                        <label htmlFor="specialite" className="block text-sm font-medium text-gray-700 mb-1">
                                            Spécialité *
                                        </label>
                                        <select
                                            name="specialite"
                                            value={formData.specialite}
                                            onChange={handleSelectChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Sélectionner une spécialité</option>
                                            <option value="Médecine générale">Médecine générale</option>
                                            <option value="Cardiologie">Cardiologie</option>
                                            <option value="Dermatologie">Dermatologie</option>
                                            <option value="Pédiatrie">Pédiatrie</option>
                                            <option value="Gynécologie">Gynécologie</option>
                                            <option value="Ophtalmologie">Ophtalmologie</option>
                                            <option value="ORL">ORL</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>

                                    {/* Date du rendez-vous */}
                                    <div>
                                        <label htmlFor="dateRdv" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date du rendez-vous *
                                        </label>
                                        <input
                                            type="date"
                                            name="dateRdv"
                                            value={formData.dateRdv}
                                            onChange={handleInputChange}
                                            min={getMinDate()}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {/* Heure du rendez-vous */}
                                    <div>
                                        <label htmlFor="heure" className="block text-sm font-medium text-gray-700 mb-1">
                                            Heure *
                                        </label>
                                        <input
                                            type="time"
                                            name="heure"
                                            value={formData.heure}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Motif */}
                                <div>
                                    <label htmlFor="motif" className="block text-sm font-medium text-gray-700 mb-1">
                                        Motif de consultation *
                                    </label>
                                    <textarea
                                        name="motif"
                                        value={formData.motif}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-vertical"
                                        placeholder="Décrivez le motif de votre consultation"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-md transition duration-300 flex items-center cursor-pointer"
                                >
                                    {isSubmitting ? 'Création...' : 'Créer le rendez-vous'}
                                    <i className="icofont-simple-right ml-2"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appointment;

"use client";
import React, { useState } from 'react';

interface AppointmentFormData {
    noms: string;
    telephone: string;
    message: string;
}

const Appointment: React.FC = () => {
    const [formData, setFormData] = useState<AppointmentFormData>({
        noms: '',
        telephone: '',
        message: ''
    });
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulation d'envoi de formulaire
        setTimeout(() => {
            setSuccessMessage('Votre rendez-vous a été programmé avec succès !');
            setFormData({ noms: '', telephone: '', message: '' });
            setIsSubmitting(false);

            // Effacer le message de succès après 5 secondes
            setTimeout(() => setSuccessMessage(''), 5000);
        }, 1000);
    };

    // Numéro de téléphone d'urgence (simulé)
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
                                className="w-full rounded-lg h-[700px] object-cover"
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

                            {/* Message de succès */}
                            {successMessage && (
                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            name="noms"
                                            value={formData.noms}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            placeholder="Nom complet"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="tel"
                                            name="telephone"
                                            value={formData.telephone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            placeholder="Téléphone"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-vertical"
                                        placeholder="Votre message"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-full transition duration-300 flex items-center cursor-pointer"
                                >
                                    {isSubmitting ? 'Envoi...' : 'Soumettre'}
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

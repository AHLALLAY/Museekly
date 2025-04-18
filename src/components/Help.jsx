import { useState } from "react";

export default function Help() {
    const [showRules, setShowRules] = useState(false);

    const toggleRules = (e) => {
        e.preventDefault();
        setShowRules(!showRules);
    }

    const searchRules = [
        "Format génèrale : utilisez le format 'Artiste - Titre' / Exemple : 'Ed Sheeran - Shape of You'",
        "Format inclue '-' : Les tirets (-) sont oubliger pour séparer artiste et titre",
        "Format n'inclue pas '-' : le choix selectionner qui décide si tu as saisi l'artiste ou titre",
        "Chercher les paroles : saisir obligatoirement 'Artiste - Titre'",
        "Chercher l'artiste' : suffit de saisir 'Artiste'",
        "Avertissement : Ne pas inclure de caractères spéciaux inutiles",
    ];

    return (
        <div className="flex justify-end bg-slate-800 p-2 relative">
            {/* Bouton d'aide */}
            <button
                onClick={toggleRules}
                aria-label="Afficher les règles de recherche"
                className="p-1 w-10 h-10 text-xl flex items-center justify-center bg-slate-800 border border-green-400 text-green-400 rounded-full hover:scale-110 transition-all duration-200"
            >
                ?
            </button>

            {/* Modale des règles */}
            {showRules && (
                <div className="absolute top-12 right-0 z-50 bg-slate-800 border-2 border-green-400 rounded-lg shadow-xl p-4 animate-fadeIn whitespace-nowrap">
                    <h3 className="text-green-400 font-bold mb-3 text-lg">Règles de recherche :</h3>
                    <ul className="text-white space-y-2">
                        {searchRules.map((rule, index) => (
                            <li key={index} className="flex">
                                <span className="text-green-400 mr-2">•</span>
                                <span className="text-sm">{rule}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={toggleRules}
                            className="px-3 py-1 bg-green-400/20 text-green-400 rounded hover:bg-green-400/30 transition-colors text-sm"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
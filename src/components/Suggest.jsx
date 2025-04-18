import { useState, useEffect } from "react";

export default function Suggest() {
    const [arti, setArti] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const artistUrl = localStorage.getItem('artiste');
        if (artistUrl) {
            setArti(artistUrl);
            fetchArtistData(artistUrl);
        }
    }, []);

    const fetchArtistData = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const data = await response.json();
            setApiData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-slate-800 text-white">
            <div className="bg-slate-600 rounded-lg p-4 mb-4">
                {arti ? (
                    <div>
                        <h3 className="font-bold mb-2">URL de l'artiste :</h3>
                        <p className="break-all text-sm mb-4">{arti}</p>
                    </div>
                ) : (
                    <p>Aucune donnée d'artiste trouvée</p>
                )}
            </div>

            {loading && <div className="text-center py-4">Chargement en cours...</div>}
            
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                    <p>Erreur : {error}</p>
                </div>
            )}

            {apiData && (
                <div className="bg-slate-400 text-slate-900 rounded-lg shadow p-4">
                    <h3 className="font-bold text-lg mb-4">Résultats de l'API</h3>
                    
                    {/* Affichage pour les suggestions d'artistes */}
                    {apiData.data && (
                        <div>
                            <h4 className="font-semibold mb-2">Suggestions :</h4>
                            <ul className="space-y-3">
                                {apiData.data.slice(0, 5).map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <img 
                                            src={item.artist.picture} 
                                            alt={item.artist.name} 
                                            className="w-12 h-12 rounded-full mr-3 object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <p className="text-sm text-gray-600">{item.artist.name}</p>
                                            <a 
                                                href={item.preview} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-500 text-sm hover:underline"
                                            >
                                                Écouter un extrait
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Affichage pour les paroles */}
                    {apiData.lyrics && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-2">Paroles :</h4>
                            <div className="whitespace-pre-line bg-gray-50 p-3 rounded">
                                {apiData.lyrics}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
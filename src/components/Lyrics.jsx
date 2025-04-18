import { useState, useEffect } from "react";

export default function Lyrics() {
    const [songDetails, setSongDetails] = useState(null);
    const [lyricsData, setLyricsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = localStorage.getItem('lyrics');
        const artistUrl = localStorage.getItem('artiste');

        if (url) {
            fetchLyrics(url);
            
            if (artistUrl) {
                fetchSongDetails(artistUrl);
            }
        }
    }, []);

    const fetchLyrics = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = await response.json();
            setLyricsData(data);
        } catch (err) {
            setError(err.message || "Failed to fetch lyrics");
        } finally {
            setLoading(false);
        }
    };

    const fetchSongDetails = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
            const data = await response.json();

            // Prendre le premier résultat (le plus pertinent)
            if (data.data && data.data.length > 0) {
                const firstResult = data.data[0];
                setSongDetails({
                    title: firstResult.title,
                    artist: firstResult.artist.name,
                    album: firstResult.album?.title || "Unknown album",
                    cover: firstResult.artist.picture_medium,
                    duration: formatDuration(firstResult.duration),
                    preview: firstResult.preview
                });
            }
        } catch (err) {
            console.error("Failed to fetch song details", err);
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="p-4 bg-slate-800 text-white">
            {loading && (
                <div className="text-center py-4">
                    <p>Loading lyrics...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-4 mb-4 rounded">
                    <p>Error: {error}</p>
                </div>
            )}

            {songDetails && (
                <div className="bg-slate-700 rounded-lg shadow-lg mb-6 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-4 flex justify-center">
                            <img
                                src={songDetails.cover}
                                alt={`${songDetails.artist} cover`}
                                className="w-48 h-48 rounded-lg object-cover shadow-md"
                            />
                        </div>
                        <div className="md:w-2/3 p-6">
                            <h2 className="text-2xl font-bold text-green-400 mb-2">{songDetails.title}</h2>
                            <p className="text-lg text-slate-300 mb-4">by {songDetails.artist}</p>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-sm text-slate-400">Album</p>
                                    <p className="font-medium">{songDetails.album}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Duration</p>
                                    <p className="font-medium">{songDetails.duration}</p>
                                </div>
                            </div>
                            <div className="flex-cols items-center gap-4">
                                <span className="text-sm text-slate-400">
                                    Extrait (30s) • Durée totale: {songDetails.duration}
                                </span>
                                <audio controls src={songDetails.preview} className="flex-1" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {lyricsData?.lyrics ? (
                <div className="bg-slate-700 rounded-lg shadow p-6">
                    <h3 className="font-bold text-xl mb-6 text-green-400">Song Lyrics</h3>
                    <div className="whitespace-pre-line bg-slate-800 p-6 rounded-lg text-slate-100 font-mono text-lg leading-relaxed">
                        {lyricsData.lyrics}
                    </div>
                </div>
            ) : (
                <div className="bg-slate-700 rounded-lg shadow p-6 text-center">
                    <p className="text-slate-300">No lyrics found for this song</p>
                </div>
            )}
        </div>
    );
}
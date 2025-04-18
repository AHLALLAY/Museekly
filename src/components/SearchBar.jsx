import { useState } from "react";
import Help from "./Help";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [choice, setChoice] = useState('default');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getApiUrl = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    
        try {
            if (!searchInput.trim()) {
                throw new Error('Search field is empty');
            }
    
            if (choice === "default") {
                throw new Error('Please select a search type');
            }
    
            if (choice === "artiste") {
                if (searchInput.includes('-')) {
                    throw new Error('Don\'t include \'-\' in artist name');
                }
                const artistUrl = `https://api.lyrics.ovh/suggest/${encodeURIComponent(searchInput.trim())}`;
                localStorage.setItem('artiste', artistUrl);
            }
    
            if (choice === "lyrics") {
                if (!searchInput.includes('-')) {
                    throw new Error('For lyrics, use format: Artiste - Song');
                }
                const [artiste, ...songParts] = searchInput.split('-');
                const song = songParts.map(p => p.trim()).join(' ');
                if (!artiste || !song) throw new Error('Invalid format for lyrics');

                const artistUrl = `https://api.lyrics.ovh/suggest/${encodeURIComponent(searchInput.trim())}`;
                localStorage.setItem('artiste', artistUrl);
                const lyricsUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artiste.trim())}/${encodeURIComponent(song.trim())}`;
                localStorage.setItem('lyrics', lyricsUrl);
            }
            window.location.reload();
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-slate-800 flex flex-col items-center pt-4 px-6 pb-4">
            <div className="absolute top-4 right-4">
                <Help />
            </div>
            
            <h1 className="text-green-400 mb-10 font-bold text-5xl tracking-widest">MUSEEKLY</h1>
            
            {error && (
                <div className="text-red-500 mb-4 p-2 bg-red-500/10 rounded-lg max-w-md text-center">
                    {error}
                </div>
            )}

            <div className="w-full max-w-md">
                <form onSubmit={getApiUrl} className="flex">
                    <input
                        className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-slate-900"
                        type="text"
                        placeholder="Artiste - Titre"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        aria-label="Search input"
                    />
                    
                    <select 
                        name="searchBy" 
                        id="searchBy" 
                        className="px-3 focus:outline-none bg-white text-slate-900"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                        aria-label="Search type"
                    >
                        <option value="default">Select...</option>
                        <option value="artiste">Artiste</option>
                        <option value="lyrics">Lyrics</option>
                    </select>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 rounded-r-full font-bold transition-colors ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-green-500 hover:bg-green-600 text-slate-900'
                        }`}
                        aria-label="Search button"
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>
        </div>
    );
}
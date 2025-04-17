import { useState } from "react";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [error, setError] = useState('');

    const fetchdata = async (e) => {
        e.preventDefault();
    
        if (!searchInput.trim()) {
            setError('Search field is empty');
            return;
        }
    
        const [artist, ...songParts] = searchInput.split('-');
        const song = songParts.map(p => p.trim()).join(' ');
        console.log(songParts);

        const lyrics = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist.trim())}/${encodeURIComponent(song.trim())}`;
        console.log(lyrics);
        const artiste = `https://api.lyrics.ovh/suggest/${encodeURIComponent(artist.trim())}`;
        console.log(artiste);
        
    }

    return (
        <div className="bg-slate-800 flex flex-col items-center pt-4 px-6">
            <h1 className="text-green-400 mb-10 font-bold text-5xl tracking-widest">MUSEEKLY</h1>
            {error && <div className="text-red-500 mb-1">{error}</div>}
            <form onSubmit={fetchdata} className="flex justify-center max-w-md w-full mb-4">
                <input 
                type="text" 
                placeholder="Search ..." 
                className="px-4 py-2 rounded-l-full flex-grow focus:ring-2 focus:ring-green-400 focus:outline-none" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} />
                <button type="submit"
                    className="font-bold text-slate-900 bg-green-300 hover:bg-green-600 rounded-r-full px-4 py-2 transition-colors duration-300">Search</button>
            </form>
        </div>
    );
}
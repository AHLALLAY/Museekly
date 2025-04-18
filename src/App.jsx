import { useState, useEffect } from "react";
import Lyrics from "./components/Lyrics";
import SearchBar from "./components/SearchBar";
import Suggest from "./components/Suggest";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <header className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-sm shadow-lg border-b border-slate-700/50">
        <SearchBar />
      </header>

      <main className="flex-grow p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 rounded-xl shadow-xl overflow-hidden border border-slate-700/30 hover:shadow-green-900/20 hover:border-green-700/30 transition-all duration-300">
            <div className="p-4 bg-gradient-to-r from-slate-700 to-slate-700/80 border-b border-slate-600/50">
              <h2 className="text-xl font-bold text-green-400">✦ Suggestions</h2>
            </div>
            <Suggest />
          </div>

          <div className="bg-slate-800/80 rounded-xl shadow-xl overflow-hidden border border-slate-700/30 hover:shadow-green-900/20 hover:border-green-700/30 transition-all duration-300">
            <div className="p-4 bg-gradient-to-r from-slate-700 to-slate-700/80 border-b border-slate-600/50">
              <h2 className="text-xl font-bold text-green-400">♪ Paroles</h2>
            </div>
            <Lyrics />
          </div>
        </div>
      </main>

      <footer className="bg-slate-800/90 border-t border-slate-700/50 py-4 text-center">
        <p className="text-slate-300">
          Museekly &copy; 2025 - Trouvez vos paroles et artistes préférés
        </p>
      </footer>
    </div>
  );
}
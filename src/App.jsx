import SearchBar from "./components/SearchBar";
import Suggest from "./components/Suggest";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex-grow-0">
        <SearchBar />
      </header>
      
      <main className="flex-grow">
        {/* Autres sections iront ici */}
        <Suggest />
      </main>
      
      <footer className="flex justify-center py-4 bg-slate-800 text-white">
        <p>Museekly &copy; 2025</p>
      </footer>
    </div>
  );
}
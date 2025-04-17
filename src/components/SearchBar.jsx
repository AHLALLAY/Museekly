export default function SearchBar() {

    return (
        <div className="bg-slate-800 flex flex-col items-center pt-4 px-6">
            <h1 className="text-green-400 mb-10 font-bold text-5xl tracking-widest">MUSEEKLY</h1>
            <div className="flex justify-center max-w-md w-full">
                <input type="text" placeholder="Search ..." className="px-4 py-2 rounded-l-full flex-grow focus:ring-2 focus:ring-green-400 focus:outline-none"/>
                <button className="font-bold text-slate-900 bg-green-300 hover:bg-green-600 rounded-r-full px-4 py-2 transition-colors duration-300">Search</button>
            </div>
        </div>
    );
}
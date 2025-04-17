export default function SearchBar() {

    return (
        <div className="bg-slate-800 flex flex-grow justify-center">
            <h1 className="text-green-900 font-bold text-5xl">MUSEEKLY</h1>
            <div >
                <input type="text" placeholder="Search ..." />
                <button className="bg-green-200">Search</button>
            </div>
        </div>
    );
}
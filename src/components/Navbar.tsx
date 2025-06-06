"use client"
const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-200 shadow-sm p-2">
        <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
            {/* Konten sisi kiri */}
            <div className="flex space-x-6 text-blue-950">
                Let Us Cook!
            </div>
            
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
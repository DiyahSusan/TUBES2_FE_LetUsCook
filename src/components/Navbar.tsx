"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearch } from '@/components/SearchContext';

const Navbar: React.FC = () => {
    const { mode, setMode } = useSearch();
    
    const handleClick = (buttonType: 'single' | 'multiple') => {
        setMode(buttonType === mode ? null : buttonType);
    }

    const pathname = usePathname();
    
    const navItems = [
        { id: 'home', path: '/', label: 'LetUsCook' },
        { id: 'recipes', path: '/recipes', label: 'Recipes' },
        { id: 'about', path: '/about', label: 'About' },
    ];

    return (
        <nav className="bg-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
            {/* Konten sisi kiri */}
            <div className="flex space-x-6 text-blue-950">
                Let Us Cook!
            </div>
            
            {/* Konten sisi kanan
            <div className='flex gap-4'>
                <button className={`rounded-3xl px-3.5 py-2.5 transition-colors ${
                mode === 'single' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-300 text-blue-900 hover:bg-blue-400'
                }`}
                onClick={() => handleClick('single')}>
                    Single recipe
                </button>

                <button className={`rounded-3xl px-3.5 py-2.5 transition-colors ${
                mode === 'multiple' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-300 text-blue-900 hover:bg-blue-400'
                }`}
                onClick={() => handleClick('multiple')}>
                    Multiple recipe
                </button>
            </div> */}
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
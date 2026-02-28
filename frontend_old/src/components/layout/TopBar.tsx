import { Search, Bell, Menu } from 'lucide-react';

export function TopBar() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 md:left-64 z-20 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <Menu size={24} />
                </button>
                <div className="relative hidden sm:block w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search patients, assessments, or notes..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border-gray-200 border rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-teal rounded-full flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                        DR
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-gray-900 leading-tight">Dr. Richards</p>
                        <p className="text-xs text-gray-500">Dermatologist</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

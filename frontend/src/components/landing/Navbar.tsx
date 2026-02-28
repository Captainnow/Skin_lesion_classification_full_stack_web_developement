import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

export default function Navbar() {
    return (
        <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
                        <Activity size={20} />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">Melascope DX</span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">About Model</a>
                    <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Documentation</a>
                    <Link to="/app/dashboard">
                        <Button variant="primary" size="sm">
                            Access Platform
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

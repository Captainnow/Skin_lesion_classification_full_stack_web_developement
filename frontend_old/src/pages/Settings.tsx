import { Shield, Laptop, Database } from 'lucide-react';

export default function Settings() {
    return (
        <div className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {['General', 'Profile', 'Model Info', 'Data & Privacy', 'Appearance'].map((tab, idx) => (
                        <button
                            key={tab}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${idx === 0 ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6 space-y-8 max-w-3xl">
                {/* Model Info Section */}
                <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Shield size={20} className="text-gray-400" />
                        AI Model Configuration
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Model Architecture</span>
                            <span className="font-mono text-gray-900">ViT-B/16 (Vision Transformer)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Version</span>
                            <span className="font-mono text-gray-900">v2.4.1 (Stable)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Classes Supported</span>
                            <span className="font-mono text-gray-900">31 Diagnostic Classes</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Last Updated</span>
                            <span className="font-mono text-gray-900">2024-05-12</span>
                        </div>
                    </div>
                </section>

                {/* Appearance */}
                <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Laptop size={20} className="text-gray-400" />
                        Appearance
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Dark Mode</div>
                                <div className="text-sm text-gray-500">Switch between light and dark themes.</div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200">
                                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-gray-900">Reduced Motion</div>
                                <div className="text-sm text-gray-500">Minimize animations for accessibility.</div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200">
                                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Data */}
                <section>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <Database size={20} className="text-gray-400" />
                        Data Management
                    </h3>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Export All Data
                        </button>
                        <button className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50">
                            Clear Local History
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

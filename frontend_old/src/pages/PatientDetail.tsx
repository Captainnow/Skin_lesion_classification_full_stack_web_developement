import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PatientDetail() {
    const { id } = useParams();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/app/patients" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sarah Connor</h1>
                    <p className="text-sm text-gray-500">ID: {id} • 34yo Female</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline Sidebar */}
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 h-fit">
                    <h3 className="font-bold text-gray-900 mb-4">Assessment History</h3>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-3.5 before:w-0.5 before:-translate-x-1/2 before:bg-gray-100">
                        {[
                            { date: 'Oct 24, 2023', class: 'Melanoma', conf: '94%', active: true },
                            { date: 'Sep 12, 2023', class: 'Nevus', conf: '88%', active: false },
                            { date: 'Aug 05, 2023', class: 'Nevus', conf: '92%', active: false },
                        ].map((item, idx) => (
                            <div key={idx} className="relative flex items-start gap-4 pl-4 cursor-pointer group">
                                <div className={`absolute left-0 w-3 h-3 rounded-full border-2 border-white ring-2 ${item.active ? 'bg-primary ring-primary/20 scale-125' : 'bg-gray-300 ring-transparent group-hover:bg-primary/50'}`} />
                                <div className={`flex-1 p-3 rounded-lg border transition-all ${item.active ? 'bg-primary-50 border-primary-200' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                                    <div className="text-xs text-gray-500 mb-1">{item.date}</div>
                                    <div className="font-medium text-gray-900">{item.class}</div>
                                    <div className="text-xs text-gray-400">Confidence: {item.conf}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected Assessment Detail */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden"
                    >
                        <div className="h-64 bg-gray-900 relative">
                            {/* Mock Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                [ High-Res Lesion Image ]
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold mb-2">
                                        Melanoma
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Assessment #ASM-2024-001</h2>
                                    <p className="text-sm text-gray-500">Performed on Oct 24, 2023 at 10:42 AM</p>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                                    <Download size={16} />
                                    PDF Report
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <FileText size={16} /> Clinical Notes
                                    </h4>
                                    <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                                        Lesion located on upper back. Patient reports slight itching. Asymmetry and irregular borders observed.
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                        <Calendar size={16} /> Follow-up Plan
                                    </h4>
                                    <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                                        Immediate biopsy recommended. Scheduling excision for Oct 26th.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

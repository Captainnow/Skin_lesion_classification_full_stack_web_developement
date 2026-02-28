import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, User } from 'lucide-react';

const patients = [
    { id: 'PT-1024', name: 'Sarah Connor', age: 34, gender: 'F', assessments: 3, lastDate: '2023-10-24', status: 'Follow-up' },
    { id: 'PT-1025', name: 'John Doe', age: 45, gender: 'M', assessments: 1, lastDate: '2023-10-22', status: 'Normal' },
    { id: 'PT-1026', name: 'Emily Blunt', age: 28, gender: 'F', assessments: 5, lastDate: '2023-10-20', status: 'Action Req' },
    { id: 'PT-1027', name: 'Michael Scott', age: 50, gender: 'M', assessments: 2, lastDate: '2023-10-18', status: 'Normal' },
];

export default function Patients() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-primary focus:border-primary w-full sm:w-64"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 bg-white">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-soft border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Patient Info</th>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Assessments</th>
                            <th className="px-6 py-4">Last Exam</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{patient.name}</div>
                                            <div className="text-xs text-gray-500">{patient.age}yo {patient.gender}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{patient.id}</td>
                                <td className="px-6 py-4">{patient.assessments}</td>
                                <td className="px-6 py-4 text-gray-600">{patient.lastDate}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${patient.status === 'Action Req' ? 'bg-red-100 text-red-700' :
                                            patient.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        to={`/app/patients/${patient.id}`}
                                        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                                    >
                                        <ChevronRight size={18} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

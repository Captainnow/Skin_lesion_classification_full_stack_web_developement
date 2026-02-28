import Navbar from '../components/landing/Navbar';
import Button from '../components/common/Button';
import { ArrowRight, ShieldCheck, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold mb-8 border border-primary-100">
                    <span className="flex h-2 w-2 bg-primary-600 rounded-full mr-3 animate-pulse"></span>
                    Research Prototype v2.1 Available
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-8">
                    AI-Powered <span className="text-primary-600">Dermatoscopy</span> <br />
                    for Modern Research
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Melascope DX leverages advanced Vision Transformers to categorize skin lesions with breakdown analysis across 31 distinct diagnostic classes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link to="/app/dashboard">
                        <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary-500/20">
                            Launch Platform <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        View Documentation
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "Instant Analysis",
                                desc: "Get probabilistic classifications in milliseconds using our optimized inference engine."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Clinical Context",
                                desc: "Designed with safety guardrails and advisory systems to support researcher decision-making."
                            },
                            {
                                icon: BarChart3,
                                title: "Detailed Reporting",
                                desc: "Comprehensive breakdown of confidence scores across all tracked lesion classes."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="bg-white py-12 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Melascope Research Lab. All rights reserved. <br />
                        <span className="text-slate-400 mt-2 block">Prototype for research use only. Not for clinical diagnosis.</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}

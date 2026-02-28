import { Github, Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Melascope DX</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              AI-powered skin lesion assessment for educational and screening purposes.
              Final year engineering project.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.skincancer.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-primary-600 flex items-center gap-1"
                >
                  Skin Cancer Foundation <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.aad.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-primary-600 flex items-center gap-1"
                >
                  American Academy of Dermatology <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.who.int/cancer/skin-cancer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-primary-600 flex items-center gap-1"
                >
                  WHO Skin Cancer Info <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Project</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-primary-600 flex items-center gap-1"
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:project@example.com"
                  className="text-sm text-slate-600 hover:text-primary-600 flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" /> Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Melascope DX. Final Year Engineering Project.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Not for commercial use. For academic purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}

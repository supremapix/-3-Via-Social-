import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onTransparencyClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTransparencyClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-end gap-1.5 h-10 pb-1">
            <div className="w-2.5 h-6 bg-[#1B3B66] rounded-t-sm group-hover:h-7 transition-all duration-300"></div>
            <div className="w-2.5 h-10 bg-[#2ECC71] rounded-t-sm group-hover:h-11 transition-all duration-300"></div>
            <div className="w-2.5 h-8 bg-[#F1C40F] rounded-t-sm group-hover:h-9 transition-all duration-300"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold text-[#1B3B66] leading-none tracking-tight">3ª VIA SOCIAL</h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Gestão e Liderança</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link 
            to="/metodologia" 
            className={`transition-colors ${isActive('/metodologia') ? 'text-[#1B3B66] font-bold border-b-2 border-[#1B3B66]' : 'hover:text-[#2ECC71]'}`}
          >
            Metodologia
          </Link>
          <Link 
            to="/#cursos" 
            className="hover:text-[#2ECC71] transition-colors"
          >
            Cursos
          </Link>
          <Link 
            to="/painel-gestao" 
            className={`transition-colors ${isActive('/painel-gestao') ? 'text-[#1B3B66] font-bold border-b-2 border-[#1B3B66]' : 'hover:text-[#2ECC71]'}`}
          >
            Painel de Gestão Técnica
          </Link>
          {onTransparencyClick && (
            <button 
              onClick={onTransparencyClick}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors text-xs uppercase tracking-wide"
            >
              <ShieldCheck size={16} className="text-[#2ECC71]" />
              Transparência
            </button>
          )}
          <Link 
            to="/#contato" 
            className="px-5 py-2.5 bg-[#031226] text-white rounded-lg hover:bg-[#1B3B66] transition-all shadow-md"
          >
            Matricule-se
          </Link>
        </nav>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
          <Link 
            to="/metodologia" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-left py-2 border-b border-slate-100 text-[#1B3B66] font-bold"
          >
            Metodologia
          </Link>
          <Link 
            to="/#cursos" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-left py-2 border-b border-slate-100"
          >
            Cursos
          </Link>
          <Link 
            to="/painel-gestao" 
            onClick={() => setIsMenuOpen(false)} 
            className="text-left py-2 border-b border-slate-100 text-[#1B3B66] font-bold"
          >
            Painel de Gestão Técnica
          </Link>
          {onTransparencyClick && (
            <button 
              onClick={() => { setIsMenuOpen(false); onTransparencyClick(); }} 
              className="text-left py-2 text-[#2ECC71] font-semibold"
            >
              Portal Transparência
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, ChevronRight, Heart } from 'lucide-react';

interface FooterProps {
  onTransparencyClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onTransparencyClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-end gap-1 h-6">
                <div className="w-1.5 h-4 bg-[#1B3B66] rounded-t-[1px]"></div>
                <div className="w-1.5 h-6 bg-[#2ECC71] rounded-t-[1px]"></div>
                <div className="w-1.5 h-5 bg-[#F1C40F] rounded-t-[1px]"></div>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">3ª VIA SOCIAL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Consultoria e educação política focada em resultados técnicos e fortalecimento democrático.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/joaorumpelgestor" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#2ECC71] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18}/>
              </a>
              <a 
                href="https://www.instagram.com/movimento3via/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#2ECC71] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18}/>
              </a>
              <a 
                href="https://wa.me/5551995347903?text=Ol%C3%A1%20achei%20seu%20*site%20no%20Google!*" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#2ECC71] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={18}/>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Institucional</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#2ECC71] transition-colors">Sobre Nós</Link></li>
              <li><Link to="/metodologia" className="hover:text-[#2ECC71] transition-colors">Metodologia</Link></li>
              <li><Link to="/painel-gestao" className="hover:text-[#2ECC71] transition-colors">Painel de Gestão</Link></li>
              {onTransparencyClick && (
                <li><button onClick={onTransparencyClick} className="hover:text-[#2ECC71] transition-colors text-left">Transparência</button></li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>Brasília - DF</li>
              <li>contato@3viasocial.com.br</li>
              <li>(51) 99534-7903</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Diário Oficial da Gestão</h4>
            <p className="text-sm mb-4">Receba análises semanais no seu e-mail.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="E-mail" className="bg-slate-800 border-none rounded px-3 py-2 text-sm w-full focus:ring-1 focus:ring-[#2ECC71] outline-none text-white" />
              <button className="bg-[#2ECC71] text-white rounded px-3 hover:bg-[#27ae60]"><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2024 3ª Via Social. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <span>Desenvolvido</span>
            <Heart size={14} className="text-red-500 animate-pulse fill-current" /> 
            <span>por</span>
            <a 
              href="https://supremasite.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-[#2ECC71] hover:text-white transition-colors underline decoration-[#2ECC71]/30 underline-offset-2"
            >
              Suprema Sites Express
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

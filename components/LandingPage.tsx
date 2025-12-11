import React, { useState } from 'react';
import { 
  Menu, X, CheckCircle, BookOpen, Landmark, BarChart3, 
  Users, ShieldCheck, FileText, ChevronDown, ChevronRight, 
  Award, MousePointer2, Heart, GraduationCap, Building2, Phone,
  Facebook, Instagram, ArrowRight, Printer, Shield
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'student' | 'gov'>('student'); // 'student' or 'gov'
  
  // Estado para o Quiz Interativo
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // --- Lógica de Envio para WhatsApp ---
  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    let message = `*Novo Contato via Site - 3ª Via Social*\n\n`;
    message += `*Perfil:* ${activeTab === 'student' ? 'Aluno/Líder' : 'Gestor Público'}\n`;
    message += `*Nome:* ${data.name || 'Não informado'}\n`;
    message += `*Email:* ${data.email || 'Não informado'}\n`;
    message += `*WhatsApp:* ${data.phone || 'Não informado'}\n`;
    
    if (activeTab === 'gov') {
      message += `*Cargo:* ${data.role || 'Não informado'}\n`;
      message += `*Órgão:* ${data.org || 'Não informado'}\n`;
    }

    // Telefone configurado para envio do formulário
    const phoneNumber = "5551995347903"; 
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HEADER (Sticky) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Oficial 3ª Via Social */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            {/* Ícone de Barras */}
            <div className="flex items-end gap-1.5 h-10 pb-1">
              <div className="w-2.5 h-6 bg-[#1B3B66] rounded-t-sm group-hover:h-7 transition-all duration-300"></div>
              <div className="w-2.5 h-10 bg-[#2ECC71] rounded-t-sm group-hover:h-11 transition-all duration-300"></div>
              <div className="w-2.5 h-8 bg-[#F1C40F] rounded-t-sm group-hover:h-9 transition-all duration-300"></div>
            </div>
            {/* Texto do Logo */}
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-[#1B3B66] leading-none tracking-tight">3ª VIA SOCIAL</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">Gestão e Liderança</p>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#metodologia" className="hover:text-[#2ECC71] transition-colors">Metodologia</a>
            <a href="#cursos" className="hover:text-[#2ECC71] transition-colors">Cursos</a>
            <a href="#consultoria" className="hover:text-[#2ECC71] transition-colors">Para Prefeituras</a>
            <button 
              onClick={toggleModal}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors text-xs uppercase tracking-wide"
            >
              <ShieldCheck size={16} className="text-[#2ECC71]" />
              Transparência
            </button>
            <a 
              href="#contato" 
              className="px-5 py-2.5 bg-[#031226] text-white rounded-lg hover:bg-[#1B3B66] transition-all shadow-md"
            >
              Matricule-se
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 flex flex-col gap-4 shadow-xl">
            <a href="#metodologia" className="py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Metodologia</a>
            <a href="#cursos" className="py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Cursos</a>
            <a href="#consultoria" className="py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Para Prefeituras</a>
            <button onClick={toggleModal} className="text-left py-2 text-[#2ECC71] font-semibold">Portal Transparência</button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION REFORMULADA */}
      <section className="relative bg-[#031226] text-white pt-24 pb-32 overflow-hidden">
        {/* Fundo Gradiente e Textura */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#031226] via-[#051A30] to-[#0A3835] opacity-80 z-0"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0 mix-blend-overlay"></div>
        
        {/* Elementos de Luz de Fundo */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1B3B66] rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#2ECC71] rounded-full blur-[150px] opacity-20"></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Lado Esquerdo: Conteúdo */}
          <div className="space-y-8">
            {/* Badge Pílula */}
            <div className="inline-flex items-center gap-2 bg-[#1B3B66] text-white px-4 py-1.5 rounded-full border border-[#1B3B66]/50 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
              <div className="bg-white rounded-full p-0.5">
                <CheckCircle size={12} className="text-[#1B3B66] fill-current" />
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase">Conforme Lei de Responsabilidade Fiscal</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-sm">
              Gestão Pública com <br/>
              <span className="text-[#2ECC71]">Dados e Técnica</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl font-light border-l-4 border-[#2ECC71] pl-6">
              Formação de Lideranças baseada em Engenharia Territorial. Transforme sua cidade com planejamento estratégico e segurança jurídica.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contato" className="px-8 py-4 bg-[#2ECC71] hover:bg-[#27ae60] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-[#2ECC71]/30 flex items-center justify-center gap-3 group">
                Começar Formação
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contato" onClick={() => setActiveTab('gov')} className="px-8 py-4 bg-transparent border-2 border-[#1B3B66] hover:bg-[#1B3B66] text-white font-bold rounded-lg transition-all flex items-center justify-center gap-3">
                <div className="bg-[#1B3B66] p-1 rounded">
                   <Building2 size={16} />
                </div>
                Portal B2G (Governo)
              </a>
            </div>
          </div>

          {/* Lado Direito: Visual Cards (Módulos) */}
          <div className="relative perspective-1000 hidden lg:block">
            <div className="relative w-full max-w-[600px] h-[500px] transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-0">
              
              {/* Grid de Cards */}
              <div className="grid grid-cols-2 gap-4 h-full">
                
                {/* Módulo 01 - Verde Petróleo */}
                <div className="bg-[#0A3835] rounded-xl p-6 shadow-2xl border-l-4 border-[#F1C40F] flex flex-col justify-between transform translate-y-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-[#F1C40F] text-xs font-bold uppercase tracking-widest mb-2">Módulo 01</div>
                  <h3 className="text-white text-xl font-bold leading-tight">Identidade e Ética Pública</h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 mt-4"></div>
                </div>

                {/* Módulo 06 - Azul Médio */}
                <div className="bg-[#1E4F8A] rounded-xl p-6 shadow-2xl flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-[#2ECC71] text-xs font-bold uppercase tracking-widest mb-2">Módulo 06</div>
                  <h3 className="text-white text-xl font-bold leading-tight">Gestão Orçamentária</h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 mt-4"></div>
                </div>

                {/* Módulo 11 - Azul Escuro/Preto */}
                <div className="bg-[#0C1527] rounded-xl p-6 shadow-2xl border border-slate-700 flex flex-col justify-between transform translate-y-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-[#F1C40F] text-xs font-bold uppercase tracking-widest mb-2">Módulo 11</div>
                  <h3 className="text-white text-xl font-bold leading-tight">Gestão Territorial</h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 mt-4"></div>
                </div>

                {/* Módulo 12 - Laranja Queimado (Estadista) */}
                <div className="bg-[#D98521] rounded-xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full"></div>
                  <div className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">Módulo 12</div>
                  <h3 className="text-white text-xl font-bold leading-tight">O Caminho do Estadista</h3>
                  <div className="w-8 h-8 rounded-full bg-white/20 mt-4"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FERRAMENTA INTERATIVA (Diagnóstico) */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Termômetro da Gestão 🌡️</h2>
              <p className="text-slate-500">Descubra o nível de maturidade técnica do seu gabinete.</p>
            </div>

            {!quizFinished ? (
              <div className="space-y-6">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{width: `${((quizStep + 1) / 3) * 100}%`}} 
                  />
                </div>
                
                {quizStep === 0 && (
                  <div className="animate-in fade-in slide-in-from-right duration-300">
                    <h3 className="text-lg font-semibold mb-4">Como seu gabinete organiza as demandas da população?</h3>
                    <div className="grid gap-3">
                      <button onClick={() => setQuizStep(1)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">A. Anotamos em caderno/planilha solta.</button>
                      <button onClick={() => setQuizStep(1)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">B. Usamos WhatsApp pessoal.</button>
                      <button onClick={() => setQuizStep(1)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">C. Temos um sistema de CRM/Protocolo.</button>
                    </div>
                  </div>
                )}
                 {quizStep === 1 && (
                  <div className="animate-in fade-in slide-in-from-right duration-300">
                    <h3 className="text-lg font-semibold mb-4">Qual seu nível de conhecimento sobre a Nova Lei de Licitações (14.133)?</h3>
                    <div className="grid gap-3">
                      <button onClick={() => setQuizStep(2)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">A. Básico/Nenhum.</button>
                      <button onClick={() => setQuizStep(2)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">B. Já fiz alguns cursos livres.</button>
                      <button onClick={() => setQuizStep(2)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">C. Tenho equipe jurídica especializada.</button>
                    </div>
                  </div>
                )}
                 {quizStep === 2 && (
                  <div className="animate-in fade-in slide-in-from-right duration-300">
                    <h3 className="text-lg font-semibold mb-4">Você sabe fiscalizar o PPA, LDO e LOA?</h3>
                    <div className="grid gap-3">
                      <button onClick={() => setQuizFinished(true)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">A. Não sei o que significam as siglas.</button>
                      <button onClick={() => setQuizFinished(true)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">B. Entendo, mas não sei analisar os números.</button>
                      <button onClick={() => setQuizFinished(true)} className="p-4 border rounded-lg hover:bg-emerald-50 hover:border-emerald-300 text-left transition-all">C. Apresento emendas regularmente.</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Diagnóstico Preliminar Concluído!</h3>
                <p className="text-slate-600 mb-6">Identificamos oportunidades críticas de melhoria na sua gestão técnica. Receba o relatório completo e um plano de ação.</p>
                <div className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="Seu melhor e-mail" className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Receber</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. GRADE CURRICULAR (Grid) */}
      <section id="cursos" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Formação Técnica Continuada</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Nossa metodologia aborda os 12 pilares essenciais para uma gestão pública moderna e eficiente.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen />, title: "Lei Orgânica & Regimento", color: "border-blue-500" },
              { icon: <Landmark />, title: "Gestão Orçamentária", color: "border-green-500" },
              { icon: <ShieldCheck />, title: "Compliance Público", color: "border-indigo-500" },
              { icon: <Users />, title: "Liderança Política", color: "border-yellow-500" },
              { icon: <Building2 />, title: "Cidades Inteligentes", color: "border-cyan-500" },
              { icon: <FileText />, title: "Redação Oficial", color: "border-slate-500" },
              { icon: <BarChart3 />, title: "Ciência de Dados", color: "border-purple-500" },
              { icon: <MousePointer2 />, title: "Marketing Político", color: "border-pink-500" },
              { icon: <Award />, title: "Captação de Recursos", color: "border-orange-500" },
              { icon: <CheckCircle />, title: "Fiscalização Eficiente", color: "border-red-500" },
              { icon: <Users />, title: "Gestão de Pessoas", color: "border-teal-500" },
              { icon: <Landmark />, title: "Direito Eleitoral", color: "border-blue-800" },
            ].map((module, idx) => (
              <div key={idx} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${module.color} hover:shadow-md transition-shadow group`}>
                <div className="text-slate-400 group-hover:text-slate-800 transition-colors mb-3">
                  {module.icon}
                </div>
                <h3 className="font-bold text-slate-800">{module.title}</h3>
                <p className="text-sm text-slate-500 mt-2">Módulo intensivo com material prático.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO CERTIFICAÇÃO (Prova Social + Mockup CSS) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Certificação com Validade Nacional</h2>
            <p className="text-slate-600 mb-6 text-lg">
              A 3ª Via Social opera sob CNAE de Ensino, garantindo que nossos certificados sejam aceitos para progressão de carreira e comprovação de títulos.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={20} />
                <span className="text-slate-700">QR Code de validação digital anti-fraude.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={20} />
                <span className="text-slate-700">Carga horária detalhada no verso.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-emerald-500" size={20} />
                <span className="text-slate-700">Assinatura de especialistas mestres e doutores.</span>
              </li>
            </ul>
          </div>
          
          {/* Mockup de Certificado CSS */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-md bg-slate-50 border-8 border-double border-yellow-600 p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-full border border-slate-300 m-2 pointer-events-none" />
              <div className="text-center border-b-2 border-slate-200 pb-4 mb-4">
                <div className="text-3xl font-serif text-slate-800 font-bold uppercase tracking-widest">Certificado</div>
                <div className="text-xs text-slate-500 uppercase mt-1">De Conclusão de Curso</div>
              </div>
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-600">Certificamos que</p>
                <p className="text-2xl font-script text-emerald-800 font-bold italic">Excelentíssimo Gestor</p>
                <p className="text-sm text-slate-600">concluiu com êxito a formação em</p>
                <p className="font-bold text-slate-900 uppercase">Alta Gestão Pública</p>
              </div>
              <div className="flex justify-between items-end mt-12 pt-4 border-t border-slate-200">
                <div className="text-center">
                   <div className="w-24 h-px bg-slate-800 mb-2"></div>
                   <p className="text-[10px] uppercase text-slate-500">Diretor Acadêmico</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-600 text-yellow-700">
                  <Award size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SEÇÃO ESTADISTA 2028 */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4 block">Mentoria High-Level</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Projeto Estadista 2028</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
            Não estamos falando apenas da próxima eleição, mas do seu legado. Uma consultoria de longo prazo para construir carreiras sólidas rumo ao executivo estadual e federal.
          </p>
          <button onClick={() => { setActiveTab('gov'); document.getElementById('contato')?.scrollIntoView(); }} className="px-10 py-4 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-yellow-600/20">
            Aplicar para Mentoria
          </button>
        </div>
      </section>

      {/* 7. FAQ B2G (Governo) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Dúvidas sobre Contratação Pública</h2>
          <div className="space-y-4">
            {[
              { q: "A contratação pode ser feita sem licitação?", a: "Sim. Segundo a Lei 14.133/21, serviços de treinamento e aperfeiçoamento de pessoal podem ser contratados por inexigibilidade ou dispensa, dependendo do valor e da especificidade." },
              { q: "A empresa possui regularidade fiscal?", a: "Absolutamente. Mantemos CNDs federais, estaduais e municipais sempre atualizadas, além de regularidade com o FGTS e Justiça do Trabalho, disponíveis no nosso Portal da Transparência." },
              { q: "Vocês atendem Câmaras Municipais?", a: "Sim. Temos programas específicos para vereadores e servidores legislativos, focados em Regimento Interno e fiscalização do executivo." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg shadow-sm border border-slate-200 p-4 cursor-pointer">
                <summary className="flex justify-between items-center font-semibold text-slate-800 list-none">
                  {faq.q}
                  <ChevronDown className="group-open:rotate-180 transition-transform text-emerald-600" />
                </summary>
                <p className="text-slate-600 mt-4 leading-relaxed pl-2 border-l-2 border-emerald-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FORMULÁRIO DE CONTATO (WhatsApp Integration) */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl p-2 shadow-inner">
            {/* Tabs */}
            <div className="flex rounded-xl bg-white p-1 shadow-sm mb-8">
              <button 
                onClick={() => setActiveTab('student')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'student' ? 'bg-[#2ECC71] text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                SOU ALUNO / LÍDER
              </button>
              <button 
                onClick={() => setActiveTab('gov')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'gov' ? 'bg-[#031226] text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                SOU GESTOR PÚBLICO
              </button>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="p-4 md:p-8 space-y-5">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {activeTab === 'student' ? 'Comece sua Jornada' : 'Solicite uma Proposta Oficial'}
              </h3>
              <p className="text-slate-500 text-sm mb-6">Preencha os dados abaixo para iniciar o atendimento via WhatsApp.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">Nome Completo</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">WhatsApp</label>
                  <input required name="phone" type="tel" placeholder="(00) 00000-0000" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">E-mail Corporativo/Pessoal</label>
                <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition-all" />
              </div>

              {activeTab === 'gov' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Órgão Público</label>
                    <input name="org" type="text" placeholder="Ex: Prefeitura de..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Cargo</label>
                    <input name="role" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition-all" />
                  </div>
                </div>
              )}

              <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 ${activeTab === 'student' ? 'bg-[#2ECC71] hover:bg-[#27ae60]' : 'bg-[#031226] hover:bg-[#1B3B66]'}`}>
                <Phone size={20} />
                Enviar para WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 {/* Logo Footer Simples */}
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
                <li><a href="#" className="hover:text-[#2ECC71] transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-[#2ECC71] transition-colors">Corpo Docente</a></li>
                <li><a href="#" className="hover:text-[#2ECC71] transition-colors">Política de Privacidade</a></li>
                <li><button onClick={toggleModal} className="hover:text-[#2ECC71] transition-colors text-left">Transparência</button></li>
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
          
          {/* Rodapé Customizado - Suprema Sites Express */}
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

      {/* 10. MODAL DE TRANSPARÊNCIA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#031226]/80 backdrop-blur-sm transition-opacity" onClick={toggleModal}></div>
          
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 relative animate-in zoom-in-95 duration-200 overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                 <Shield className="text-[#1B3B66]" size={24} strokeWidth={2} />
                 <h3 className="text-xl font-bold text-[#1B3B66]">Dados Legais e Fiscais</h3>
              </div>
              <button onClick={toggleModal} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 md:p-8 space-y-5 bg-white">
              
              {/* Card 1 - CFER */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-[#1B3B66] font-bold text-lg mb-4 uppercase tracking-tight">CFER-BRASIL LTDA</h4>
                <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
                   <div>
                      <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">CNPJ</p>
                      <p className="text-slate-800 font-semibold text-base">62.162.691/0001-87</p>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider mb-1">OBJETO SOCIAL</p>
                      <p className="text-slate-900 font-bold text-base">Consultoria em Gestão (70.20-4-00)</p>
                   </div>
                </div>
              </div>

              {/* Card 2 - Terra e Fé */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-6 shadow-sm">
                <h4 className="text-[#065F46] font-bold text-lg mb-4 uppercase tracking-tight">TERRA E FÉ SUSTENTÁVEL LTDA</h4>
                <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
                   <div>
                      <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-wider mb-1">CNPJ</p>
                      <p className="text-[#064E3B] font-semibold text-base">61.229.136/0001-62</p>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-wider mb-1">OBJETO SOCIAL</p>
                      <p className="text-[#065F46] font-bold text-base">Atividades de Ensino (85.99-6-99)</p>
                   </div>
                </div>
              </div>

            </div>

            {/* Footer Modal */}
            <div className="bg-white px-6 pb-8 pt-2 text-center">
               <p className="text-xs text-slate-400 font-medium">
                 Endereço Fiscal (Sede): Rua da Bahia 1148, Sala 1208, Centro, Belo Horizonte MG, 30160-906.
               </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
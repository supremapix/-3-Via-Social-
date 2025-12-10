import React, { useState } from 'react';
import { 
  Menu, X, CheckCircle, BookOpen, Landmark, BarChart3, 
  Users, ShieldCheck, FileText, ChevronDown, ChevronRight, 
  Award, MousePointer2, Heart, GraduationCap, Building2, Phone 
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

    const phoneNumber = "5551995347903"; // Seu número
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HEADER (Sticky) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo Conceitual */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-bold text-xl">3ª</span>
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">VIA SOCIAL</h1>
              <p className="text-xs text-slate-500 font-medium tracking-widest">EDUCAÇÃO & GOVERNO</p>
            </div>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#metodologia" className="hover:text-emerald-600 transition-colors">Metodologia</a>
            <a href="#cursos" className="hover:text-emerald-600 transition-colors">Cursos</a>
            <a href="#consultoria" className="hover:text-emerald-600 transition-colors">Para Prefeituras</a>
            <button 
              onClick={toggleModal}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors text-xs uppercase tracking-wide"
            >
              <ShieldCheck size={16} className="text-emerald-600" />
              Transparência
            </button>
            <a 
              href="#contato" 
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-emerald-600 transition-all shadow-md"
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
            <button onClick={toggleModal} className="text-left py-2 text-emerald-600 font-semibold">Portal Transparência</button>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
        {/* Decorativo Geométrico */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-emerald-900/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 text-emerald-400 text-xs font-bold mb-6">
              <CheckCircle size={14} />
              EM CONFORMIDADE COM A LRF E LEI 14.133
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Gestão Pública com <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-yellow-400">Dados e Técnica</span>.
            </h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-lg">
              Capacitação de elite para vereadores, secretários e prefeitos. Transforme seu mandato com inteligência política e segurança jurídica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contato" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                <GraduationCap size={20} />
                Quero ser Aluno
              </a>
              <a href="#contato" onClick={() => setActiveTab('gov')} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                <Building2 size={20} />
                Consultoria para Governo
              </a>
            </div>
          </div>

          {/* Visual Decorativo / Abstrato */}
          <div className="relative hidden md:flex justify-center">
            <div className="relative w-80 h-96 border-2 border-slate-700 rounded-2xl p-6 bg-slate-800/50 backdrop-blur-sm transform rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl">
               <div className="w-full h-full border border-dashed border-slate-600 rounded-lg flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center">
                    <div className="w-12 h-12 bg-slate-700 rounded-full" />
                    <div className="w-20 h-4 bg-slate-700 rounded" />
                  </div>
                  <div className="space-y-3">
                    <div className="w-full h-2 bg-slate-700 rounded" />
                    <div className="w-full h-2 bg-slate-700 rounded" />
                    <div className="w-2/3 h-2 bg-emerald-500 rounded animate-pulse" />
                  </div>
                  <div className="mt-4 p-3 bg-emerald-900/30 rounded border border-emerald-500/30">
                    <p className="text-emerald-400 text-xs font-mono">Status: APROVADO</p>
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
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'student' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
              >
                SOU ALUNO / LÍDER
              </button>
              <button 
                onClick={() => setActiveTab('gov')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeTab === 'gov' ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-800'}`}
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
                  <input required name="name" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase">WhatsApp</label>
                  <input required name="phone" type="tel" placeholder="(00) 00000-0000" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase">E-mail Corporativo/Pessoal</label>
                <input required name="email" type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
              </div>

              {activeTab === 'gov' && (
                <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Órgão Público</label>
                    <input name="org" type="text" placeholder="Ex: Prefeitura de..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Cargo</label>
                    <input name="role" type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
                  </div>
                </div>
              )}

              <button type="submit" className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 ${activeTab === 'student' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-slate-900 hover:bg-slate-800'}`}>
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
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold">3ª</div>
                <span className="text-white font-bold text-lg">VIA SOCIAL</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Consultoria e educação política focada em resultados técnicos e fortalecimento democrático.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"><Users size={18}/></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"><Award size={18}/></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Institucional</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Corpo Docente</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Política de Privacidade</a></li>
                <li><button onClick={toggleModal} className="hover:text-emerald-400 transition-colors text-left">Transparência</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li>Brasília - DF</li>
                <li>contato@3viasocial.com.br</li>
                <li>+55 (61) 9999-9999</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Diário Oficial da Gestão</h4>
              <p className="text-sm mb-4">Receba análises semanais no seu e-mail.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="E-mail" className="bg-slate-800 border-none rounded px-3 py-2 text-sm w-full focus:ring-1 focus:ring-emerald-500 outline-none text-white" />
                <button className="bg-emerald-600 text-white rounded px-3 hover:bg-emerald-500"><ChevronRight size={16}/></button>
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
                className="font-bold text-emerald-400 hover:text-white transition-colors underline decoration-emerald-400/30 underline-offset-2"
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
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={toggleModal}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 p-8 relative animate-in zoom-in-95 duration-200">
            <button onClick={toggleModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
              <X />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Transparência Fiscal</h3>
              <p className="text-sm text-slate-500">Dados das entidades mantenedoras.</p>
            </div>

            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Building2 size={16} className="text-slate-400"/> CFER-Brasil
                </h4>
                <p className="text-xs text-slate-500 mt-1 font-mono">CNPJ: 00.000.000/0001-00</p>
                <p className="text-xs text-slate-600 mt-2">Consultoria, Formação e Educação Regional.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <Building2 size={16} className="text-slate-400"/> Terra e Fé
                </h4>
                <p className="text-xs text-slate-500 mt-1 font-mono">CNPJ: 11.111.111/0001-11</p>
                <p className="text-xs text-slate-600 mt-2">Associação Educacional e Social.</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Documentação completa (CNDs, Balanços) disponível mediante solicitação oficial via ofício.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';

declare global {
  interface Window {
    Chart: any;
    Plotly: any;
  }
}

const MethodologyPage: React.FC = () => {
  const riskChartRef = useRef<HTMLCanvasElement>(null);
  const resourceChartRef = useRef<HTMLCanvasElement>(null);
  const limpeChartRef = useRef<HTMLCanvasElement>(null);
  const radarChartRef = useRef<HTMLCanvasElement>(null);
  const pyramidDivRef = useRef<HTMLDivElement>(null);
  const scatterDivRef = useRef<HTMLDivElement>(null);
  const chartsInitialized = useRef(false);

  const [riskQuery, setRiskQuery] = useState('');
  const [riskResult, setRiskResult] = useState('');
  const [riskLoading, setRiskLoading] = useState(false);

  const [planQuery, setPlanQuery] = useState('');
  const [planResult, setPlanResult] = useState('');
  const [planLoading, setPlanLoading] = useState(false);

  const [cityAudit, setCityAudit] = useState('');
  const [stateAudit, setStateAudit] = useState('');
  const [auditResult, setAuditResult] = useState('');
  const [auditLoading, setAuditLoading] = useState(false);

  const [challengeQuery, setChallengeQuery] = useState('');
  const [odsSelect, setOdsSelect] = useState('ODS 6: Água Limpa e Saneamento');
  const [ideaResult, setIdeaResult] = useState('');
  const [ideaLoading, setIdeaLoading] = useState(false);

  const [cityLeadership, setCityLeadership] = useState('');
  const [stateLeadership, setStateLeadership] = useState('');
  const [leadershipResult, setLeadershipResult] = useState('');
  const [leadershipLoading, setLeadershipLoading] = useState(false);

  const [lawSubject, setLawSubject] = useState('');
  const [lawEffect, setLawEffect] = useState('');
  const [lawResult, setLawResult] = useState('');
  const [lawLoading, setLawLoading] = useState(false);

  const [budgetGoalQuery, setBudgetGoalQuery] = useState('');
  const [budgetResult, setBudgetResult] = useState('');
  const [budgetLoading, setBudgetLoading] = useState(false);

  const [crisisScenarioQuery, setCrisisScenarioQuery] = useState('');
  const [crisisResult, setCrisisResult] = useState('');
  const [crisisLoading, setCrisisLoading] = useState(false);

  const [complianceQuery, setComplianceQuery] = useState('');
  const [complianceResult, setComplianceResult] = useState('');
  const [complianceLoading, setComplianceLoading] = useState(false);

  const apiKey = process.env.GEMINI_API_KEY || '';

  useEffect(() => {
    const loadScripts = async () => {
      if (chartsInitialized.current) return;
      
      if (!document.querySelector('script[src*="chart.js"]')) {
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        document.head.appendChild(chartScript);
        await new Promise(resolve => chartScript.onload = resolve);
      }

      if (!document.querySelector('script[src*="plotly"]')) {
        const plotlyScript = document.createElement('script');
        plotlyScript.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
        document.head.appendChild(plotlyScript);
        await new Promise(resolve => plotlyScript.onload = resolve);
      }

      setTimeout(initCharts, 500);
    };

    loadScripts();
  }, []);

  const initCharts = () => {
    if (chartsInitialized.current) return;
    chartsInitialized.current = true;

    const Chart = window.Chart;
    const Plotly = window.Plotly;

    if (Chart && riskChartRef.current) {
      new Chart(riskChartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Rejeição Parcial', 'Rejeição Total', 'Multas a Gestores'],
          datasets: [
            { label: 'Gestão Improvisada', data: [45, 28, 65], backgroundColor: '#ef4444' },
            { label: 'Gestão Técnica', data: [8, 3, 10], backgroundColor: '#059669' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: '% de Municípios' } } }
        }
      });
    }

    if (Chart && resourceChartRef.current) {
      new Chart(resourceChartRef.current.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Convênios Bloqueados', 'Emendas Devolvidas', 'Financiamentos Negados'],
          datasets: [
            { label: 'Gestão Improvisada', data: [70, 55, 80], backgroundColor: '#f97316' },
            { label: 'Gestão Técnica', data: [15, 10, 5], backgroundColor: '#1d4ed8' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: '% de Verbas Travadas' } } }
        }
      });
    }

    if (Chart && limpeChartRef.current) {
      new Chart(limpeChartRef.current.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels: ['Legalidade', 'Impessoalidade', 'Moralidade', 'Publicidade', 'Eficiência'],
          datasets: [{ data: [25, 20, 20, 15, 20], backgroundColor: ['#1e3a8a', '#1d4ed8', '#059669', '#10b981', '#eab308'] }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    if (Chart && radarChartRef.current) {
      new Chart(radarChartRef.current.getContext('2d'), {
        type: 'radar',
        data: {
          labels: ['Planeamento', 'Tecnologia', 'Governança', 'Participação', 'Resiliência'],
          datasets: [
            { label: 'Cidade Tradicional', data: [30, 25, 40, 35, 20], borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.2)' },
            { label: 'Cidade 3ª Via', data: [95, 85, 90, 80, 95], borderColor: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.2)' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } },
          scales: { r: { beginAtZero: true, max: 100 } }
        }
      });
    }

    if (Plotly && pyramidDivRef.current) {
      const data = [{
        type: 'funnel',
        y: ["Constituição Federal", "Constituição Estadual", "Lei Orgânica", "Leis Complementares", "Leis Ordinárias", "Decretos", "Portarias"],
        x: [100, 90, 80, 70, 60, 50, 40],
        textinfo: "label+percent initial",
        marker: { color: ["#0f172a", "#1e3a8a", "#1d4ed8", "#059669", "#10b981", "#eab308", "#f97316"] }
      }];
      Plotly.newPlot(pyramidDivRef.current, data, { margin: { t: 20, b: 20 }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)' }, { responsive: true });
    }

    if (Plotly && scatterDivRef.current) {
      const data = [{
        x: [30, 40, 50, 55, 60, 65, 70, 75, 80, 85, 90],
        y: [5, 8, 12, 15, 20, 28, 35, 45, 60, 70, 85],
        mode: 'markers',
        type: 'scatter',
        marker: { size: 12, color: '#059669' },
        text: ['Mun. A', 'Mun. B', 'Mun. C', 'Mun. D', 'Mun. E', 'Mun. F', 'Mun. G', 'Mun. H', 'Mun. I', 'Mun. J', 'Mun. K']
      }];
      const layout = {
        xaxis: { title: 'Índice de Liberdade Económica (0-100)' },
        yaxis: { title: 'Crescimento da Receita Própria (%)' },
        margin: { t: 30, b: 50, l: 60, r: 30 },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)'
      };
      Plotly.newPlot(scatterDivRef.current, data, layout, { responsive: true });
    }
  };

  const callGemini = async (systemPrompt: string, userQuery: string): Promise<string> => {
    if (!apiKey) {
      return 'Erro: Chave de API não configurada. Configure a variável GEMINI_API_KEY.';
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: userQuery,
        config: {
          systemInstruction: systemPrompt
        }
      });
      return response.text || 'Sem resposta da IA.';
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return `Erro ao consultar a IA: ${error.message}`;
    }
  };

  const formatMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-blue-900">$1</strong>')
      .replace(/\n/g, '<br/>')
      .replace(/^- (.+)/gm, '<li class="ml-4">$1</li>');
  };

  const performRiskAnalysis = async () => {
    if (!riskQuery.trim()) return;
    setRiskLoading(true);
    setRiskResult('');
    const systemPrompt = `Atue como um Auditor de Compliance Governamental. Analise a ação administrativa descrita e retorne: 1. **NÍVEL DE RISCO** (Alto/Médio/Baixo). 2. **FUNDAMENTO LEGAL** (Cite a legislação aplicável). 3. **RECOMENDAÇÃO** (Ação corretiva sugerida). Responda em Português.`;
    const result = await callGemini(systemPrompt, riskQuery);
    setRiskResult(result);
    setRiskLoading(false);
  };

  const generateActionPlan = async () => {
    if (!planQuery.trim()) return;
    setPlanLoading(true);
    setPlanResult('');
    const systemPrompt = `Atue como um Especialista em Gestão Pública. Transforme o objetivo em um plano de 5-7 passos baseados em Engenharia Territorial. Estruture: 1. **OBJETIVO ESTRATÉGICO**. 2. **PASSOS DE IMPLEMENTAÇÃO** (5-7 itens). 3. **INDICADORES DE SUCESSO**. Responda em Português.`;
    const result = await callGemini(systemPrompt, planQuery);
    setPlanResult(result);
    setPlanLoading(false);
  };

  const auditMunicipalPlans = async () => {
    if (!cityAudit.trim() || !stateAudit.trim()) return;
    setAuditLoading(true);
    setAuditResult('');
    const systemPrompt = `Atue como um Auditor de Planos Municipais. Para o município informado, forneça informações sobre o status dos planos PMSB e PNRS. Estruture: 1. **STATUS GERAL**. 2. **RISCOS IDENTIFICADOS**. 3. **RECOMENDAÇÕES**. Responda em Português.`;
    const result = await callGemini(systemPrompt, `Município: ${cityAudit}, Estado: ${stateAudit}`);
    setAuditResult(result);
    setAuditLoading(false);
  };

  const generateSustainableIdea = async () => {
    if (!challengeQuery.trim()) return;
    setIdeaLoading(true);
    setIdeaResult('');
    const systemPrompt = `Atue como um Especialista em Sustentabilidade e Agenda 2030. Gere uma proposta de projeto: 1. **NOME DO PROJETO**. 2. **ALINHAMENTO ODS**. 3. **PROPOSTA DE AÇÃO E CAPTAÇÃO**. Responda em Português.`;
    const result = await callGemini(systemPrompt, `Desafio: ${challengeQuery}. ODS: ${odsSelect}`);
    setIdeaResult(result);
    setIdeaLoading(false);
  };

  const generateLeadershipStructure = async () => {
    if (!cityLeadership.trim() || !stateLeadership.trim()) return;
    setLeadershipLoading(true);
    setLeadershipResult('');
    const systemPrompt = `Atue como um Especialista em Engenharia Territorial. Gere a estrutura de multiplicação de liderança: 1. **ORGANOGRAMA TERRITORIAL** (Núcleo > Célula > Pequeno Grupo). 2. **MATRIZ DE RESPONSABILIDADES**. 3. **MÉTRICA DE SUCESSO**. Responda em Português.`;
    const result = await callGemini(systemPrompt, `Município: ${cityLeadership}, ${stateLeadership}`);
    setLeadershipResult(result);
    setLeadershipLoading(false);
  };

  const draftProjectLaw = async () => {
    if (!lawSubject.trim() || !lawEffect.trim()) return;
    setLawLoading(true);
    setLawResult('');
    const systemPrompt = `Atue como um Redator Legislativo Municipal. Gere uma minuta de Projeto de Lei: 1. **EMENTA**. 2. **ARTICULADO BÁSICO** (Art. 1º, Art. 2º, Art. 3º). 3. **JUSTIFICATIVA**. Responda em Português.`;
    const result = await callGemini(systemPrompt, `Assunto: ${lawSubject}. Efeito: ${lawEffect}`);
    setLawResult(result);
    setLawLoading(false);
  };

  const generateParticipatoryBudget = async () => {
    if (!budgetGoalQuery.trim()) return;
    setBudgetLoading(true);
    setBudgetResult('');
    const systemPrompt = `Atue como um Técnico de Orçamento Público. Analise a meta: 1. **ALINHAMENTO PPA**. 2. **DESDOBRAMENTO ORÇAMENTÁRIO**. 3. **COMUNICAÇÃO PÚBLICA**. Responda em Português.`;
    const result = await callGemini(systemPrompt, budgetGoalQuery);
    setBudgetResult(result);
    setBudgetLoading(false);
  };

  const generateCrisisProtocol = async () => {
    if (!crisisScenarioQuery.trim()) return;
    setCrisisLoading(true);
    setCrisisResult('');
    const systemPrompt = `Atue como o Chefe de Comunicação da Defesa Civil. Gere um comunicado oficial: 1. **TÍTULO E URGÊNCIA**. 2. **AÇÃO EM CURSO**. 3. **INSTRUÇÕES À POPULAÇÃO**. Responda em Português.`;
    const result = await callGemini(systemPrompt, crisisScenarioQuery);
    setCrisisResult(result);
    setCrisisLoading(false);
  };

  const generateComplianceReport = async () => {
    if (!complianceQuery.trim()) return;
    setComplianceLoading(true);
    setComplianceResult('');
    const systemPrompt = `Atue como um Auditor de Compliance para Pequenas Empresas. Gere um roteiro: 1. **FOCO E TIPO DE NEGÓCIO**. 2. **CHECKLIST DE CONFORMIDADE**. 3. **OPORTUNIDADE 3ª VIA**. Responda em Português.`;
    const result = await callGemini(systemPrompt, complianceQuery);
    setComplianceResult(result);
    setComplianceLoading(false);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center text-blue-700">
      <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      A processar...
    </div>
  );

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      <header className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-16 px-4 mb-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-1 mb-4 border border-emerald-400 rounded-full text-emerald-300 text-sm font-bold tracking-wider uppercase">
            Compliance & Governança Pública
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Engenharia Territorial e <span className="text-emerald-400">Gestão Eficiente</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Plataforma de <strong>Consultoria e Formação Técnica Neutra</strong>. Não somos partido ou organização religiosa. Preparamos líderes municipais para Gestão de Alta Performance.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-16">
        
        <section>
          <div className="mb-8 border-l-4 border-blue-900 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">1. O Custo do Amadorismo vs. Gestão Técnica</h2>
            <p className="text-slate-600 mt-2">
              A falta de formação técnica gera prejuízos incalculáveis. O comparativo abaixo demonstra a redução drástica de riscos jurídicos e fiscais quando a gestão adota a metodologia baseada na Lei de Responsabilidade Fiscal (LRF).
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Índice de Rejeição de Contas</h3>
              <p className="text-sm text-slate-500 mb-4">Comparativo: Gestão Improvisada vs. Gestão Técnica</p>
              <div className="relative h-[350px]">
                <canvas ref={riskChartRef}></canvas>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Eficiência na Captação de Recursos</h3>
              <p className="text-sm text-slate-500 mb-4">Volume de verbas travadas por falta dos 32 Planos Obrigatórios</p>
              <div className="relative h-[350px]">
                <canvas ref={resourceChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">2. Os 5 Pilares da Identidade Administrativa (LIMPE)</h2>
            <p className="text-slate-600 mt-2">
              O Módulo 01 estabelece o alicerce constitucional. Todo ato administrativo deve obedecer rigorosamente aos princípios do Art. 37 da Constituição Federal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500 flex flex-col justify-center">
              <div className="text-5xl font-extrabold text-emerald-600 mb-2">100%</div>
              <div className="text-lg font-bold text-slate-900 mb-4">Conformidade Legal</div>
              <p className="text-slate-600 text-sm">
                A gestão ética não é opcional. A aplicação dos princípios LIMPE reduz em até 90% os processos por Improbidade Administrativa.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span>Legalidade Estrita</li>
                <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>Impessoalidade</li>
                <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Moralidade</li>
                <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>Publicidade</li>
                <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>Eficiência</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500 lg:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Distribuição de Foco: Princípios Constitucionais</h3>
              <div className="relative h-[350px]">
                <canvas ref={limpeChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">3. Arquitetura Jurídica e Legislativa</h2>
            <p className="text-slate-600 mt-2">
              A hierarquia das normas é vital para evitar inconstitucionalidade. O gráfico ilustra a base normativa que sustenta a segurança jurídica municipal.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
            <h3 className="text-xl font-bold mb-2 text-blue-900">Pirâmide de Kelsen Aplicada ao Município</h3>
            <div ref={pyramidDivRef} className="w-full h-[400px]"></div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-blue-900 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">4. Diagnóstico de Maturidade Urbana</h2>
            <p className="text-slate-600 mt-2">
              Comparativo entre uma "Cidade Improvisada" e uma "Cidade Inteligente". A aplicação dos 32 Planos Municipais expande a capacidade de entrega de serviços.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <h3 className="text-xl font-bold mb-4 text-blue-900">Radar de Eficiência Municipal</h3>
              <div className="relative h-[350px]">
                <canvas ref={radarChartRef}></canvas>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500">
                <h4 className="font-bold text-slate-900">Planeamento (Planos Setoriais)</h4>
                <p className="text-sm text-slate-600 mt-1">O salto de 30% para 95% ocorre pela elaboração dos planos de Saneamento, Mobilidade e Diretor.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                <h4 className="font-bold text-slate-900">Tecnologia (Smart Cities)</h4>
                <p className="text-sm text-slate-600 mt-1">Implementação de Governo Digital e conectividade, reduzindo custos operacionais.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <h4 className="font-bold text-slate-900">Resiliência (Defesa Civil)</h4>
                <p className="text-sm text-slate-600 mt-1">Mapeamento de riscos e protocolos de crise aumentam a capacidade de resposta.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">5. Ciclo Orçamentário e Financeiro (Módulo 06)</h2>
            <p className="text-slate-600 mt-2">
              O fluxo do dinheiro público deve respeitar o rito constitucional. A quebra deste ciclo é a principal causa de inelegibilidade de gestores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-blue-900">
              <div className="text-4xl font-bold text-slate-200 mb-2">01</div>
              <h3 className="text-lg font-bold text-blue-900">PPA (Plano Plurianual)</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Visão de 4 Anos</p>
              <p className="text-sm text-slate-600">Define as diretrizes, objetivos e metas estratégicas de médio prazo. É o "Sonho Organizado".</p>
            </div>
            <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-blue-700">
              <div className="text-4xl font-bold text-slate-200 mb-2">02</div>
              <h3 className="text-lg font-bold text-blue-900">LDO (Diretrizes)</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Metas Anuais</p>
              <p className="text-sm text-slate-600">Define as prioridades para o ano seguinte e sintoniza o PPA com a realidade fiscal.</p>
            </div>
            <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
              <div className="text-4xl font-bold text-slate-200 mb-2">03</div>
              <h3 className="text-lg font-bold text-blue-900">LOA (Orçamento)</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Execução Financeira</p>
              <p className="text-sm text-slate-600">Estima receitas e fixa despesas. É a autorização legislativa para gastar e investir.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">6. Impacto Económico e Social</h2>
            <p className="text-slate-600 mt-2">
              A correlação entre Liberdade Económica e Desenvolvimento Social. Desburocratização gera aumento direto no IDH e na Arrecadação Própria.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-500">
            <h3 className="text-xl font-bold mb-2 text-blue-900">Correlação: Desburocratização x Receita Própria</h3>
            <div ref={scatterDivRef} className="w-full h-[400px]"></div>
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">7. Simulador de Risco Jurídico</h2>
            <p className="text-slate-600 mt-2">
              Consulte o seu Auditor de Compliance virtual. Insira uma ação administrativa e receba uma avaliação de risco baseada na legislação.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-blue-900">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Análise de Compliance</h3>
            <textarea
              value={riskQuery}
              onChange={(e) => setRiskQuery(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 mb-4"
              placeholder="Descreva a ação administrativa que deseja avaliar..."
            />
            <button
              onClick={performRiskAnalysis}
              disabled={riskLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {riskLoading ? 'Analisando...' : 'Analisar Risco Jurídico'}
            </button>
            {riskLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {riskResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Resultado:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(riskResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-blue-900 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">8. Gerador de Plano de Ação Estratégico</h2>
            <p className="text-slate-600 mt-2">
              Transforme um objetivo de governo num plano de trabalho estruturado, alinhado à metodologia dos 12 módulos.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
            <h3 className="text-xl font-bold mb-4 text-emerald-600">Plano de Implementação Rápida</h3>
            <textarea
              value={planQuery}
              onChange={(e) => setPlanQuery(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4"
              placeholder="Insira seu objetivo (ex: Implementar o Plano de Saneamento Básico)"
            />
            <button
              onClick={generateActionPlan}
              disabled={planLoading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {planLoading ? 'Gerando...' : 'Gerar Plano Estratégico'}
            </button>
            {planLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {planResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Estrutura do Plano:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(planResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">9. Auditoria de Planos Municipais (PNRS/PMSB)</h2>
            <p className="text-slate-600 mt-2">
              Verifique o status de conformidade dos Planos de Saneamento Básico e Resíduos Sólidos.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4 text-yellow-700">Conformidade e Riscos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={cityAudit}
                onChange={(e) => setCityAudit(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Nome do Município (ex: Ouro Preto)"
              />
              <input
                type="text"
                value={stateAudit}
                onChange={(e) => setStateAudit(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Estado (UF - ex: MG)"
              />
            </div>
            <button
              onClick={auditMunicipalPlans}
              disabled={auditLoading}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {auditLoading ? 'Verificando...' : 'Verificar Status de Planos'}
            </button>
            {auditLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {auditResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Resultado da Auditoria:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(auditResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">10. Gerador de Ideias Sustentáveis (ODS)</h2>
            <p className="text-slate-600 mt-2">
              Gere propostas de projetos inovadores alinhados aos Objetivos de Desenvolvimento Sustentável.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
            <h3 className="text-xl font-bold mb-4 text-emerald-600">Design de Projeto Rápido</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={challengeQuery}
                onChange={(e) => setChallengeQuery(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Desafio do município (ex: Falta de água na zona rural)"
              />
              <select
                value={odsSelect}
                onChange={(e) => setOdsSelect(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
              >
                <option value="ODS 6: Água Limpa e Saneamento">ODS 6: Água Limpa e Saneamento</option>
                <option value="ODS 9: Indústria, Inovação e Infraestrutura">ODS 9: Indústria, Inovação e Infraestrutura</option>
                <option value="ODS 11: Cidades e Comunidades Sustentáveis">ODS 11: Cidades e Comunidades Sustentáveis</option>
                <option value="ODS 13: Ação Contra a Mudança Global do Clima">ODS 13: Ação Contra a Mudança Global do Clima</option>
                <option value="ODS 17: Parcerias e Meios de Implementação">ODS 17: Parcerias e Meios de Implementação</option>
              </select>
            </div>
            <button
              onClick={generateSustainableIdea}
              disabled={ideaLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {ideaLoading ? 'Gerando...' : 'Gerar Ideia de Projeto Sustentável'}
            </button>
            {ideaLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {ideaResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Proposta de Projeto:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(ideaResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-blue-900 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">11. Engenharia de Liderança Territorial</h2>
            <p className="text-slate-600 mt-2">
              A multiplicação de liderança é a chave da Engenharia Territorial (Módulo 11). Gere a estrutura Núcleo {">"} Célula {">"} Pequeno Grupo.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-blue-900">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Estrutura de Multiplicação 12x3</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={cityLeadership}
                onChange={(e) => setCityLeadership(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Nome do Município"
              />
              <input
                type="text"
                value={stateLeadership}
                onChange={(e) => setStateLeadership(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Estado (UF)"
              />
            </div>
            <button
              onClick={generateLeadershipStructure}
              disabled={leadershipLoading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {leadershipLoading ? 'Gerando...' : 'Gerar Estrutura de Liderança'}
            </button>
            {leadershipLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {leadershipResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Organograma Territorial:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(leadershipResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">12. Assistente de Projeto de Lei</h2>
            <p className="text-slate-600 mt-2">
              Gere uma minuta básica com Ementa, Artigos e Justificativa.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
            <h3 className="text-xl font-bold mb-4 text-emerald-600">Redator Legislativo Virtual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={lawSubject}
                onChange={(e) => setLawSubject(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Assunto do Projeto de Lei"
              />
              <input
                type="text"
                value={lawEffect}
                onChange={(e) => setLawEffect(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg"
                placeholder="Efeito Principal (o que a lei fará)"
              />
            </div>
            <button
              onClick={draftProjectLaw}
              disabled={lawLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {lawLoading ? 'Redigindo...' : 'Gerar Minuta de Lei'}
            </button>
            {lawLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {lawResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Minuta do Projeto de Lei:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(lawResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-blue-900 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">13. Orçamento Participativo</h2>
            <p className="text-slate-600 mt-2">
              Quebra uma meta física em rubricas orçamentárias (PPA/LDO/LOA).
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-blue-900">
            <h3 className="text-xl font-bold mb-4 text-blue-900">Estrutura de Meta</h3>
            <textarea
              value={budgetGoalQuery}
              onChange={(e) => setBudgetGoalQuery(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4"
              placeholder="Descreva a meta de investimento (ex: Construir 5 creches até 2028)"
            />
            <button
              onClick={generateParticipatoryBudget}
              disabled={budgetLoading}
              className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {budgetLoading ? 'Gerando...' : 'Gerar Desdobramento Orçamentário'}
            </button>
            {budgetLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {budgetResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Estrutura Orçamentária:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(budgetResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-yellow-500 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">14. Protocolo de Crise</h2>
            <p className="text-slate-600 mt-2">
              Gere um comunicado oficial da Defesa Civil para situações de emergência.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4 text-yellow-700">Gerador de Comunicado de Crise</h3>
            <textarea
              value={crisisScenarioQuery}
              onChange={(e) => setCrisisScenarioQuery(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4"
              placeholder="Descreva o cenário de crise (ex: Enchente no bairro centro)"
            />
            <button
              onClick={generateCrisisProtocol}
              disabled={crisisLoading}
              className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {crisisLoading ? 'Gerando...' : 'Gerar Comunicado de Emergência'}
            </button>
            {crisisLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {crisisResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Comunicado Oficial:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(crisisResult) }} />
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-8 border-l-4 border-emerald-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-900">15. Compliance Empresarial (B2G)</h2>
            <p className="text-slate-600 mt-2">
              Gere um checklist para empresas/MEIs que querem vender para o governo ou obter certificações.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
            <h3 className="text-xl font-bold mb-4 text-emerald-600">Roteiro de Conformidade</h3>
            <textarea
              value={complianceQuery}
              onChange={(e) => setComplianceQuery(e.target.value)}
              rows={4}
              className="w-full p-3 border border-slate-300 rounded-lg mb-4"
              placeholder="Descreva sua situação (ex: Sou MEI e quero vender para a prefeitura)"
            />
            <button
              onClick={generateComplianceReport}
              disabled={complianceLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition"
            >
              {complianceLoading ? 'Gerando...' : 'Gerar Checklist de Conformidade'}
            </button>
            {complianceLoading && <div className="mt-4"><LoadingSpinner /></div>}
            {complianceResult && (
              <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-2">Roteiro de Compliance:</h4>
                <div className="text-slate-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(complianceResult) }} />
              </div>
            )}
          </div>
        </section>

        <footer className="mt-20 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600">
            <div>
              <h4 className="font-bold text-slate-900 mb-4">CFER-BRASIL</h4>
              <p>CNPJ: 48.488.559/0001-44</p>
              <p>Ouro Preto - MG</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">TERRA E FÉ</h4>
              <p>CNPJ: 36.008.222/0001-00</p>
              <p>Portão - RS</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contato</h4>
              <p>WhatsApp: (51) 99534-7903</p>
              <p>Email: contato@3aviasocial.com.br</p>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-slate-400">
            <p>© 2025 3ª Via Social. Plataforma de Formação Técnica Neutra.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MethodologyPage;

import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

// Declaração para evitar erros de TS com bibliotecas globais
declare global {
  interface Window {
    Chart: any;
    Plotly: any;
  }
}

const ManagementPanel: React.FC = () => {
  // Refs para Gráficos
  const riskChartRef = useRef<HTMLCanvasElement>(null);
  const resourceChartRef = useRef<HTMLCanvasElement>(null);
  const limpeChartRef = useRef<HTMLCanvasElement>(null);
  const radarCityChartRef = useRef<HTMLCanvasElement>(null);

  // States para Ferramentas AI
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});
  
  // Inputs Refs
  const riskQueryRef = useRef<HTMLTextAreaElement>(null);
  const planQueryRef = useRef<HTMLTextAreaElement>(null);
  const cityAuditRef = useRef<HTMLInputElement>(null);
  const stateAuditRef = useRef<HTMLInputElement>(null);
  const challengeQueryRef = useRef<HTMLInputElement>(null);
  const odsSelectRef = useRef<HTMLSelectElement>(null);
  const cityLeadershipRef = useRef<HTMLInputElement>(null);
  const stateLeadershipRef = useRef<HTMLInputElement>(null);
  const lawSubjectRef = useRef<HTMLInputElement>(null);
  const lawEffectRef = useRef<HTMLInputElement>(null);
  const budgetGoalQueryRef = useRef<HTMLTextAreaElement>(null);
  const crisisScenarioQueryRef = useRef<HTMLTextAreaElement>(null);
  const complianceQueryRef = useRef<HTMLTextAreaElement>(null);

  // Inicialização da API
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-2.5-flash';

  // --- EFEITOS (Gráficos) ---
  useEffect(() => {
    // Configurações Globais Chart.js
    if (window.Chart) {
      window.Chart.defaults.font.family = "'Inter', sans-serif";
      window.Chart.defaults.color = '#475569';
    }

    const tooltipPlugin = {
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          title: function(tooltipItems: any) {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) return label.join(' ');
            return label;
          }
        }
      }
    };

    const wrapLabel = (label: string) => {
        const maxLength = 16;
        if (label.length <= maxLength) return label;
        const words = label.split(' ');
        const lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            if ((currentLine + " " + words[i]).length <= maxLength) {
                currentLine += " " + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // 1. Risk Chart
    if (riskChartRef.current && window.Chart) {
      new window.Chart(riskChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Gestão Improvisada', 'Gestão Técnica'],
          datasets: [{
            label: 'Risco de Rejeição de Contas (%)',
            data: [78, 5],
            backgroundColor: ['#ef4444', '#059669'],
            borderRadius: 6,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, ...tooltipPlugin },
          scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Probabilidade de Rejeição (%)' } } }
        }
      });
    }

    // 2. Resource Chart
    if (resourceChartRef.current && window.Chart) {
      new window.Chart(resourceChartRef.current, {
        type: 'bar',
        data: {
          labels: [wrapLabel('Sem Planos Obrigatórios'), wrapLabel('Com Planos Aprovados')],
          datasets: [{
            label: 'Recursos Federais Acessíveis (R$ Milhões)',
            data: [2.5, 45.0],
            backgroundColor: ['#94a3b8', '#1d4ed8'],
            borderRadius: 6,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, ...tooltipPlugin },
          scales: { y: { beginAtZero: true, title: { display: true, text: 'Potencial de Captação (R$ Mi)' } } }
        }
      });
    }

    // 3. LIMPE Chart
    if (limpeChartRef.current && window.Chart) {
      new window.Chart(limpeChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Legalidade', 'Impessoalidade', 'Moralidade', 'Publicidade', 'Eficiência'],
          datasets: [{
            data: [20, 20, 20, 20, 20],
            backgroundColor: ['#1e3a8a', '#1d4ed8', '#059669', '#10b981', '#eab308'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right' }, ...tooltipPlugin }
        }
      });
    }

    // 4. Radar Chart
    if (radarCityChartRef.current && window.Chart) {
      new window.Chart(radarCityChartRef.current, {
        type: 'radar',
        data: {
          labels: ['Planeamento', 'Saneamento', 'Tecnologia', 'Transparência', 'Mobilidade', 'Defesa Civil'],
          datasets: [{
            label: 'Cidade Tradicional',
            data: [30, 40, 20, 50, 35, 25],
            backgroundColor: 'rgba(148, 163, 184, 0.2)',
            borderColor: '#94a3b8',
            pointBackgroundColor: '#94a3b8'
          }, {
            label: 'Cidade 3ª Via (Técnica)',
            data: [95, 90, 85, 100, 80, 90],
            backgroundColor: 'rgba(5, 150, 105, 0.2)',
            borderColor: '#059669',
            pointBackgroundColor: '#059669'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { ...tooltipPlugin },
          scales: {
            r: {
              angleLines: { color: '#e2e8f0' },
              grid: { color: '#e2e8f0' },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      });
    }

    // 5. Plotly Pyramid
    if (window.Plotly && document.getElementById('pyramidDiv')) {
        const pyramidData = [{
            type: 'funnel',
            y: ["Constituição Federal", "Constituição Estadual", "Lei Orgânica (LOM)", "Leis Municipais", "Decretos e Portarias"],
            x: [100, 80, 60, 40, 20],
            textinfo: "y",
            hoverinfo: "x+y",
            marker: { color: ["#1e3a8a", "#1d4ed8", "#2563eb", "#059669", "#10b981"] }
        }];
        const pyramidLayout = {
            margin: { l: 150, r: 20, t: 20, b: 20 },
            funnelmode: "stack",
            showlegend: false,
            font: { family: 'Inter, sans-serif' }
        };
        window.Plotly.newPlot('pyramidDiv', pyramidData, pyramidLayout, {responsive: true, displayModeBar: false});
    }

    // 6. Plotly Scatter
    if (window.Plotly && document.getElementById('scatterDiv')) {
        const scatterData = {
            x: [10, 25, 40, 60, 85, 95],
            y: [15, 30, 45, 65, 80, 92],
            mode: 'markers+lines',
            type: 'scatter',
            marker: { size: 12, color: '#eab308' },
            line: { color: '#1e3a8a', width: 2 },
            text: ['Burocracia Extrema', 'Baixa Digitalização', 'Em Transição', 'Lei Liberdade Econ.', 'Ambiente Favorável', 'Polo de Desenvolvimento'],
            hoverinfo: 'text+y'
        };
        const scatterLayout = {
            margin: { l: 60, r: 40, t: 40, b: 60 },
            xaxis: { title: 'Índice de Liberdade Económica (0-100)', showgrid: true, gridcolor: '#e2e8f0' },
            yaxis: { title: 'Arrecadação Própria (Índice)', showgrid: true, gridcolor: '#e2e8f0' },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, sans-serif' }
        };
        window.Plotly.newPlot('scatterDiv', [scatterData], scatterLayout, {responsive: true, displayModeBar: false});
    }

  }, []);

  // --- FUNÇÕES DE API ---

  const handleGenAIRequest = async (key: string, userQuery: string, systemPrompt: string, useGoogleSearch: boolean = true, schema: any = null) => {
    setLoading(key);
    setResults(prev => ({ ...prev, [key]: '' }));

    try {
        const config: any = {
            systemInstruction: systemPrompt,
        };
        
        if (useGoogleSearch) {
            config.tools = [{ googleSearch: {} }];
        }
        
        if (schema) {
            config.responseMimeType = "application/json";
            config.responseSchema = schema;
        }

        const response = await ai.models.generateContent({
            model: modelName,
            contents: userQuery,
            config: config
        });

        const text = response.text || "Sem resposta.";
        return text;
    } catch (error) {
        console.error(error);
        return "Erro ao processar a solicitação. Tente novamente.";
    } finally {
        setLoading(null);
    }
  };

  const performRiskAnalysis = async () => {
    const query = riskQueryRef.current?.value;
    if (!query) return;

    const systemPrompt = "Atue como um Auditor Sênior do Tribunal de Contas (TC) especializado em Direito Administrativo e Responsabilidade Fiscal (LRF). Analise a ação administrativa fornecida pelo usuário. Sua resposta DEVE ser estruturada e concisa, e deve conter TRÊS PARTES obrigatórias, formatadas em Markdown: 1. **RISCO** (Alto/Médio/Baixo). 2. **FUNDAMENTO LEGAL** (Cite a lei/artigo mais relevante: LRF, LIA, Lei 14.133/2021, etc., com base na consulta Google Search). 3. **RECOMENDAÇÃO** (Ação corretiva imediata). Responda sempre em Português.";
    
    const text = await handleGenAIRequest('risk', `Avalie a seguinte ação administrativa no contexto municipal: "${query}"`, systemPrompt);
    
    // Simple Formatting
    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**RISCO**')) {
            const riskLevel = line.split(':')[1]?.trim() || '';
            let colorClass = 'text-slate-700';
            if (riskLevel.includes('Alto')) colorClass = 'text-red-600 font-extrabold';
            else if (riskLevel.includes('Médio')) colorClass = 'text-yellow-600 font-bold';
            else if (riskLevel.includes('Baixo')) colorClass = 'text-emerald-600 font-bold';
            return `<p class="text-lg ${colorClass}">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**FUNDAMENTO LEGAL**')) {
                return `<p class="font-semibold text-blue-900">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**RECOMENDAÇÃO**')) {
                return `<p class="italic text-slate-600">${line.replace(/\*\*/g, '')}</p>`;
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');

    setResults(prev => ({...prev, risk: htmlContent}));
  };

  const generateActionPlan = async () => {
      const query = planQueryRef.current?.value;
      if (!query) return;
      
      const systemPrompt = "Atue como um Consultor Estratégico em Engenharia Territorial da 3ª Via Social. Você deve transformar o objetivo do usuário em um plano de ação estruturado de 5 a 7 passos. O plano DEVE ser formatado em Markdown e conter TRÊS PARTES obrigatórias: 1. **MÓDULOS ENVOLVIDOS** (Liste os números dos módulos 1 a 12 que dão suporte legal/técnico). 2. **PASSO A PASSO** (Use uma lista numerada para descrever as ações, mencionando o aspecto legal, financeiro, ou técnico de cada passo). 3. **META DE CURTO PRAZO** (Defina um marco inicial para 30 dias). Responda sempre em Português.";
      const text = await handleGenAIRequest('plan', `Gere um plano de ação estratégico para o seguinte objetivo: "${query}"`, systemPrompt);
      
      const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**MÓDULOS ENVOLVIDOS**')) {
            return `<p class="font-bold text-emerald-600">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**PASSO A PASSO**')) {
                return `<p class="font-semibold text-blue-900">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^\d+\./)) {
                return `<p class="ml-4 text-sm">${line}</p>`;
        } else if (line.startsWith('**META DE CURTO PRAZO**')) {
                return `<p class="italic font-medium text-slate-700 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, plan: htmlContent}));
  }

  const auditMunicipalPlans = async () => {
      const city = cityAuditRef.current?.value;
      const state = stateAuditRef.current?.value;
      if (!city || !state) return;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
            municipio: { type: Type.STRING },
            populacao_estimada: { type: Type.STRING, description: "Estimativa populacional do município." },
            status_planos: {
                type: Type.ARRAY,
                description: "Lista dos principais planos municipais obrigatórios.",
                items: {
                    type: Type.OBJECT,
                    properties: {
                        plano: { type: Type.STRING }, 
                        status_conformidade: { type: Type.STRING, description: "Status: Desatualizado, Em Vigência, Ausente ou Em Elaboração." }, 
                        base_legal: { type: Type.STRING, description: "Lei federal ou estadual que o exige, ou o ano da última atualização encontrada." }
                    }
                }
            },
            risco_financeiro_geral: { type: Type.STRING, description: "Avaliação do risco de perda de verbas federais (Alto/Médio/Baixo) devido à situação dos planos." }
        },
        propertyOrdering: ["municipio", "populacao_estimada", "status_planos", "risco_financeiro_geral"]
    };

    const systemPrompt = "Atue como um Analista Sênior do Ministério do Desenvolvimento Regional. Use o Google Search para verificar o status de conformidade dos seguintes planos obrigatórios no município de até 100 mil habitantes, com foco nas leis federais: Plano Municipal de Saneamento Básico (PMSB) e Plano de Gestão Integrada de Resíduos Sólidos (PMGIRS).";

    const text = await handleGenAIRequest('audit', `Audite os planos PMSB e PMGIRS para o município: ${city}, ${state}. Inclua a população estimada do município.`, systemPrompt, true, responseSchema);
    
    try {
        const auditData = JSON.parse(text);
        let contentHtml = `<h4 class="font-bold text-slate-900 mb-2">Auditoria para ${auditData.municipio} (${auditData.populacao_estimada} Hab.)</h4>`;
        contentHtml += `<p class="text-sm text-slate-600 mb-3"><strong>Risco de Bloqueio de Verbas:</strong> <span class="font-bold text-red-600">${auditData.risco_financeiro_geral}</span></p>`;
        contentHtml += `<div class="space-y-4">`;

        auditData.status_planos.forEach((plano: any) => {
            let statusColor = 'bg-green-100 text-green-800 border-green-400';
            if (plano.status_conformidade.includes('Desatualizado') || plano.status_conformidade.includes('Ausente')) {
                statusColor = 'bg-red-100 text-red-800 border-red-400';
            } else if (plano.status_conformidade.includes('Elaboração') || plano.status_conformidade.includes('Indisponível')) {
                statusColor = 'bg-yellow-100 text-yellow-800 border-yellow-400';
            }
            
            contentHtml += `
                <div class="p-3 border rounded-lg ${statusColor}">
                    <p class="font-bold">${plano.plano}</p>
                    <p class="text-sm">Status: <strong>${plano.status_conformidade}</strong></p>
                    <p class="text-xs text-slate-600">Base/Última Ação: ${plano.base_legal}</p>
                </div>
            `;
        });
        contentHtml += `</div>`;
        setResults(prev => ({...prev, audit: contentHtml}));
    } catch(e) {
        setResults(prev => ({...prev, audit: "Erro ao processar dados da auditoria."}));
    }
  }

  const generateSustainebleIdea = async () => {
    const challenge = challengeQueryRef.current?.value;
    const ods = odsSelectRef.current?.value;
    if (!challenge) return;

    const systemPrompt = `Atue como um Especialista em Gestão de Projetos e Sustentabilidade (Agenda 2030). Seu objetivo é gerar uma proposta de projeto municipal inovador, com foco na captação de recursos. Sua resposta DEVE ser estruturada em Markdown e conter as seguintes TRÊS PARTES obrigatórias: 1. **NOME DO PROJETO** (Curto e impactante). 2. **ALINHAMENTO E ODS** (Explique como o projeto resolve o desafio e se alinha ao ODS selecionado). 3. **PROPOSTA DE AÇÃO E CAPTAÇÃO** (Sugira 3 passos concretos para a implementação e as possíveis fontes de financiamento - BNDES, Caixa, Fundos Federais, Parceria com a Iniciativa Privada). Responda sempre em Português.`;
    const text = await handleGenAIRequest('idea', `Gere uma ideia de projeto para resolver o seguinte desafio municipal: "${challenge}". O projeto deve ser focado no alinhamento ao ${ods}.`, systemPrompt);

    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**NOME DO PROJETO**')) {
            return `<p class="text-xl font-bold text-blue-900 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**ALINHAMENTO E ODS**')) {
                return `<p class="font-semibold text-emerald-600 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**PROPOSTA DE AÇÃO E CAPTAÇÃO**')) {
                return `<p class="font-semibold text-blue-900 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^- /)) {
            return `<ul class="list-disc ml-6 text-sm">${line.replace(/^- /, '<li>')}</li></ul>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, idea: htmlContent}));
  }

  const generateLeadershipStructure = async () => {
      const city = cityLeadershipRef.current?.value;
      const state = stateLeadershipRef.current?.value;
      if (!city) return;

      const systemPrompt = `Atue como um Especialista em Organização Comunitária e Engenharia Territorial, aplicando a metodologia de multiplicação de liderança 'Núcleo Municipal > Célula de Bairro > Pequeno Grupo em Vila' (Módulo 11 da 3ª Via). Sua resposta DEVE ser um organograma de 3 níveis hierárquicos com as responsabilidades detalhadas de cada nível, usando o município fornecido como contexto para a descrição. Use Markdown e TRÊS PARTES obrigatórias: 1. **ORGANOGRAMA TERRITORIAL** (Descreva a hierarquia em 3 níveis com o exemplo fornecido: Núcleo Municipal de ${city}/${state} > Líderes de Células (Bairros) > Líderes de Pequenos Grupos (Vilas/Ruas)). 2. **MATRIZ DE RESPONSABILIDADES** (Descreva a responsabilidade principal para cada nível: Núcleo, Célula e Pequeno Grupo). 3. **MÉTRICA DE SUCESSO** (Como medir a eficácia da multiplicação, com foco em 3 indicadores). Responda sempre em Português.`;
      const text = await handleGenAIRequest('leadership', `Gere a estrutura de multiplicação de liderança para o município de ${city}, ${state}.`, systemPrompt);

      const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**ORGANOGRAMA TERRITORIAL**')) {
            return `<p class="font-bold text-blue-900">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**MATRIZ DE RESPONSABILIDADES**')) {
                return `<p class="font-semibold text-emerald-600 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**MÉTRICA DE SUCESSO**')) {
                return `<p class="font-semibold text-yellow-700 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^- /)) {
            return `<ul class="list-disc ml-6 text-sm">${line.replace(/^- /, '<li>')}</li></ul>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, leadership: htmlContent}));
  }

  const draftProjectLaw = async () => {
    const subject = lawSubjectRef.current?.value;
    const effect = lawEffectRef.current?.value;
    if (!subject) return;

    const systemPrompt = "Atue como um Redator Legislativo Municipal, aplicando as regras de técnica legislativa (Ementa, Articulado e Justificativa). Você deve gerar uma minuta base de Projeto de Lei. Sua resposta DEVE ser estruturada em Markdown com TRÊS PARTES obrigatórias: 1. **EMENTA** (Curta, descrevendo o assunto). 2. **ARTICULADO BÁSICO** (Estrutura mínima com Art. 1º, Art. 2º e Art. 3º, usando linguagem legal formal). 3. **JUSTIFICATIVA** (Texto breve e persuasivo, citando a importância pública e social da medida). Responda sempre em Português.";
    const text = await handleGenAIRequest('law', `Redija um Projeto de Lei sobre o assunto "${subject}", com o seguinte efeito principal: "${effect}".`, systemPrompt);

    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**EMENTA**')) {
            return `<p class="text-lg font-bold text-blue-900 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**ARTICULADO BÁSICO**')) {
                return `<p class="font-semibold text-emerald-600 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**JUSTIFICATIVA**')) {
                return `<p class="font-semibold text-yellow-700 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^Art\. \d+º/)) {
            return `<p class="font-mono text-sm ml-4">${line}</p>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, law: htmlContent}));
  }

  const generateParticipatoryBudget = async () => {
    const query = budgetGoalQueryRef.current?.value;
    if (!query) return;

    const systemPrompt = "Atue como um Técnico de Planejamento e Orçamento Público (PPA/LDO/LOA). Analise a meta de investimento fornecida. Sua resposta DEVE ser estruturada em Markdown com TRÊS PARTES obrigatórias: 1. **ALINHAMENTO PPA** (Qual o objetivo de médio prazo deve suportar esta meta - Módulo 06). 2. **DESDOBRAMENTO ORÇAMENTÁRIO** (Liste as 3 sub-ações que devem ser detalhadas na LDO/LOA: ex: Despesa de Capital, Despesa Corrente). 3. **COMUNICAÇÃO PÚBLICA** (Sugira uma frase para apresentar a meta à população de forma transparente e participativa). Responda sempre em Português.";
    const text = await handleGenAIRequest('budget', `Gere a quebra orçamentária e de comunicação para a meta de investimento: "${query}"`, systemPrompt);

    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**ALINHAMENTO PPA**')) {
            return `<p class="font-bold text-blue-900 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**DESDOBRAMENTO ORÇAMENTÁRIO**')) {
                return `<p class="font-semibold text-emerald-600 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**COMUNICAÇÃO PÚBLICA**')) {
                return `<p class="italic font-medium text-yellow-700 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^- /)) {
            return `<ul class="list-disc ml-6 text-sm">${line.replace(/^- /, '<li>')}</li></ul>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, budget: htmlContent}));
  }

  const generateCrisisProtocol = async () => {
    const query = crisisScenarioQueryRef.current?.value;
    if (!query) return;

    const systemPrompt = "Atue como o Chefe de Comunicação da Defesa Civil Municipal, aplicando o protocolo de resposta a crises (Módulo 10). Gere uma minuta de comunicado oficial concisa e objetiva. Sua resposta DEVE ser estruturada em Markdown com TRÊS PARTES obrigatórias: 1. **TÍTULO E URGÊNCIA** (Ex: URGENCE | SITUAÇÃO DE ALERTA). 2. **AÇÃO EM CURSO** (O que a Prefeitura está fazendo: Defesa Civil, Equipes, etc.). 3. **INSTRUÇÕES À POPULAÇÃO** (3 instruções claras e curtas do que a população deve fazer). Responda sempre em Português.";
    const text = await handleGenAIRequest('crisis', `Gere um comunicado oficial de crise para o seguinte cenário: "${query}"`, systemPrompt);

    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**TÍTULO E URGÊNCIA**')) {
            return `<p class="text-xl font-bold text-red-600 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**AÇÃO EM CURSO**')) {
                return `<p class="font-semibold text-blue-900 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**INSTRUÇÕES À POPULAÇÃO**')) {
                return `<p class="font-semibold text-yellow-700 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^- /)) {
            return `<ul class="list-disc ml-6 text-sm">${line.replace(/^- /, '<li>')}</li></ul>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, crisis: htmlContent}));
  }

  const generateComplianceReport = async () => {
    const query = complianceQueryRef.current?.value;
    if (!query) return;

    const systemPrompt = "Atue como um Auditor de Compliance e Certificação para Pequenas Empresas e MEIs no Brasil, com foco em parcerias B2G. Analise o pedido do usuário e gere um roteiro de conformidade. Sua resposta DEVE ser estruturada em Markdown com TRÊS PARTES obrigatórias: 1. **FOCO E TIPO DE NEGÓCIO** (Identificação do regime tributário e setor com base na consulta). 2. **CHECKLIST DE CONFORMIDADE** (3 a 5 requisitos práticos e legais para a certificação/norma mencionada: ISO, ESG, ou Segurança do Trabalho). 3. **OPORTUNIDADE 3ª VIA** (Como a parceria local da 3ª Via Social, via núcleo de líderes, pode ajudar o empreendedor a cumprir estes requisitos, conectando com o Módulo 11). Responda sempre em Português de Portugal.";
    const text = await handleGenAIRequest('compliance', `Pedido de conformidade: "${query}"`, systemPrompt);

    const htmlContent = text.split('\n').map(line => {
        if (line.startsWith('**FOCO E TIPO DE NEGÓCIO**')) {
            return `<p class="font-bold text-blue-900 mt-2">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**CHECKLIST DE CONFORMIDADE**')) {
                return `<p class="font-semibold text-emerald-600 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.startsWith('**OPORTUNIDADE 3ª VIA**')) {
                return `<p class="font-semibold text-yellow-700 mt-3">${line.replace(/\*\*/g, '')}</p>`;
        } else if (line.match(/^- /)) {
            return `<ul class="list-disc ml-6 text-sm">${line.replace(/^- /, '<li>')}</li></ul>`; 
        } else {
            return `<p>${line}</p>`;
        }
    }).join('');
    setResults(prev => ({...prev, compliance: htmlContent}));
  }


  return (
    <div className="text-slate-800 bg-[#f8fafc] font-sans">
      <header className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white py-16 px-4 mb-12">
        <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block px-4 py-1 mb-4 border border-emerald-400 rounded-full text-emerald-300 text-sm font-bold tracking-wider uppercase">
                Compliance & Governança Pública
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                Painel de Gestão Técnica
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
               Ferramentas, indicadores e diagnósticos para apoio à decisão.
            </p>
        </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 pb-20 space-y-16">

        <section>
            <div className="mb-8 border-l-4 border-blue-900 pl-4">
                <h2 className="text-3xl font-bold text-slate-900">1. O Custo do Amadorismo vs. Gestão Técnica</h2>
                <p class="text-slate-600 mt-2">
                    A falta de formação técnica gera prejuízos incalculáveis. O comparativo abaixo demonstra a redução drástica de riscos jurídicos e fiscais quando a gestão adota a metodologia baseada na Lei de Responsabilidade Fiscal (LRF) e no Planeamento Estratégico.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Índice de Rejeição de Contas</h3>
                    <p className="text-sm text-slate-500 mb-4">Comparativo: Gestão Improvisada vs. Gestão Técnica (Baseado em rejeições de TC)</p>
                    <div className="w-full max-w-full h-[350px] mx-auto relative">
                        <canvas ref={riskChartRef}></canvas>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Eficiência na Captação de Recursos</h3>
                    <p className="text-sm text-slate-500 mb-4">Volume de verbas travadas por falta dos 32 Planos Obrigatórios</p>
                    <div className="w-full max-w-full h-[350px] mx-auto relative">
                        <canvas ref={resourceChartRef}></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">2. Os 5 Pilares da Identidade Administrativa</h2>
                <p class="text-slate-600 mt-2">
                    O Módulo 01 estabelece o alicerce constitucional. Todo ato administrativo deve obedecer rigorosamente aos princípios do Art. 37 da Constituição Federal (LIMPE). Esta distribuição ponderada garante a blindagem jurídica do mandato.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600 lg:col-span-1 flex flex-col justify-center">
                    <div className="text-5xl font-extrabold text-emerald-600 mb-2">100%</div>
                    <div className="text-lg font-bold text-slate-900 mb-4">Conformidade Legal</div>
                    <p className="text-slate-600 text-sm">
                        A gestão ética não é opcional. A aplicação dos princípios LIMPE reduz em até 90% os processos por Improbidade Administrativa.
                    </p>
                    <ul className="mt-6 space-y-3">
                        <li className="flex items-center text-sm font-semibold text-slate-700"><span className="w-2 h-2 bg-blue-900 rounded-full mr-2"></span>Legalidade Estrita</li>
                        <li className="flex items-center text-sm font-semibold text-slate-700"><span class="w-2 h-2 bg-blue-700 rounded-full mr-2"></span>Impessoalidade</li>
                        <li className="flex items-center text-sm font-semibold text-slate-700"><span class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Moralidade</li>
                        <li className="flex items-center text-sm font-semibold text-slate-700"><span class="w-2 h-2 bg-emerald-600 rounded-full mr-2"></span>Publicidade</li>
                        <li className="flex items-center text-sm font-semibold text-slate-700"><span class="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>Eficiência</li>
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Distribuição de Foco: Princípios Constitucionais</h3>
                    <div className="w-full max-w-full h-[350px] mx-auto relative">
                        <canvas ref={limpeChartRef}></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="mb-8 border-l-4 border-yellow-500 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">3. Arquitetura Jurídica e Legislativa</h2>
                <p class="text-slate-600 mt-2">
                    Abordada nos Módulos 02 e 03. A hierarquia das normas é vital para evitar inconstitucionalidade. O gráfico abaixo ilustra a base normativa que sustenta a segurança jurídica municipal, desde a Constituição até os Atos Administrativos.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600 w-full">
                <h3 className="text-xl font-bold mb-2 text-blue-900">Pirâmide de Kelsen Aplicada ao Município</h3>
                <div id="pyramidDiv" className="w-full h-[400px]"></div>
            </div>
        </section>

        <section>
            <div className="mb-8 border-l-4 border-blue-900 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">4. Diagnóstico de Maturidade Urbana</h2>
                <p class="text-slate-600 mt-2">
                    Comparativo entre uma "Cidade Improvisada" e uma "Cidade Inteligente" (Módulos 04, 05, 07 e 10). A aplicação dos 32 Planos Municipais e da Lei do Governo Digital expande a capacidade de entrega de serviços.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600">
                    <h3 className="text-xl font-bold mb-4 text-blue-900">Radar de Eficiência Municipal</h3>
                    <div className="w-full max-w-full h-[350px] mx-auto relative">
                        <canvas ref={radarCityChartRef}></canvas>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-emerald-500">
                        <h4 class="font-bold text-slate-900">Planeamento (Planos Setoriais)</h4>
                        <p class="text-sm text-slate-600 mt-1">O salto de 30% para 95% ocorre pela elaboração dos planos de Saneamento, Mobilidade e Diretor, destravando verbas federais.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                        <h4 class="font-bold text-slate-900">Tecnologia (Smart Cities)</h4>
                        <p class="text-sm text-slate-600 mt-1">Implementação de Governo Digital e conectividade, reduzindo custos operacionais da máquina pública.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                        <h4 class="font-bold text-slate-900">Resiliência (Defesa Civil)</h4>
                        <p class="text-sm text-slate-600 mt-1">Mapeamento de riscos e protocolos de crise aumentam a capacidade de resposta a desastres climáticos.</p>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">5. Ciclo Orçamentário e Financeiro (Módulo 06)</h2>
                <p class="text-slate-600 mt-2">
                    O fluxo do dinheiro público deve respeitar o rito constitucional. A quebra deste ciclo é a principal causa de inelegibilidade de gestores. Abaixo, o fluxo blindado de responsabilidade fiscal.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 border-t-4 border-blue-900 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl font-bold text-slate-200 mb-2">01</div>
                    <h3 className="text-lg font-bold text-blue-900">PPA (Plano Plurianual)</h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-2">Visão de 4 Anos</p>
                    <p class="text-sm text-slate-600">Define as diretrizes, objetivos e metas estratégicas de médio prazo. É o "Sonho Organizado".</p>
                </div>
                <div className="bg-slate-50 border-t-4 border-blue-700 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl font-bold text-slate-200 mb-2">02</div>
                    <h3 className="text-lg font-bold text-blue-900">LDO (Diretrizes)</h3>
                    <p class="text-xs font-bold text-emerald-600 uppercase mb-2">Metas Anuais</p>
                    <p class="text-sm text-slate-600">Define as prioridades para o ano seguinte e sintoniza o PPA com a realidade fiscal. É o "Filtro".</p>
                </div>
                <div className="bg-slate-50 border-t-4 border-emerald-500 p-6 rounded-xl shadow-sm">
                    <div className="text-4xl font-bold text-slate-200 mb-2">03</div>
                    <h3 className="text-lg font-bold text-blue-900">LOA (Orçamento)</h3>
                    <p class="text-xs font-bold text-emerald-600 uppercase mb-2">Execução Financeira</p>
                    <p class="text-sm text-slate-600">Estima receitas e fixa despesas. É a autorização legislativa para gastar e investir. É a "Ação".</p>
                </div>
            </div>
        </section>

        <section>
            <div className="mb-8 border-l-4 border-yellow-500 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">6. Impacto Económico e Social (Módulos 08 e 09)</h2>
                <p class="text-slate-600 mt-2">
                    A correlação entre Liberdade Económica e Desenvolvimento Social. Dados projetados mostram que desburocratização gera aumento direto no IDH e na Arrecadação Própria.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-emerald-600 w-full">
                <h3 className="text-xl font-bold mb-2 text-blue-900">Correlação: Desburocratização x Receita Própria</h3>
                <div id="scatterDiv" className="w-full h-[400px]"></div>
            </div>
        </section>

        {/* --- FERRAMENTAS INTERATIVAS --- */}

        {/* 7. Simulador de Risco */}
        <section>
            <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">7. Simulador de Risco Jurídico ✨</h2>
                <p class="text-slate-600 mt-2">
                    Consulte o seu Auditor de Compliance virtual. Insira uma ação administrativa (ex: "Contratei uma empresa de limpeza por inexigibilidade") e receba uma avaliação de risco baseada na legislação atualizada.
                </p>
            </div>
            <div className="bg-slate-50 border-t-4 border-blue-900 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-blue-900">Análise de Compliance</h3>
                <textarea ref={riskQueryRef} rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 mb-4" placeholder="Descreva a ação administrativa que deseja avaliar (ex: Decidi não realizar a audiência pública da LDO no prazo)."></textarea>
                <button onClick={performRiskAnalysis} disabled={loading === 'risk'} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                    {loading === 'risk' ? 'Analisando...' : 'Analisar Risco Jurídico ✨'}
                </button>
                {results.risk && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.risk }} />}
            </div>
        </section>

        {/* 8. Gerador de Plano */}
        <section>
            <div className="mb-8 border-l-4 border-blue-900 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">8. Gerador de Plano de Ação Estratégico ✨</h2>
                <p class="text-slate-600 mt-2">Transforme um objetivo de governo num plano de trabalho estruturado, alinhado à metodologia dos 12 módulos.</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-emerald-600 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-4 text-emerald-600">Plano de Implementação Rápida</h3>
                <textarea ref={planQueryRef} rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4" placeholder="Insira seu objetivo (ex: Implementar o Plano de Saneamento Básico)"></textarea>
                <button onClick={generateActionPlan} disabled={loading === 'plan'} className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                    {loading === 'plan' ? 'Estruturando...' : 'Gerar Plano Estratégico ✨'}
                </button>
                {results.plan && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.plan }} />}
            </div>
        </section>

        {/* 9. Auditoria de Planos */}
        <section>
             <div className="mb-8 border-l-4 border-yellow-500 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">9. Auditoria de Planos Municipais (PNRS/PMSB) ✨</h2>
                <p class="text-slate-600 mt-2">Verifique o status de conformidade dos Planos de Saneamento Básico (PMSB) e Resíduos Sólidos (PNRS).</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-yellow-500 p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input ref={cityAuditRef} type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Município (ex: Ouro Preto)"/>
                    <input ref={stateAuditRef} type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Estado (UF - ex: MG)"/>
                </div>
                <button onClick={auditMunicipalPlans} disabled={loading === 'audit'} className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'audit' ? 'Auditando...' : 'Verificar Status de Planos ✨'}
                </button>
                {results.audit && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.audit }} />}
            </div>
        </section>

        {/* 10. Ideias Sustentáveis */}
        <section>
             <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">10. Gerador de Ideias Sustentáveis (ODS) ✨</h2>
                <p class="text-slate-600 mt-2">Gere propostas de projetos inovadores e alinhados aos Objetivos de Desenvolvimento Sustentável (ODS).</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-emerald-600 p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input ref={challengeQueryRef} type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Desafio (ex: Falta de água na zona rural)"/>
                    <select ref={odsSelectRef} className="w-full p-3 border border-slate-300 rounded-lg">
                        <option value="ODS 6: Água Limpa e Saneamento">ODS 6: Água Limpa e Saneamento</option>
                        <option value="ODS 9: Indústria, Inovação e Infraestrutura">ODS 9: Indústria, Inovação e Infraestrutura</option>
                        <option value="ODS 11: Cidades e Comunidades Sustentáveis">ODS 11: Cidades e Comunidades Sustentáveis</option>
                        <option value="ODS 13: Ação Contra a Mudança Global do Clima">ODS 13: Ação Contra a Mudança Global do Clima</option>
                        <option value="ODS 17: Parcerias e Meios de Implementação">ODS 17: Parcerias e Meios de Implementação</option>
                    </select>
                </div>
                <button onClick={generateSustainebleIdea} disabled={loading === 'idea'} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'idea' ? 'Gerando...' : 'Gerar Ideia de Projeto Sustentável ✨'}
                </button>
                {results.idea && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.idea }} />}
            </div>
        </section>

        {/* 11. Engenharia de Liderança */}
        <section>
             <div className="mb-8 border-l-4 border-blue-900 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">11. Engenharia de Liderança Territorial ✨</h2>
                <p class="text-slate-600 mt-2">A multiplicação de liderança é a chave da Engenharia Territorial. Estrutura Núcleo {'>'} Célula {'>'} Pequeno Grupo.</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-blue-900 p-6 rounded-xl shadow-sm">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input ref={cityLeadershipRef} type="text" defaultValue="Cacequi" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Município"/>
                    <input ref={stateLeadershipRef} type="text" defaultValue="RS" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Estado"/>
                </div>
                <button onClick={generateLeadershipStructure} disabled={loading === 'leadership'} className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'leadership' ? 'Estruturando...' : 'Gerar Organograma e Responsabilidades ✨'}
                </button>
                {results.leadership && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.leadership }} />}
            </div>
        </section>

        {/* 12. Assistente Legislativo */}
        <section>
             <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">12. Assistente de Redação de Projeto de Lei ✨</h2>
                <p class="text-slate-600 mt-2">Crie rapidamente um Projeto de Lei (PL) base, incluindo Ementa, Art. 1º e Justificativa.</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-emerald-600 p-6 rounded-xl shadow-sm">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input ref={lawSubjectRef} type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Assunto (ex: Incentivo à Agricultura Familiar)"/>
                    <input ref={lawEffectRef} type="text" className="w-full p-3 border border-slate-300 rounded-lg" placeholder="Efeito (ex: Cria o Programa de Apoio)"/>
                </div>
                <button onClick={draftProjectLaw} disabled={loading === 'law'} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'law' ? 'Redigindo...' : 'Gerar Minuta de Projeto de Lei ✨'}
                </button>
                {results.law && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.law }} />}
            </div>
        </section>

        {/* 13. Orçamento Participativo */}
        <section>
             <div className="mb-8 border-l-4 border-blue-900 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">13. Orçamento Participativo Simplificado ✨</h2>
                <p class="text-slate-600 mt-2">Transforme grandes metas de investimento em linhas orçamentárias concretas (PPA, LDO, LOA).</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-blue-900 p-6 rounded-xl shadow-sm">
                <textarea ref={budgetGoalQueryRef} rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4" placeholder="Meta de investimento (ex: Construir uma UPA e comprar 5 ônibus escolares)."></textarea>
                <button onClick={generateParticipatoryBudget} disabled={loading === 'budget'} className="w-full py-3 bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'budget' ? 'Calculando...' : 'Gerar Estrutura Orçamentária ✨'}
                </button>
                {results.budget && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.budget }} />}
            </div>
        </section>

        {/* 14. Protocolo de Crise */}
        <section>
             <div className="mb-8 border-l-4 border-yellow-500 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">14. Protocolo de Crise e Resiliência ✨</h2>
                <p class="text-slate-600 mt-2">Gere minutas de comunicado oficial de crise. A comunicação rápida é vital para a resiliência urbana.</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-yellow-500 p-6 rounded-xl shadow-sm">
                <textarea ref={crisisScenarioQueryRef} rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 mb-4" placeholder="Descreva o cenário de crise (ex: Chuvas fortes causaram deslizamentos em três bairros)."></textarea>
                <button onClick={generateCrisisProtocol} disabled={loading === 'crisis'} className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'crisis' ? 'Redigindo...' : 'Gerar Comunicado de Crise ✨'}
                </button>
                {results.crisis && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.crisis }} />}
            </div>
        </section>

        {/* 15. Compliance */}
        <section>
             <div className="mb-8 border-l-4 border-emerald-600 pl-4">
                <h2 class="text-3xl font-bold text-slate-900">15. Assistente de Conformidade Empresarial ✨</h2>
                <p class="text-slate-600 mt-2">Apoie parceiros locais, MEIs ou LTDA, a alcançar o Compliance necessário para certificações e parcerias B2G.</p>
            </div>
            <div className="bg-slate-50 border-t-4 border-emerald-600 p-6 rounded-xl shadow-sm">
                <textarea ref={complianceQueryRef} rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 mb-4" placeholder="Insira o desafio de conformidade (ex: Queremos ser um representante local LTDA)."></textarea>
                <button onClick={generateComplianceReport} disabled={loading === 'compliance'} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center justify-center gap-2">
                     {loading === 'compliance' ? 'Auditando...' : 'Gerar Relatório de Conformidade ✨'}
                </button>
                {results.compliance && <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg" dangerouslySetInnerHTML={{ __html: results.compliance }} />}
            </div>
        </section>

    </main>

    <footer className="bg-slate-900 text-white py-12 border-t-8 border-emerald-600">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">CFER-BRASIL & TERRA E FÉ</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                Consultoria em Gestão Pública e Formação de Lideranças. Habilitação Jurídica para contratos B2G.
                CNPJ: 62.162.691/0001-87
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-slate-300 text-left">
                <div>
                    <span className="block font-bold text-white mb-1">Sede Administrativa (MG)</span>
                    Rua Da Bahia 1148, Sala 1208<br/>Belo Horizonte - MG
                </div>
                <div>
                    <span className="block font-bold text-white mb-1">Contacto Principal e Suporte</span>
                    <span className="font-bold text-emerald-400">WhatsApp:</span> <a href="https://wa.me/5551995347903" className="hover:text-white transition">51 99534-7903</a><br/>
                    <span className="font-bold text-slate-300">Tel. Fixo:</span> (41) 9272-1004 (Comercial)
                </div>
                <div>
                    <span className="block font-bold text-white mb-1">Direção Estratégica Remota</span>
                    <span className="font-bold text-emerald-400">Local:</span> Porto Alegre - RS<br/>
                    <span className="text-xs text-slate-400 mt-1 block">Engenharia Territorial e Governança.<br/>Atendimento com agenda prévia.</span>
                </div>
                <div>
                    <span className="block font-bold text-white mb-3">Redes Sociais e Portais</span>
                    <span className="block font-bold text-white mb-2">Sites Oficiais:</span>
                    <a href="https://www.cfer-br.com.br" target="_blank" className="block w-full text-center py-2 mb-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold transition text-sm">
                        CFER-BR (Consultoria)
                    </a>
                    <a href="https://www.terraefe.com.br" target="_blank" className="block w-full text-center py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-bold transition text-sm">
                        TERRA E FÉ (Formação)
                    </a>
                </div>
            </div>
            <div className="mt-8 text-xs text-slate-500 text-center">
                © 2025 Grupo 3ª Via Social. Todos os direitos reservados.
            </div>
        </div>
    </footer>
    </div>
  );
};

export default ManagementPanel;
export type KnowledgeCategory =
  | "perfil"
  | "sobre"
  | "experiencia"
  | "projetos"
  | "habilidades"
  | "formacao"
  | "certificacoes"
  | "contato";

export interface KnowledgeChunk {
  id: string;
  category: KnowledgeCategory;
  title: string;
  content: string;
  /** Link externo asociado ao chunk (projeto, currículo, perfil). */
  url?: string;
  /** id da seção do site para navegação por âncora. */
  anchor?: string;
}

export const KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: "perfil-resumo",
    category: "perfil",
    title: "Resumo profissional",
    anchor: "servicos",
    content: `Paulo Henrique é analista de NOC/SOC e desenvolvedor web, com sede em Brasília (DF) e disponibilidade para trabalho remoto ou híbrido.

Atua com duas frentes complementares: (1) desenvolvimento web com foco em aplicações modernas, integração de APIs e automação; (2) monitoramento e segurança da informação, com experiência de NOC em ambientes corporativos críticos.

Sua bagagem em NOC traz uma visão estruturada de troubleshooting, análise de logs, causa raiz e gestão de incidentes por SLA, que ele aplica diretamente ao desenvolvimento de software. Usa IA generativa e ferramentas como OpenCode como apoio ao desenvolvimento, debugging, otimização de código e aprendizado contínuo.

Áreas de interesse declaradas: Segurança da Informação, Análise de Dados com Python, Monitoramento e análise de logs (NOC/SOC).`,
  },
  {
    id: "perfil-dev-web",
    category: "perfil",
    title: "Atuação em desenvolvimento web",
    anchor: "servicos",
    content: `Desenvolvedor web focado em aplicações modernas, integração de APIs e soluções com Next.js, React, TypeScript, Python e SQL.

Constrói interfaces responsivas, componentizadas e prontas para produção, faz deploy em produção na Vercel e versiona tudo com Git/GitHub. Busca transformar conhecimento em aplicações funcionais, responsivas e de qualidade.

Posicionamento atual no mercado: Desenvolvedor Web Júnior, com transição para-analysis de dados e segurança aplicada.`,
  },
  {
    id: "perfil-posicionamento",
    category: "perfil",
    title: "Disponibilidade, localização e formatos de trabalho",
    content: `Localidade: Brasília - DF.

Disponibilidade: trabalho remoto ou híbrido.

Contato comercial e profissional:
- E-mail: paulo.analise90@gmail.com
- E-mail alternativo presente nos currículos: paulo.analise@gmail.com
- Telefone/WhatsApp: (61) 99289-0326
- LinkedIn: https://www.linkedin.com/in/paulo-heenrique1990/
- GitHub: https://github.com/doggbeats
- Portfólio: https://portifolio-cyber.vercel.app/`,
  },
  {
    id: "sobre-texto",
    category: "sobre",
    title: "Sobre mim",
    anchor: "servicos",
    content: `Olá! Meu nome é Paulo Henrique, sou profissional de tecnologia com foco em Desenvolvimento Web e criação de aplicações modernas.

Tenho experiência com Next.js, React, TypeScript, JavaScript, Tailwind CSS, Python, SQL e integração de APIs, além de Git/GitHub e deploy em produção.

Também utilizo IA Generativa e ferramentas como OpenCode como apoio ao desenvolvimento, debugging, otimização de código e aprendizado contínuo.

Minha experiência em NOC contribui para uma visão estruturada de troubleshooting, análise de logs e resolução de problemas. Busco transformar conhecimento em aplicações funcionais, responsivas e de qualidade.`,
  },
  {
    id: "sobre-evolucao",
    category: "sobre",
    title: "Evolução como profissional de tecnologia",
    content: `Começou com um primeiro portfólio em HTML5, CSS3 e JavaScript puro, onde o desafio era fazer a página funcionar.

Hoje aplica Next.js com Tailwind CSS, usando IA generativa como apoio no desenvolvimento e performando deploy em produção na Vercel.

O portfólio atual representa o que ele aprendeu na prática: organização de um projeto React/Next.js, componentização e responsividade com Tailwind, processo de build e deploy em produção, diferença entre rodar localmente e rodar em ambiente real, e uso de IA como ferramenta de produtividade e aprendizado.

Durante o deploy enfrentou erros de build, problemas de caminhos de arquivos, ajustes de estrutura e configurações até o projeto funcionar corretamente na Vercel. Describe esse processo como o principal agregador de conhecimento.`,
  },
  {
    id: "exp-sonda-it",
    category: "experiencia",
    title: "SONDA IT — Analista de Monitoramento NOC (2021–2025)",
    content: `Período: 2021 a 2025 (aproximadamente 4 anos).
Cargo: Analista de Monitoramento e Segurança / NOC.

Atividades e responsabilidades:
- Monitoramento contínuo e 24x7 de ambientes críticos de TI, incluindo infraestrutura, servidores e aplicações.
- Acompanhamento de disponibilidade de servidores, aplicações e infraestrutura.
- Análise e tratativa de alertas operacionais e eventos.
- Identificação de falhas recorrentes através de análise de eventos e logs.
- Gestão de incidentes conforme SLA, com triagem, investigação e priorização por impacto e matriz de risco.
- Acompanhamento rigoroso do cumprimento dos prazos de SLA.
- Escalonamento técnico para equipes responsáveis de Infraestrutura, Redes, Sistemas e Banco de Dados.
- Acompanhamento de indisponibilidades e degradações de serviço.
- Atuação preventiva baseada em padrões observados em alertas e logs.
- Registro detalhado de ocorrências e eventos, documentando incidentes para sustentar a disponibilidade e estabilidade dos serviços.

Ferramentas e ambientes: Grafana, Zabbix, Nagios, Windows Server, Active Directory, Microsoft Exchange, Microsoft 365, VMware, Microsoft Azure.

Resultado principal: análise de logs e causa raiz, inspecionando e correlacionando eventos e logs de sistemas e redes para isolar incidentes de infraestrutura e potenciais falhas de segurança.`,
  },
  {
    id: "exp-sesdf",
    category: "experiencia",
    title: "SESDF — Hospital Regional de Brazlândia, Coordenador de TI (2015–2022)",
    content: `Órgão: SESDF - Hospital Regional de Brazlândia (HRBZ).
Período: 2015 a 2022.
Cargo: Coordenador de Tecnologia da Informação / Coordenador de Suporte.

Responsabilidades:
- Coordenação das atividades da equipe de suporte técnico.
- Coordenação do atendimento técnico aos usuários e da distribuição e acompanhamento de chamados.
- Gestão de rotinas de suporte técnico e governança de chamados em ambiente de alta exigência operacional.
- Resolução de incidentes de média e alta complexidade, reduzindo o tempo médio de atendimento (MTTR).
- Apoio técnico aos analistas de suporte em diagnósticos complexos.
- Interface entre as equipes de Suporte, Infraestrutura e usuários finais.
- Suporte a aplicações corporativas.
- Padronização de registros e procedimentos de atendimento.
- Padronização de procedimentos operacionais (SOP), documentação técnica de infraestrutura e melhoria contínua de rotinas operacionais.
- Orientação da equipe quanto às melhores práticas de suporte e segurança.`,
  },
  {
    id: "exp-resumo-noc",
    category: "experiencia",
    title: "Resumo das competências de NOC",
    content: `Competências consolidadas em monitoramento:
- Monitoramento contínuo de ambientes críticos de TI.
- Análise e tratativa de alertas operacionais.
- Gestão de incidentes conforme SLA.
- Escalonamento técnico para equipes responsáveis.
- Identificação de falhas recorrentes através de análise de eventos.
- Acompanhamento de indisponibilidades e degradações de serviço.
- Atuação preventiva baseada em padrões observados em alertas e logs.
- Registro detalhado de ocorrências e eventos.
- Tratativa de alertas e eventos de criticidade alta.
- Conformidade e acompanhamento de SLAs.
- Identificação de anomalias.`,
  },
  {
    id: "proj-verificador-links",
    category: "projetos",
    title: "Projeto: Verificador de Links com Análise de Segurança",
    anchor: "projetos",
    url: "https://verificar-links.vercel.app/",
    content: `Nome também citado nos currículos como "Link Checker - Analisador de Links".
Status: Concluído.
Link: https://verificar-links.vercel.app/

Descrição: aplicação web para análise e identificação de riscos em URLs, com foco em segurança, automação e experiência do usuário. Identifica possíveis ameaças como phishing e sites maliciosos.

Stack: Next.js, React, TypeScript, Tailwind CSS, Python, FastAPI, Git/GitHub, Vercel, Google Safe Browsing API.

Implementação:
- Desenvolvimento da interface utilizando Next.js, React e TypeScript.
- Componentes reutilizáveis e arquitetura baseada em componentes.
- Implementação de análise de URLs e identificação de possíveis riscos.
- Integração com API de segurança para verificação de links (Google Safe Browsing API).
- Backend com Python e FastAPI.
- Criação de dashboard para apresentação dos resultados da análise.
- Interface responsiva para desktop e dispositivos móveis.
- Versionamento do projeto com Git/GitHub.
- Deploy da aplicação em ambiente de produção utilizando Vercel.`,
  },
  {
    id: "proj-vizion-store",
    category: "projetos",
    title: "Projeto: E-commerce VIZION Store",
    anchor: "projetos",
    url: "https://vizion-leads.vercel.app/",
    content: `Nome: VIZION STORE - Streetwear Premium, moda masculina.
Link: https://vizion-leads.vercel.app/

Descrição: e-commerce de moda masculina desenvolvido com foco em experiência do usuário, responsividade e organização de componentes.

Stack: Next.js, React, TypeScript, Tailwind CSS, Git/GitHub, Vercel.

Funcionalidades:
- Catálogo e categorias de produtos.
- Navegação responsiva.
- Painel administrativo e dashboard.
- Gerenciamento de clientes, pedidos, compras e estoque.

Implementação:
- Desenvolvimento da interface utilizando Next.js e React.
- Criação de componentes reutilizáveis.
- Implementação de catálogo e categorias de produtos.
- Desenvolvimento de páginas responsivas para desktop e dispositivos móveis.
- Organização do projeto utilizando arquitetura baseada em componentes.
- Versionamento com Git/GitHub.
- Publicação da aplicação em ambiente de produção.`,
  },
  {
    id: "proj-sistema-recrutamento",
    category: "projetos",
    title: "Projeto: Sistema de Recrutamento e Gestão de Vagas",
    anchor: "projetos",
    url: "https://anapaularh.vercel.app/",
    content: `Nome: RecrutaAna.
Link: https://anapaularh.vercel.app/

Descrição: aplicação para gestão de processos de recrutamento e análise de candidatos.

Stack: Next.js, React, TypeScript, Tailwind CSS.

Objetivo: conectar talentos às oportunidades, com foco em gestão de vagas e análise de candidatos.`,
  },
  {
    id: "proj-landing-recruta",
    category: "projetos",
    title: "Projeto: Landing Page Recruta RH",
    anchor: "projetos",
    url: "https://recrutarh.vercel.app/",
    content: `Nome: RECRUTA RH - "Conectando talentos às melhores oportunidades!".
Link: https://recrutarh.vercel.app/

Descrição: landing page institutional voltada ao recrutamento, com foco em apresentação da marca e captação de candidatos.`,
  },
  {
    id: "proj-analisador-logs",
    category: "projetos",
    title: "Projeto: Analisador de Logs com Python",
    anchor: "projetos",
    content: `Descrição: projeto em Python para simular o monitoramento de logs em sistemas críticos.

Objetivo: entender como eventos de sistemas reais geram alertas e praticar automação de tarefas.

Relação com a área de NOC: demonstra interesse direto em monitoramento de logs e automação aplicada a ambientes críticos.`,
  },
  {
    id: "proj-analise-dados",
    category: "projetos",
    title: "Projeto: Análise de Dados com Python usando pandas",
    anchor: "projetos",
    url: "https://colab.research.google.com/drive/1ZC-sOWrHexxQo2fCOyz-gWwK236iXhuP",
    content: `Descrição: análise de dados usando a biblioteca pandas e matplotlib.pyplot.

Objetivo: analisar a quantidade de mortes por estado.

Stack: Python, pandas, matplotlib.pyplot, Google Colab.

Demonstra a transição da área de monitoramento para análise de dados.`,
  },
  {
    id: "proj-portfolio",
    category: "projetos",
    title: "Projeto: Este portfólio com assistente de IA (RAG)",
    anchor: "projetos",
    url: "https://portifolio-cyber.vercel.app/",
    content: `Este próprio site é um projeto: portfólio pessoal em Next.js, React, TypeScript e Tailwind CSS, com Particles.js no fundo, animações on-scroll e deploy na Vercel.

Destaque técnico: um assistente virtual que responde perguntas sobre o perfil, a experiência, os projetos e as tecnologias. O assistente usa RAG (Retrieval-Augmented Generation): a pergunta do visitante é transformada em embedding, comparada por similaridade de cosseno contra os embeddings da base de conhecimento (perfil, currículo, projetos e habilidades) e os trechos mais relevantes são injetados no prompt como contexto antes da geração da resposta.

Os embeddings são gerados em tempo de build pelo Vercel AI Gateway e persistidos em cache local, evitando custo e latência em runtime. A geração usa o endpoint de chat completions do AI Gateway com resposta em streaming.`,
  },
  {
    id: "hab-web",
    category: "habilidades",
    title: "Habilidades: desenvolvimento web e frontend",
    anchor: "processo",
    content: `Níveis de domínio declarados no portfólio:
- Next.js - 80%. Desenvolvimento de aplicações web modernas.
- React - 75%. Interfaces e componentes reutilizáveis.
- TypeScript - 70%. Desenvolvimento com tipagem e código escalável.
- JavaScript - 70%. Lógica e desenvolvimento de aplicações web.
- HTML5 - 80%. Estruturação semântica de páginas web.
- CSS3 - 75%. Estilização e desenvolvimento responsivo.
- Tailwind CSS - 75%. Interfaces modernas e responsivas.

Também pratica: arquitetura baseada em componentes, responsividade (desktop e mobile), React Server Components e boas práticas de acessibilidade de interface.`,
  },
  {
    id: "hab-dados-automacao",
    category: "habilidades",
    title: "Habilidades: dados, automação e APIs",
    anchor: "processo",
    content: `Níveis de domínio declarados no portfólio:
- APIs - 70%. Integração e consumo de APIs.
- Python - 65%. Automação, scripts e integração com APIs.
- SQL - 65%. Consultas e manipulação de dados.
- Power BI - 50%. Dashboards e análise de dados.

Detalhamento:
- Python: automação, scripts, integração com APIs, FastAPI para backends, análise de dados com pandas e matplotlib.
- SQL: SQL intermediário para análise de dados, do básico ao avançado.
- Power BI: dashboards e análise de dados, incluindo linguagem DAX.
- Integração de APIs de terceiros, como Google Safe Browsing API no Verificador de Links.`,
  },
  {
    id: "hab-infra-noc",
    category: "habilidades",
    title: "Habilidades: infraestrutura, NOC e segurança",
    content: `Ferramentas e plataformas de monitoramento e infraestrutura:
- Zabbix: monitoramento de ambientes críticos.
- Grafana: visualização e acompanhamento de disponibilidade e alertas.
- Nagios: monitoramento de infraestrutura e serviços.

Ambientes e technologies corporativas:
- Windows Server, Active Directory, Microsoft Exchange, Microsoft 365, VMware, Microsoft Azure.

Práticas de segurança e operações:
- Monitoramento 24x7 (NOC) e triagem de alertas.
- Análise de logs e correlação de eventos para causa raiz.
- Gestão de incidentes por impacto, matriz de risco e SLA.
- Escalonamento para equipes N2/N3 de Infraestrutura, Redes, Sistemas e Segurança.
- Hardening de segurança.
- Conhecimento de Ethical Hacking com Kali Linux.`,
  },
  {
    id: "hab-versionamento-ia",
    category: "habilidades",
    title: "Habilidades: versionamento, deploy e IA generativa",
    anchor: "processo",
    content: `Níveis de domínio declarados no portfólio:
- Git - 75%. Versionamento e gerenciamento de projetos.
- OpenCode - 70%. Apoio ao desenvolvimento e debugging.
- IA Generativa - 70%. Apoio à programação e produtividade.

Detalhamento:
- Git/GitHub para versionamento de todos os projetos, com deploy em produção na Vercel.
- OpenCode e IA generativa como apoio ao desenvolvimento, debugging, otimização de código, produtividade e aprendizado contínuo.
- Vercel para build e publicação de aplicações em produção.`,
  },
  {
    id: "formacao",
    category: "formacao",
    title: "Formação acadêmica",
    content: `Formação concluída:
- Tecnólogo em Desenvolvimento Web - Faculdade UNOPAR, Brasília/DF. Período: 2022 a 2024.

Pós-graduações em andamento:
- Pós-graduação em Cibersegurança - Faculdade LIBANO. Status: em andamento.
- Pós-graduação em Análise de Dados - Faculdade LIBANO. Status: em andamento.

Cursos de graduação complementares:
- Introdução à análise de dados com Python - Faculdade UNOPAR.`,
  },
  {
    id: "certificacoes",
    category: "certificacoes",
    title: "Certificações",
    content: `Certificações principais:
- ISO/IEC 27001:2022 Information Security Associate - Skillfront.
- ISO 9001 Quality Management Systems Associate - Skillfront.
- Scrum Foundation Professional Certificate (SFPC) - Certiprof.
- Remote Work Professional Certification (RWPC) - Certiprof.

Cursos e certificações complementares:
- Monitoramento com Zabbix - Udemy.
- Introdução à Cibersegurança - Cisco Networking Academy.
- SQL para Análise de Dados, do básico ao avançado - Udemy.
- Cybersegurança: Do Zero ao Kali Linux (Ethical Hacking) - Udemy.
- Python para Data Science - Udemy.
- Power BI + DAX + Projetos na prática - Udemy.
- Defensive Security Operations - Certificate Cebrary.`,
  },
  {
    id: "contato",
    category: "contato",
    title: "Canais de contato",
    anchor: "contact",
    content: `E-mail principal (site): paulo.analise90@gmail.com
E-mail alternativo (currículos): paulo.analise@gmail.com
Telefone/WhatsApp: (61) 99289-0326

Redes e Links:
- LinkedIn: https://www.linkedin.com/in/paulo-heenrique1990/
- GitHub: https://github.com/doggbeats
- Portfólio: https://portifolio-cyber.vercel.app/
- Currículo em PDF: /Curriculo_atualizado2026.pdf

Localidade: Brasília - DF. Disponível para trabalho remoto ou híbrido.`,
  },
];

/** Nomes das seções do site, para o modelo sugerir navegação. */
export const SECTION_ANCHORS: Record<string, string> = {
  perfil: "servicos",
  sobre: "servicos",
  experiencia: "servicos",
  projetos: "projetos",
  habilidades: "processo",
  formacao: "processo",
  certificacoes: "processo",
  contato: "contact",
};

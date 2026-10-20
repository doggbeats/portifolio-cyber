import { Activity, Building2, Server, ShieldCheck } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const roles = [
  {
    company: "SONDA IT",
    title: "Analista de Monitoramento NOC",
    period: "2021 – 2025",
    icon: <Activity size={22} />,
    summary:
      "Monitoramento 24x7 de infraestruturas corporativas críticas, com foco em alta disponibilidade e reação rápida a anomalias.",
    highlights: [
      {
        label: "Monitoramento e alertas",
        text: "Acompanhamento de servidores e aplicações via Grafana, Zabbix e Nagios.",
      },
      {
        label: "Gestão de incidentes e SLA",
        text: "Triagem e priorização por impacto e matriz de risco, com acompanhamento rigoroso dos prazos de SLA.",
      },
      {
        label: "Análise de logs e causa raiz",
        text: "Correlação de eventos e logs de sistemas e redes para isolar incidentes de infraestrutura e potenciais falhas de segurança.",
      },
      {
        label: "Escalonamento e suporte",
        text: "Acionamento e suporte operacional a equipes N2/N3 de Infraestrutura, Redes, Sistemas e Segurança.",
      },
    ],
    stack: [
      "Grafana",
      "Zabbix",
      "Nagios",
      "Windows Server",
      "Active Directory",
      "VMware",
      "Azure",
      "Microsoft 365",
    ],
  },
  {
    company: "SESDF — Hospital Regional de Brazlândia",
    title: "Coordenador de TI / Suporte",
    period: "2015 – 2022",
    icon: <Server size={22} />,
    summary:
      "Coordenação das rotinas de suporte técnico e governança de chamados em ambiente de alta exigência operacional.",
    highlights: [
      {
        label: "Gestão de chamados",
        text: "Recebimento, registro, classificação, acompanhamento e encerramento de chamados técnicos.",
      },
      {
        label: "Suporte ao usuário",
        text: "Atendimento por telefone, e-mail, acesso remoto e presencial.",
      },
      {
        label: "Instalação e manutenção",
        text: "Configuração e manutenção de Windows, Linux, sistemas, aplicativos e equipamentos de TI.",
      },
      {
        label: "Diagnóstico de incidentes",
        text: "Resolução de incidentes de hardware, software, redes e conectividade, reduzindo o tempo médio de atendimento (MTTR).",
      },
      {
        label: "Infraestrutura de rede",
        text: "Configuração de equipamentos de rede, videoconferência, IP, switches, racks e periféricos.",
      },
      {
        label: "Gestão de ativos",
        text: "Atualização de dados de usuários e ativos nos sistemas corporativos.",
      },
      {
        label: "Segurança da informação",
        text: "Tratamento e limpeza segura de mídias e dados sensíveis.",
      },
      {
        label: "Documentação e SOPs",
        text: "Documentação técnica e padronização de procedimentos operacionais.",
      },
    ],
    stack: [
      "Windows",
      "Linux",
      "Redes",
      "IP",
      "Videoconferência",
      "Switches",
      "Racks",
    ],
  },
  {
    company: "IFB — Instituto Federal de Brasília (Estágio)",
    title: "TI / Infraestrutura / Suporte",
    period: "Jan 2013 – Fev 2014",
    icon: <Building2 size={22} />,
    summary:
      "Atendimento de suporte técnico, manutenção de redes e estações de trabalho em ambiente corporativo.",
    highlights: [
      {
        label: "Suporte nível 1 ",
        text: "Atendimento a chamados de suporte técnico com foco em pacote Office, configurações de impressoras e demandas gerais de usuários.",
      },
      {
        label: "Montagem e manutenção de hardware",
        text: "Montagem, configuração e manutenção de micros, impressoras e periféricos.",
      },
      {
        label: "Redes wireless e cabeadas",
        text: "Instalação, configuração e manutenção, incluindo diagnóstico de falhas e melhoria de desempenho.",
      },
      {
        label: "Backup e recuperação",
        text: "Implementação e manutenção de soluções de backup, garantindo proteção e recuperação de dados críticos.",
      },
      {
        label: "Contas de usuários",
        text: "Administração e gerenciamento de contas em ambientes corporativos (AD/Exchange).",
      },
      {
        label: "Impressoras em rede",
        text: "Configuração e manutenção de impressoras em rede e dispositivos compartilhados.",
      },
      {
        label: "Monitoramento de rede",
        text: "Monitoramento de rede e suporte em incidentes, garantindo continuidade operacional.",
      },
      {
        label: "Sistemas operacionais e softwares",
        text: "Instalação e configuração de Windows e Linux, além de softwares corporativos.",
      },
      {
        label: "Documentação técnica",
        text: "Elaboração e atualização de documentação técnica para padronização e organização da infraestrutura.",
      },
    ],
    stack: [
      "Office",
      "Windows",
      "Linux",
      "Active Directory",
      "Exchange",
      "Redes",
      "Backup",
      "Impressoras",
    ],
  },
];

const Experiencia = () => {
  return (
    <section className="py-24 border-t border-white/10">
      <AnimateOnScroll animation="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-white">Experience</h2>
          <p className="text-white mt-2">
            Monitoramento, gestão de incidentes e suporte operacional em
            ambientes corporativos críticos
          </p>
        </div>
      </AnimateOnScroll>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-2 top-3 bottom-3 w-px bg-white/10" />

        <div className="flex flex-col gap-10">
          {roles.map((role, index) => (
            <AnimateOnScroll
              key={role.company}
              animation="fade-up"
              delay={Math.min(index * 150, 450)}
              className="relative pl-10"
            >
              <span className="absolute left-0 top-3 flex h-4 w-4 items-center justify-center rounded-full border border-[#a5c9ff] bg-[#0a0a0a]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a5c9ff]" />
              </span>

              <article className="rounded-2xl border border-white/10 bg-[#151515] p-6 transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-[#a5c9ff]">{role.icon}</div>
                  <h3 className="text-xl font-semibold text-white">
                    {role.company}
                  </h3>
                  <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/70">
                    {role.period}
                  </span>
                </div>

                <p className="mt-1 text-sm text-[#a5c9ff]">{role.title}</p>
                <p className="mt-3 text-white text-sm leading-relaxed">
                  {role.summary}
                </p>

                <ul className="mt-4 space-y-3">
                  {role.highlights.map((item) => (
                    <li key={item.label} className="flex gap-3 text-sm">
                      <ShieldCheck
                        size={16}
                        className="mt-1 shrink-0 text-[#a5c9ff]"
                      />
                      <span>
                        <span className="font-semibold text-white">
                          {item.label}:{" "}
                        </span>
                        <span className="text-white/80">{item.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {role.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiencia;

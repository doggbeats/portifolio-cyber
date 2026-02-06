// FERRAMENTAS QUE UTILIZO
import { Code, Database, GitBranch, Zap, BarChart2 } from 'lucide-react';

const tools = [
  { name: 'Python', icon: <Code size={24} />, level: 80, description: 'Automação, análise de dados e scripts' },
  { name: 'SQL', icon: <Database size={24} />, level: 70, description: 'Consultas, manipulação e análise de dados' },
  { name: 'Git', icon: <GitBranch size={24} />, level: 75, description: 'Controle de versão e colaboração' },
  { name: 'Next.js', icon: <Zap size={24} />, level: 65, description: 'Desenvolvimento de front-end moderno' },
  { name: 'APIs', icon: <Zap size={24} />, level: 60, description: 'Integração e consumo de APIs' },
  { name: 'Power BI', icon: <BarChart2 size={24} />, level: 70, description: 'Criação de dashboards e análise visual de dados' },
];

const Ferramentas = () => {
  return (
    <section id='Processo' className="py-24 border-t border-white/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-white">Ferramentas que utilizo</h2>
        <p className="text-gray-400 mt-2">Experiência prática nas tecnologias que aplico em projetos de dados e automação</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-[#151515] p-6 rounded-2xl flex flex-col gap-4 hover:scale-[1.03] transition-transform duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="text-[#a5c9ff]">{tool.icon}</div>
              <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
            </div>
            <p className="text-gray-400 text-sm">{tool.description}</p>

            {/* Barra de proficiência */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="h-2 bg-[#a5c9ff] rounded-full transition-all duration-1000"
                style={{ width: `${tool.level}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs mt-1">{tool.level}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ferramentas;

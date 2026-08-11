// FERRAMENTAS QUE UTILIZO
import { Code, Database, GitBranch, Zap, BarChart2 } from 'lucide-react';

const tools = [
  { name: 'Next.js', icon: <Zap size={24} />, level: 80, description: 'Desenvolvimento de aplicações web modernas' },
  { name: 'React', icon: <Code size={24} />, level: 75, description: 'Interfaces e componentes reutilizáveis' },
  { name: 'TypeScript', icon: <Code size={24} />, level: 70, description: 'Desenvolvimento com tipagem e código escalável' },
  { name: 'JavaScript', icon: <Code size={24} />, level: 70, description: 'Lógica e desenvolvimento de aplicações web' },
  { name: 'HTML5', icon: <Code size={24} />, level: 80, description: 'Estruturação semântica de páginas web' },
  { name: 'CSS3', icon: <Code size={24} />, level: 75, description: 'Estilização e desenvolvimento responsivo' },
  { name: 'Tailwind CSS', icon: <Code size={24} />, level: 75, description: 'Interfaces modernas e responsivas' },
  { name: 'Git', icon: <GitBranch size={24} />, level: 75, description: 'Versionamento e gerenciamento de projetos' },
  { name: 'APIs', icon: <Zap size={24} />, level: 70, description: 'Integração e consumo de APIs' },
  { name: 'Python', icon: <Code size={24} />, level: 65, description: 'Automação, scripts e integração com APIs' },
  { name: 'SQL', icon: <Database size={24} />, level: 65, description: 'Consultas e manipulação de dados' },
  { name: 'OpenCode', icon: <Code size={24} />, level: 70, description: 'Apoio ao desenvolvimento e debugging' },
  { name: 'IA Generativa', icon: <Zap size={24} />, level: 70, description: 'Apoio à programação e produtividade' },
  { name: 'Power BI', icon: <BarChart2 size={24} />, level: 50, description: 'Dashboards e análise de dados' },
];

const Ferramentas = () => {
  return (
    <section id='Processo' className="py-24 border-t border-white/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-semibold text-white">Ferramentas que utilizo</h2>
        <p className="text-white mt-2">Experiência prática nas tecnologias que aplico em projetos de dados e automação</p>
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
            <p className="text-white text-sm">{tool.description}</p>

            {/* Barra de proficiência */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="h-2 bg-[#a5c9ff] rounded-full transition-all duration-1000"
                style={{ width: `${tool.level}%` }}
              />
            </div>
            <span className="text-white text-xs mt-1">{tool.level}%</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ferramentas;


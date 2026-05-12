import { Award, Briefcase, TrendingUp, Users } from "lucide-react";

export function MetricsSection() {
  const metrics = [
    {
      icon: Briefcase,
      value: "200+",
      label: "Proyectos completados",
      color: "bg-[#B8A2FF]/20 text-[#253AB2]",
    },
    {
      icon: Users,
      value: "100+",
      label: "Clientes satisfechos",
      color: "bg-[#FFB2F7]/20 text-[#253AB2]",
    },
    {
      icon: Award,
      value: "5+",
      label: "Años de experiencia",
      color: "bg-[#C0E0FF]/40 text-[#253AB2]",
    },
    {
      icon: TrendingUp,
      value: "98%",
      label: "Tasa de satisfacción",
      color: "bg-[#E3FC87]/30 text-[#253AB2]",
    },
  ];

  return (
    <section id="metricas" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      {/* Organic background blob */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-[#AB9DFF]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index}
                className="text-center space-y-4 p-8 rounded-[30px] bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-50"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${metric.color} rounded-2xl`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl text-[#AB9DFF]">
                  {metric.value}
                </div>
                <p className="text-gray-600 text-sm">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import { Search, Palette, Layout, Code2 } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: Search,
      title: "UX Research",
      description: "Investigación profunda del usuario para entender necesidades reales y diseñar soluciones efectivas.",
      color: "bg-[#253AB2]",
      bgColor: "bg-[#C0E0FF]/30",
    },
    {
      icon: Palette,
      title: "UI Design",
      description: "Interfaces visuales atractivas y consistentes que reflejan la identidad de tu marca.",
      color: "bg-[#FFB2F7]",
      bgColor: "bg-[#FFB2F7]/20",
    },
    {
      icon: Layout,
      title: "Prototipado",
      description: "Prototipos interactivos de alta fidelidad para validar ideas antes del desarrollo.",
      color: "bg-[#AB9DFF]",
      bgColor: "bg-[#B8A2FF]/20",
    },
    {
      icon: Code2,
      title: "Desarrollo de interfaces",
      description: "Implementación de diseños con código limpio, responsive y optimizado.",
      color: "bg-[#E3FC87]",
      bgColor: "bg-[#E3FC87]/30",
    },
  ];

  return (
    <section
      id="servicios"
      className="scroll-mt-24 py-20 bg-gradient-to-br from-[#C0E0FF]/20 via-[#FFB2F7]/10 to-white relative overflow-hidden"
    >
      {/* Organic decorative shapes */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-96 h-96 bg-[#AB9DFF]/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Servicios <span className="text-[#AB9DFF]">especializados</span>
          </h2>
          <p className="text-lg text-gray-600">
            Ofrezco soluciones integrales de diseño UX/UI adaptadas a las necesidades de tu proyecto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className={`${service.bgColor} rounded-[30px] p-8 hover:shadow-2xl transition-all duration-300 border border-white hover:-translate-y-2`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${service.color} rounded-2xl mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
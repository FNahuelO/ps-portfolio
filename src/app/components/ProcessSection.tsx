import { Search, Pencil, Palette, CheckCircle, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Investigación",
      description: "Entiendo a los usuarios, analizo el mercado y defino objetivos claros del proyecto.",
      color: "#253AB2",
    },
    {
      icon: Pencil,
      number: "02",
      title: "Wireframe",
      description: "Creo la estructura y flujos de navegación priorizando la funcionalidad y usabilidad.",
      color: "#B8A2FF",
    },
    {
      icon: Palette,
      number: "03",
      title: "UI Design",
      description: "Diseño interfaces visuales atractivas aplicando principios de diseño y consistencia.",
      color: "#FFB2F7",
    },
    {
      icon: CheckCircle,
      number: "04",
      title: "Testing",
      description: "Valido con usuarios reales, itero y optimizo para garantizar la mejor experiencia.",
      color: "#E3FC87",
    },
  ];

  return (
    <section id="proceso" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      {/* Organic decorative shapes */}
      <div className="pointer-events-none absolute top-1/4 left-0 w-96 h-96 bg-[#AB9DFF]/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Mi proceso de <span className="text-[#AB9DFF]">trabajo</span>
          </h2>
          <p className="text-lg text-gray-600">
            Un enfoque estructurado y colaborativo para crear productos digitales exitosos
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative bg-white rounded-[30px] p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-6">
                  {/* Number & Icon */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="text-2xl px-3 py-1 rounded-xl text-white inline-block"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </span>
                      <h3 className="text-xl">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-[#AB9DFF]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
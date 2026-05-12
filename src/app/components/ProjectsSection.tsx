import { ArrowRight } from "lucide-react";
import { mailtoSubject } from "../site";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectsSection() {
  const projects = [
    {
      title: "App de Fitness & Wellness",
      description: "Diseño completo de app móvil para seguimiento de actividad física y hábitos saludables.",
      image: "https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc0ODIyMTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["UX Research", "UI Design", "Mobile"],
      bgColor: "bg-[#C0E0FF]/30",
    },
    {
      title: "Dashboard Analytics SaaS",
      description: "Plataforma de análisis de datos con visualizaciones interactivas y reportes personalizados.",
      image: "https://images.unsplash.com/photo-1771922748624-b205cf5d002d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQ4OTk4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["Dashboard", "Data Viz", "Web"],
      bgColor: "bg-[#FFB2F7]/20",
    },
    {
      title: "E-commerce de Moda",
      description: "Rediseño completo de la experiencia de compra para marca de moda sostenible.",
      image: "https://images.unsplash.com/photo-1750056393288-fd4a4a77cae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aSUyMHV4JTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3NDgxNzE5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["E-commerce", "Responsive", "Branding"],
      bgColor: "bg-[#B8A2FF]/20",
    },
  ];

  return (
    <section id="proyectos" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Proyectos <span className="text-[#AB9DFF]">destacados</span>
          </h2>
          <p className="text-lg text-gray-600">
            Casos de estudio que demuestran mi enfoque en resultados y experiencia del usuario
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group"
            >
              <div className={`${project.bgColor} rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white p-6`}>
                <div className="relative overflow-hidden rounded-[30px] aspect-[4/3] mb-6">
                  <ImageWithFallback 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-white text-[#253AB2] rounded-full text-xs shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  
                  <Button
                    asChild
                    variant="ghost"
                    className="group/btn text-[#AB9DFF] hover:text-[#253AB2] p-0 h-auto"
                  >
                    <a
                      href={mailtoSubject(`Caso de estudio: ${project.title}`)}
                    >
                      Ver caso de estudio
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
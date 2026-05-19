import { ArrowRight } from "lucide-react";
import { mailtoSubject } from "../site";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectsSection() {
  const projects = [
    {
      title: "Trabajo Ya",
      description: "Plataforma de empleo en Argentina que conecta personas y empresas de forma simple, rápida y 100% digital.",
      image: "/trabajoya.png",
      tags: ["UX Research", "UI Design", "Mobile", "Dashboard"],
      bgColor: "bg-[#C0E0FF]/30",
      url: "https://web.trabajo-ya.com",
    },
    {
      title: "CEPPA",
      description: "Diseño completo de plataforma web y mobile para el Centro de Psicoterapias.",
      image: "/ceppa.png",
      tags: ["Dashboard", "Web"],
      bgColor: "bg-[#FFB2F7]/20",
      url: "https://ceppa.com.ar",
    },
    {
      title: "Sistema de Gestión de Citas",
      description: "Plataforma completa de gestión de citas con app móvil y panel administrativo web.",
      image: "/barberia.png",
      tags: ["Dashboard", "Web"],
      bgColor: "bg-[#B8A2FF]/20",
      url: "https://www.figma.com/design/wbWjZJPCE1RmK1ehpjCnGx/Gestionador-de-Citas-Barberia?node-id=0-1&p=f&t=RWtoda1MvCF6p5F4-0",
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
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                      href={project.url}
                      target="_blank"
                    >
                      Ver proyecto
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
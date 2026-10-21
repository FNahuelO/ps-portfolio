import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { listPublishedProjects, type Project } from "../../lib/projects";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    listPublishedProjects()
      .then((data) => {
        setProjects(data);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

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

        {status === "error" && (
          <p className="text-center text-gray-500">
            No pudimos cargar los proyectos en este momento.
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {status === "loading" &&
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="rounded-[40px] h-[460px]" />
            ))}
          {projects.map((project) => (
            <div
              key={project.id}
              className="group"
            >
              <div className={`${project.bg_color} rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white p-6`}>
                <div className="relative overflow-hidden rounded-[30px] aspect-[4/3] mb-6">
                  <ImageWithFallback
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(project.tags ?? []).map((tag, tagIndex) => (
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
                      rel="noreferrer"
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
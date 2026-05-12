import { ArrowRight } from "lucide-react";
import { mailtoSubject } from "../site";
import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="scroll-mt-24 relative overflow-hidden bg-gradient-to-br from-[#C0E0FF]/30 via-white to-[#B8A2FF]/20 pt-32 pb-40"
    >
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-6 py-3 bg-white text-[#253AB2] rounded-full text-sm shadow-lg border border-[#B8A2FF]/30">
                ✨ Diseñadora UX/UI
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl leading-tight">
              Diseño experiencias digitales que <span className="text-[#AB9DFF]">convierten</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transformo ideas en productos digitales intuitivos, funcionales y visualmente atractivos que conectan con las personas.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#AB9DFF] hover:bg-[#253AB2] text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <a href="#proyectos">
                  Ver proyectos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2 border-[#AB9DFF] hover:border-[#253AB2] hover:text-[#253AB2] bg-white"
              >
                <a href={mailtoSubject("Contacto desde la web")}>Contactar</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decoración: sin captura de puntero para no tapar botones */}
      <div className="pointer-events-none absolute top-10 right-10 w-20 h-20 bg-[#E3FC87]/40 rounded-full opacity-60"></div>
      <div className="pointer-events-none absolute bottom-20 left-20 w-16 h-16 bg-[#FFB2F7]/40 rounded-full opacity-60"></div>
      <div className="pointer-events-none absolute top-1/3 left-10 w-32 h-32 bg-[#B8A2FF]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-40 blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-1/3 right-10 w-40 h-40 bg-[#FFB2F7]/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-40 blur-2xl"></div>
    </section>
  );
}
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { mailtoSubject } from "../site";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 py-20 bg-gradient-to-br from-[#C0E0FF]/20 via-[#FFB2F7]/10 to-white relative overflow-hidden"
    >
      {/* Organic decorative shapes */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-[#B8A2FF]/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#253AB2] via-[#AB9DFF] to-[#B8A2FF] rounded-[50px] shadow-2xl">
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-sm">Trabajemos juntos</span>
            </div>
            
            <h2 className="text-3xl lg:text-4xl text-white mb-6 max-w-3xl mx-auto">
              ¿Listo para llevar tu idea al siguiente nivel?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
              Transformemos juntos tu visión en una experiencia digital extraordinaria que tus usuarios amarán
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-[#253AB2] hover:bg-gray-100 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <a href={mailtoSubject("Iniciar un proyecto")}>
                  <Mail className="mr-2 h-5 w-5" />
                  Iniciar proyecto
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 bg-transparent"
              >
                <a href="#proyectos">
                  Ver más trabajos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Decorative Elements - Organic shapes */}
          <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"></div>
          <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl"></div>
          
          {/* Small decorative circles */}
          <div className="pointer-events-none absolute top-10 right-20 w-16 h-16 bg-[#E3FC87]/30 rounded-full"></div>
          <div className="pointer-events-none absolute bottom-20 left-20 w-12 h-12 bg-[#FFB2F7]/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
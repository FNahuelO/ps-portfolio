import { Menu } from "lucide-react";
import { mailtoSubject } from "../site";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const navLinkClass =
  "text-gray-600 hover:text-[#AB9DFF] transition-colors text-sm py-1";
const sheetLinkClass =
  "text-foreground hover:text-[#AB9DFF] transition-colors text-base py-2";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[#C0E0FF]/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#AB9DFF] to-[#FFB2F7] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <span className="text-xl">P</span>
            </div>
            <span className="text-lg hidden sm:block">Priscila Sarmiento</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#inicio" className={navLinkClass}>
              Inicio
            </a>
            <a href="#proyectos" className={navLinkClass}>
              Proyectos
            </a>
            <a href="#servicios" className={navLinkClass}>
              Servicios
            </a>
            <a href="#testimonios" className={navLinkClass}>
              Sobre mí
            </a>
            <Button asChild className="bg-[#AB9DFF] hover:bg-[#253AB2] text-white rounded-full shadow-lg">
              <a href={mailtoSubject("Contactar")}>Contactar</a>
            </Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" type="button">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle>Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1">
                <SheetClose asChild>
                  <a href="#inicio" className={sheetLinkClass}>
                    Inicio
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#proyectos" className={sheetLinkClass}>
                    Proyectos
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#servicios" className={sheetLinkClass}>
                    Servicios
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#testimonios" className={sheetLinkClass}>
                    Sobre mí
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a href="#contacto" className={sheetLinkClass}>
                    Contacto
                  </a>
                </SheetClose>
              </nav>
              <SheetClose asChild>
                <Button asChild className="w-full bg-[#AB9DFF] hover:bg-[#253AB2] text-white rounded-full shadow-lg">
                  <a href={mailtoSubject("Contactar")}>Contactar</a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

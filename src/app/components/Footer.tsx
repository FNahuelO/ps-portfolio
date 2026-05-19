import { Github, Linkedin, Twitter, Mail, Dribbble, Instagram } from "lucide-react";
import { CONTACT_EMAIL, mailtoSubject } from "../site";

export function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/priscila-sarmiento/", label: "LinkedIn" },
    //{ icon: Dribbble, href: "#", label: "Dribbble" },
    { icon: Instagram, href: "#", label: "Instagram" },
    //{ icon: Twitter, href: "#", label: "Twitter" },
    //{ icon: Github, href: "#", label: "GitHub" },
  ];

  const links = {
    navigation: [
      { name: "Inicio", href: "#inicio" },
      { name: "Proyectos", href: "#proyectos" },
      { name: "Servicios", href: "#servicios" },
      { name: "Sobre mí", href: "#testimonios" },
    ],
    contact: [
      { name: "Contacto", href: "#contacto" },
      { name: "Blog", href: "#proyectos" },
      { name: "Recursos", href: "#servicios" },
    ],
  };

  return (
    <footer id="pie" className="scroll-mt-24 bg-gradient-to-br from-[#253AB2] via-[#253AB2] to-[#AB9DFF] text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl mb-2 text-white">
                Priscila Sarmiento
              </h3>
              <p className="text-[#C0E0FF] text-sm">Diseñadora UX/UI</p>
            </div>
            <p className="text-[#C0E0FF] max-w-md leading-relaxed text-sm">
              Creando experiencias digitales excepcionales que conectan con las personas y generan resultados medibles para tu negocio.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white hover:text-[#253AB2] transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="mb-6 text-base">Navegación</h4>
            <ul className="space-y-3">
              {links.navigation.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#C0E0FF] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="mb-6 text-base">Contacto</h4>
            <ul className="space-y-3">
              {links.contact.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#C0E0FF] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={mailtoSubject("Hola")}
                  className="inline-flex items-center gap-2 text-[#C0E0FF] hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#C0E0FF]">
            <p>© 2026 Priscila Sarmiento. Todos los derechos reservados.</p>

          </div>
        </div>
      </div>
    </footer>
  );
}
import { Star, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Carlos Méndez",
      role: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDc5MzYzNHww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "Trabajar con ella fue increíble. Entendió perfectamente nuestra visión y la transformó en una experiencia de usuario excepcional.",
      rating: "4.9",
      bgColor: "bg-[#C0E0FF]/30",
    },
    {
      name: "Ana Rodríguez",
      role: "Product Manager, InnovateLab",
      image: "https://images.unsplash.com/photo-1753162658479-cdf7ebaa7f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGRlc2lnbmVyfGVufDF8fHx8MTc3NDg0NDc1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "Su atención al detalle y conocimiento profundo de UX son impresionantes. Cada decisión de diseño está fundamentada en investigación real.",
      rating: "5.0",
      bgColor: "bg-[#FFB2F7]/20",
    },
    {
      name: "Laura García",
      role: "Founder, StyleHub",
      image: "https://images.unsplash.com/photo-1701096351544-7de3c7fa0272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc3NDg0ODU2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      text: "No solo diseña interfaces hermosas, sino que entiende el negocio. Su trabajo aumentó nuestras conversiones significativamente.",
      rating: "5.0",
      bgColor: "bg-[#B8A2FF]/20",
    },
  ];

  return (
    <section
      id="testimonios"
      className="scroll-mt-24 py-20 bg-white relative overflow-hidden"
    >
      {/* Organic background decoration */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-[#FFB2F7]/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Lo que dicen mis <span className="text-[#AB9DFF]">clientes</span>
          </h2>
          <p className="text-lg text-gray-600">
            Testimonios de clientes que confiaron en mi trabajo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`${testimonial.bgColor} rounded-[40px] p-8 hover:shadow-2xl transition-all duration-300 border border-white hover:-translate-y-2 relative`}
            >
              {/* Quote icon */}
              <div className="pointer-events-none absolute top-6 right-6 opacity-20">
                <Quote className="w-12 h-12 text-[#253AB2]" />
              </div>
              
              <div className="space-y-6 relative z-10">
                {/* Rating badge */}
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{testimonial.rating}</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-sm">
                  {testimonial.text}
                </p>
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <ImageWithFallback 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
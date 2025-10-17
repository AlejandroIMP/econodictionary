import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { animate, createScope } from "animejs";
import {
  BookOpen,
  Search,
  ArrowRight,
  Star,
  Users,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "~/features/shared/components/ui/card";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { Badge } from "~/features/shared/components/ui/badge";
import { TermOfTheDay } from "~/features/shared/components/TermOfTheDay";
import { CategoriesSection } from "~/features/home/components";

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<any>(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    scopeRef.current = createScope({ root: rootRef.current }).add((self) => {
      // 1. Animación de entrada del encabezado
      animate(".hero-title", {
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1200,
        delay: 200,
        ease: "out(3)",
      });

      animate(".hero-subtitle", {
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        delay: 400,
        ease: "out(3)",
      });

      animate(".hero-cta", {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: 600,
        ease: "out(3)",
      });

      // 2. Animación de definición destacada (Término del día)
      animate(".term-of-day", {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: 800,
        ease: "outElastic(1, 0.6)",
      });

      // 4. Animación de categorías económicas (staggered)
      const categoryCards = rootRef.current?.querySelectorAll(".category-card");
      categoryCards?.forEach((card, index) => {
        animate(card, {
          opacity: [0, 1],
          translateX: [-50, 0],
          duration: 800,
          delay: 1000 + index * 100,
          ease: "out(3)",
        });
      });

      // 6. Animación de fondo sutil (loop continuo)
      animate(".bg-pattern", {
        rotate: [0, 360],
        duration: 40000,
        loop: true,
        ease: "linear",
      });

      // Animación de stats
      const statItems = rootRef.current?.querySelectorAll(".stat-item");
      statItems?.forEach((item, index) => {
        animate(item, {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 600,
          delay: 1200 + index * 150,
          ease: "out(3)",
        });
      });

      // Registrar método para animación de búsqueda
      if (self) {
        self.add("searchGlow", () => {
          animate(".search-input", {
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0)",
              "0 0 20px 4px rgba(59, 130, 246, 0.5)",
              "0 0 0 0 rgba(59, 130, 246, 0)",
            ],
            duration: 1500,
            loop: true,
            ease: "inOut(2)",
          });
        });

        self.add("stopSearchGlow", () => {
          animate(".search-input", {
            boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
            duration: 300,
          });
        });
      }
    });

    // 5. Animación de scroll en definiciones
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            ease: "out(3)",
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const scrollElements = rootRef.current.querySelectorAll(".scroll-fade");
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      if (scopeRef.current) {
        scopeRef.current.revert();
      }
      observer.disconnect();
    };
  }, []);

  // 3. Manejar animación de búsqueda con focus
  useEffect(() => {
    if (searchFocused && scopeRef.current?.methods?.searchGlow) {
      scopeRef.current.methods.searchGlow();
    } else if (!searchFocused && scopeRef.current?.methods?.stopSearchGlow) {
      scopeRef.current.methods.stopSearchGlow();
    }
  }, [searchFocused]);

  return (
    <div ref={rootRef} className="min-h-screen bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
      {/* Patrón de fondo animado */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg className="bg-pattern w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge animado */}
            <Badge className="hero-subtitle mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Star className="w-4 h-4 mr-1" />
              Diccionario Económico Profesional
            </Badge>

            {/* Título principal */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Domina la Economía
              <span className="block text-blue-200">Término por Término</span>
            </h1>

            {/* Subtítulo */}
            <p className="hero-subtitle text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aprende economía con definiciones claras, ejemplos prácticos. Tu compañero académico ideal.
            </p>

            {/* Búsqueda principal con animación de glow */}
            <div className="hero-cta max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Buscar términos económicos..."
                  className="search-input w-full h-14 pl-12 pr-4 text-lg rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-sm transition-all"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
            </div>

            {/* Botones CTA */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/terms">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 text-lg rounded-xl"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explorar Términos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <Link to="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Crear Cuenta
                </Button>
              </Link>
            </div>

            {/* Stats animados */}
            
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent"></div>
      </section>

      {/* Término del Día - Animación con bounce */}
      <TermOfTheDay />

      {/* Categorías Económicas - Animación staggered */}
      <CategoriesSection />

      {/* Términos Populares - Scroll fade animation */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Términos Más Consultados
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Los conceptos que más buscan estudiantes y profesionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { term: "PIB (Producto Interno Bruto)", category: "Macroeconomía" },
              { term: "Oferta y Demanda", category: "Microeconomía" },
              { term: "Tasa de Interés", category: "Finanzas" },
              { term: "Tipo de Cambio", category: "Comercio Internacional" },
              { term: "Desempleo", category: "Macroeconomía" },
              { term: "Monopolio", category: "Microeconomía" },
            ].map((item, index) => (
              <Card
                key={index}
                className="scroll-fade opacity-0 group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardContent className="sm:p-6 sm:pt-0 p-6 md:pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.term}
                  </h3>
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Leer definición
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 scroll-fade opacity-0">
            <Link to="/terms">
              <Button size="lg" variant="outline" className="font-semibold">
                Ver Todos los Términos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white scroll-fade opacity-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Listo para Dominar la Economía?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Únete a miles de estudiantes y profesionales que confían en Econodictionary
              para entender conceptos económicos de manera clara y práctica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/terms">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-zinc-900 font-semibold px-8 py-4 text-lg rounded-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { BookOpen, Users, Target, Award } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Acerca de Econodictionary
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Tu guía completa para comprender conceptos, términos y principios económicos.
            Construido por entusiastas de la economía para estudiantes, profesionales y mentes curiosas.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl text-blue-900 dark:text-blue-100">
                Nuestra Misión
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-blue-800 dark:text-blue-200 max-w-4xl mx-auto leading-relaxed">
                Democratizar el conocimiento económico proporcionando explicaciones claras y accesibles de conceptos
                económicos complejos. Creemos que comprender economía no debería limitarse a académicos y profesionales
                – debería estar disponible para todos los que deseen tomar decisiones informadas sobre su futuro financiero.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Cobertura Integral</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Desde conceptos básicos como oferta y demanda hasta temas avanzados como política monetaria
                e comercio internacional, cubrimos todo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Impulsado por la Comunidad</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Nuestra comunidad de economistas, estudiantes y profesionales contribuyen definiciones,
                ejemplos e insights para mantener el contenido actual y relevante.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Enfoque Práctico</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Cada término incluye ejemplos del mundo real y aplicaciones prácticas para ayudarte
                a comprender cómo los conceptos económicos afectan la vida diaria.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Calidad Garantizada</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Todo el contenido se revisa por expertos en la materia para garantizar precisión,
                claridad y valor educativo.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
            Lo Que Ofrecemos
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Para Estudiantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Explicaciones claras de principios económicos para cursos de economía introductoria e intermedia.
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 ml-4">
                  <li>Definiciones simplificadas con ejemplos</li>
                  <li>Ayudas visuales y diagramas</li>
                  <li>Guías de estudio y conceptos clave</li>
                  <li>Preguntas de práctica y cuestionarios</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Para Profesionales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Referencia rápida para decisiones comerciales, análisis de políticas y planificación financiera.
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 ml-4">
                  <li>Conceptos económicos avanzados</li>
                  <li>Terminología específica de la industria</li>
                  <li>Estudios de casos del mundo real</li>
                  <li>Implicaciones de políticas y análisis</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                ¿Listo para Explorar la Economía?
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
                Comienza tu viaje en el fascinante mundo de la economía. Explora nuestra colección
                de términos, contribuye tu conocimiento, o únete a nuestra comunidad de aprendices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explorar Términos
                </a>
                <a
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Únete a la Comunidad
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Users, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "what-is-econodictionary",
    question: "¿Qué es Econodictionary?",
    answer: "Econodictionary es una plataforma en línea integral dedicada a hacer que los conceptos económicos sean accesibles para todos. Proporcionamos explicaciones claras y prácticas de términos, principios y teorías económicas con ejemplos y aplicaciones del mundo real.",
    category: "general"
  },
  {
    id: "who-can-use",
    question: "¿Quién puede usar Econodictionary?",
    answer: "¡Cualquiera interesado en economía! Nuestra plataforma sirve a estudiantes, profesionales, empresarios, formuladores de políticas e individuos curiosos. Ya sea que estés tomando tu primer curso de economía o analizando mercados financieros complejos, encontrarás contenido valioso aquí.",
    category: "general"
  },
  {
    id: "content-free",
    question: "¿Es el contenido gratuito para acceder?",
    answer: "¡Sí! Todo el contenido básico es completamente gratuito para acceder. Creemos que el conocimiento económico debería ser accesible para todos. Algunas características premium como análisis avanzado o planes de estudio personalizados pueden estar disponibles en el futuro.",
    category: "general"
  },
  {
    id: "contribute-content",
    question: "¿Cómo puedo contribuir con contenido?",
    answer: "¡Acogemos contribuciones de expertos en economía, educadores y entusiastas! Crea una cuenta y envía nuevos términos, mejora definiciones existentes o agrega ejemplos. Todos los envíos pasan por nuestro proceso de revisión para garantizar calidad y precisión.",
    category: "contributing"
  },
  {
    id: "content-reviewed",
    question: "¿Cómo se revisa y aprueba el contenido?",
    answer: "Todos los envíos son revisados por nuestro equipo de expertos en economía y moderadores. Verificamos la precisión, claridad, neutralidad y valor educativo. El contenido aprobado se publica inmediatamente, mientras que las sugerencias de mejora se envían a los colaboradores.",
    category: "contributing"
  },
  {
    id: "edit-existing",
    question: "¿Puedo editar términos existentes?",
    answer: "Sí, pero solo si eres el autor original del término. Creemos en la propiedad y responsabilidad del autor. Si detectas un error en el contenido de otro, puedes sugerir mejoras a través de nuestro sistema de comentarios.",
    category: "contributing"
  },
  {
    id: "account-required",
    question: "¿Necesito una cuenta para usar la plataforma?",
    answer: "Puedes explorar y leer todo el contenido sin una cuenta. Sin embargo, crear una cuenta te permite contribuir con contenido, guardar términos favoritos, rastrear tu progreso de aprendizaje y participar en discusiones.",
    category: "account"
  },
  {
    id: "account-safe",
    question: "¿Es segura mi información de cuenta?",
    answer: "Absolutamente. Utilizamos prácticas de seguridad estándar de la industria, incluidas contraseñas encriptadas, autenticación segura y auditorías de seguridad regulares. Nunca compartimos tu información personal con terceros sin tu consentimiento.",
    category: "account"
  },
  {
    id: "forgot-password",
    question: "¿Qué hago si olvido mi contraseña?",
    answer: "Usa el enlace 'Olvidé mi contraseña' en la página de inicio de sesión. Te enviaremos un enlace seguro para restablecer tu contraseña. Asegúrate de revisar tu carpeta de spam si no ves el correo.",
    category: "account"
  },
  {
    id: "report-content",
    question: "¿Cómo reporto contenido inapropiado?",
    answer: "Tomamos la calidad del contenido en serio. Usa el botón 'Reportar' en cualquier página de término o contáctanos directamente. Nuestro equipo de moderación revisa todos los reportes dentro de 24 horas y toma las medidas apropiadas.",
    category: "support"
  },
  {
    id: "technical-issues",
    question: "¿Qué debo hacer si encuentro problemas técnicos?",
    answer: "Primero, intenta actualizar la página o limpiar el caché de tu navegador. Si el problema persiste, contacta a nuestro equipo de soporte con detalles sobre tu navegador, dispositivo y el problema específico que estás experimentando.",
    category: "support"
  },
  {
    id: "feedback-suggestions",
    question: "¿Cómo puedo proporcionar comentarios o sugerencias?",
    answer: "¡Nos encanta saber de nuestros usuarios! Usa el formulario de contacto para compartir tus ideas o únete a nuestras discusiones comunitarias. Tus comentarios nos ayudan a mejorar la plataforma para todos.",
    category: "support"
  }
];

const categories = [
  { id: "general", label: "General", icon: BookOpen },
  { id: "contributing", label: "Contribuyendo", icon: Users },
  { id: "account", label: "Cuenta", icon: Shield },
  { id: "support", label: "Soporte", icon: HelpCircle }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Encuentra respuestas a preguntas comunes sobre Econodictionary. ¿No encuentras lo que buscas?
            <a href="/about/contact" className="text-blue-600 hover:text-blue-700 ml-1">
              Contáctanos
            </a>.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 pr-4">
                    {item.question}
                  </h3>
                  {openItems.has(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.has(item.id) && (
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="py-12">
              <HelpCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                ¿Aún Necesitas Ayuda?
              </h3>
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                ¿No encuentras la respuesta que buscas? Nuestro equipo de soporte está aquí para ayudar.
                Ponte en contacto con nosotros y nos comunicaremos lo antes posible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/about/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contactar Soporte
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  Explorar Términos
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

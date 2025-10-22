import { Github, Linkedin, Mail, MapPin, Coffee, Code, Palette, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "David Alejandro Sian Sunuc",
    role: "Desarrollador Full-Stack & Líder del Equipo",
    bio: "Apasionado por crear tecnología educativa que hace que los temas complejos sean accesibles. Lidera la visión técnica y garantiza que nuestra plataforma ofrezca una experiencia de usuario excepcional.",
    skills: ["React", "TypeScript", "Node.js", "System Design", "Team Leadership"],
    icon: Code,
    social: {
      github: "https://github.com/alejandroimp",
      linkedin: "https://linkedin.com/in/alejandro-sunuc",
      email: "dsians@miumg.edu.gt"
    }
  },
  {
    name: "Brian David Argueta Elel",
    role: "Desarrollador móvil iOS",
    bio: "Enfocado en desarrollar experiencias móviles fluidas para usuarios de iOS. Comprometido a traer educación económica al alcance de los usuarios a través de un diseño de aplicación intuitivo y atractivo.",
    skills: ["Swift", "iOS Development", "Mobile UX", "APIs"],
    icon: Users,
    social: {
      github: "https://github.com/brian-argueta",
      linkedin: "https://linkedin.com/in/brian-argueta-40287a29a",
      email: "barguetae1@miumg.edu.gt"
    }
  },
  {
    name: "Estuardo Emanuel Feliciano Morales",
    role: "Desarrollador Móvil & Diseñador UI/UX",
    bio: "Combina un ojo perspicaz para el diseño con experiencia en desarrollo móvil para crear interfaces de usuario intuitivas y atractivas. Se enfoca en ofrecer una experiencia perfecta en todos los dispositivos.",
    skills: ["Kotlin", "Android", "UI/UX Design", "Figma"],
    icon: Palette,
    social: {
      github: "https://github.com/estuardo-design",
      linkedin: "https://linkedin.com/in/estuardo-design",
      email: "efelicianom2@miumg.edu.gt"
    }
  },
  {
    name: "Ricardo Antonio Noj Castro",
    role: "Desarrollador Móvil Android",
    bio: "Dedicado a desarrollar soluciones móviles que traen educación económica a usuarios en movimiento. Se enfoca en el rendimiento y la usabilidad en entornos móviles.",
    skills: ["Kotlin", "Android Development", "Mobile UX", "APIs", "Performance Optimization"],
    icon: Coffee,
    social: {
      linkedin: "https://linkedin.com/in/ricardo-econ",
      email: "rnojc@miumg.edu.gt"
    }
  }
];

export default function Team() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-6xl">
        <div className="mb-8">
          <img src="../../Umg.png" alt="Umg Logo" className="mx-auto w-48" loading="lazy" />
        </div>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Conoce Nuestro Equipo
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Somos un apasionado equipo de desarrolladores, diseñadores y economistas trabajando juntos
            para hacer que la educación económica sea accesible para todos.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member) => {
            const IconComponent = member.icon;
            return (
              <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {member.bio}
                  </p>

                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Conecta</h4>
                    <div className="flex gap-3">
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Our Story */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nuestra Historia</CardTitle>
            <CardDescription>
              Cómo cuatro amigos convirtieron su pasión compartida en una misión
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  De Aula a Código
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Lo que comenzó como sesiones de estudio nocturnas y debates apasionados sobre teoría económica
                  evolucionó en una visión compartida: crear una plataforma que haga que la economía sea accesible para todos.
                  Reconocimos que mientras la economía forma nuestro mundo, el lenguaje de la economía a menudo se siente
                  intimidante y exclusivo.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Combinando nuestros diversos antecedentes en tecnología, diseño y economía, nos propusimos
                  construir algo diferente – una plataforma que no solo explique términos, sino que ayude a las personas
                  a entender el "por qué" detrás de los conceptos económicos.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Nuestro Enfoque
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Creemos en aprender haciendo. Cada característica que construimos comienza con necesidades reales de usuarios
                  y preguntas económicas reales. Nuestro contenido es revisado por expertos, pero escrito para humanos.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  No solo estamos construyendo un diccionario – estamos construyendo una comunidad donde la curiosidad se encuentra
                  con la comprensión, y donde las ideas económicas complejas se vuelven claras, conocimiento accionable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
            Nuestros Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Accesibilidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  El conocimiento económico debe estar disponible para todos, independientemente de antecedentes o nivel educativo.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Excelencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Mantenemos los más altos estándares de precisión, claridad y experiencia de usuario en todo lo que construimos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Creemos en el poder de la colaboración y el aprendizaje conjunto como comunidad.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Join Us */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="py-12">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                Únete a Nuestra Misión
              </h3>
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                ¿Apasionado por la economía y la educación? Nos encantaría saber de ti.
                Ya seas desarrollador, economista, educador, o simplemente entusiasta del aprendizaje,
                hay muchas formas de contribuir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/about/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ponte en Contacto
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  Explora Contenido
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

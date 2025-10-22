import { Shield, Eye, Lock, Users, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Política de Privacidad
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, utilizamos y protegemos tu información.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Última actualización: 10 de Octubre de 2025
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Resumen de Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Econodictionary está comprometida a proteger tu privacidad. Recopilamos solo la información mínima
              necesaria para proporcionar nuestros servicios y somos transparentes sobre nuestras prácticas. Esta política
              de privacidad explica qué información recopilamos y cómo la utilizamos.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Información Que Recopilamos
            </CardTitle>
            <CardDescription>
              Recopilamos información de las siguientes maneras:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Información de Cuenta</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Cuando creas una cuenta, recopilamos tu correo electrónico, nombre de usuario y contraseña.
                Las contraseñas se cifran usando algoritmos de hash estándar de la industria.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Datos de Uso</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Recopilamos automáticamente información sobre cómo usas nuestra plataforma, incluidas páginas visitadas,
                términos de búsqueda y patrones de interacción. Esto nos ayuda a mejorar nuestros servicios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Contenido Que Creas</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Cuando contribuyes contenido (términos, definiciones, ejemplos), almacenamos esa información
                junto con tu nombre de usuario e historial de contribuciones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Información Técnica</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Recopilamos datos estándar de análisis web, incluidas direcciones IP, tipo de navegador, información del dispositivo
                y fuentes de referencia. Estos datos se anonimiza donde es posible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Cómo Utilizamos Tu Información
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Proporcionar y mantener nuestros servicios de plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Autenticar tu cuenta y asegurar tus datos</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Procesar y mostrar contribuciones de contenido</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Mejorar la funcionalidad de la plataforma y la experiencia del usuario</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Comunicarnos contigo sobre tu cuenta y nuestros servicios</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Garantizar la seguridad de la plataforma y prevenir abusos</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Compartir Información y Divulgación</CardTitle>
            <CardDescription>
              No vendemos, intercambiamos ni alquilamos tu información personal a terceros.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Podemos Compartir Información:</h4>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 ml-4">
                <li>• Con tu consentimiento explícito</li>
                <li>• Para cumplir con obligaciones legales</li>
                <li>• Para proteger nuestros derechos y prevenir daños</li>
                <li>• En conexión con una transferencia de negocio</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Contenido Público:</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                El contenido que contribuyes a la plataforma (términos, definiciones, ejemplos) es visible públicamente
                y puede ser visto, compartido y utilizado por otros de acuerdo con nuestros Términos de Servicio.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Seguridad de Datos</CardTitle>
            <CardDescription>
              Implementamos medidas técnicas y organizacionales apropiadas para proteger tus datos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Encriptación</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Los datos se encriptan en tránsito y en reposo utilizando protocolos estándar de la industria.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Controles de Acceso</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Los controles de acceso estrictos limitan quién puede ver o modificar tus datos.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Auditorías Regulares</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Realizamos auditorías de seguridad regulares y evaluaciones de vulnerabilidades.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Respuesta a Incidentes</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Tenemos procedimientos en lugar para responder a incidentes de seguridad.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tus Derechos y Opciones</CardTitle>
            <CardDescription>
              Tienes control sobre tus datos y cómo se usan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Acceso y Portabilidad</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Puedes solicitar una copia de tus datos personales y transferirlos a otro servicio.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Corrección</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Puedes actualizar la información de tu cuenta y corregir datos inexactos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Eliminación</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Puedes solicitar la eliminación de tu cuenta y datos asociados.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Retiro de Consentimiento</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Puedes retirar el consentimiento para el procesamiento de datos cuando corresponda.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies y Seguimiento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia y analizar patrones de uso.
            </p>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Cookies Esenciales</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Requeridas para la funcionalidad básica de la plataforma, incluyendo autenticación y seguridad.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Cookies de Análisis</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Nos ayudan a entender cómo los usuarios interactúan con nuestra plataforma para mejorar los servicios.
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Puedes controlar las preferencias de cookies a través de la configuración de tu navegador.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contáctanos Sobre Privacidad
            </CardTitle>
            <CardDescription>
              ¿Preguntas sobre esta política de privacidad o tus datos?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Si tienes preguntas sobre esta política de privacidad o cómo manejamos tus datos,
              por favor contáctanos:
            </p>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <p><strong>Correo Electrónico:</strong> privacy@econodictionary.com</p>
              <p><strong>Tiempo de Respuesta:</strong> Dentro de 30 días</p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Cambios a Esta Política</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Podemos actualizar esta política de privacidad de vez en cuando. Cuando realizamos cambios significativos,
              te lo notificaremos a través de la plataforma o por correo electrónico.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Esta política fue actualizada por última vez el 10 de Octubre de 2025. Te animamos a revisarla periódicamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

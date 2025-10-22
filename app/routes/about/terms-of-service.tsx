import { FileText, Shield, Users, AlertTriangle, Scale } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Términos de Servicio
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Por favor lee estos términos cuidadosamente antes de usar Econodictionary.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Última actualización: 10 de Octubre de 2025
          </p>
        </div>

        {/* Agreement Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Acuerdo con los Términos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Al acceder y usar Econodictionary, aceptas estar vinculado por estos Términos de Servicio.
              Si no estás de acuerdo con todos los términos y condiciones de este acuerdo, no puedes acceder
              al servicio. Estos términos aplican a todos los usuarios de la plataforma, incluyendo colaboradores,
              moderadores y administradores.
            </p>
          </CardContent>
        </Card>

        {/* Description of Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Descripción del Servicio</CardTitle>
            <CardDescription>
              Lo que Econodictionary proporciona y cómo funciona
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Econodictionary es una plataforma en línea que proporciona contenido educativo sobre conceptos,
              términos y principios económicos. Nuestros servicios incluyen:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 ml-6">
              <li className="list-disc">Acceso a definiciones y explicaciones de términos económicos</li>
              <li className="list-disc">Contenido generado por el usuario y contribuciones comunitarias</li>
              <li className="list-disc">Funcionalidad de búsqueda y navegación</li>
              <li className="list-disc">Gestión de cuentas y características de personalización</li>
              <li className="list-disc">Recursos educativos y herramientas de aprendizaje</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400">
              Nos reservamos el derecho de modificar o discontinuar cualquier servicio en cualquier momento sin previo aviso.
            </p>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Cuentas de Usuario y Registro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Creación de Cuenta</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Para contribuir contenido o acceder a ciertas características, debes crear una cuenta. Aceptas
                proporcionar información precisa, actual y completa durante el registro y actualizar
                tal información para mantenerla precisa, actual y completa.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Seguridad de la Cuenta</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta y
                de todas las actividades que ocurran bajo tu cuenta. Aceptas notificarnos inmediatamente de
                cualquier uso no autorizado de tu cuenta.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Terminación de Cuenta</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Nos reservamos el derecho de terminar o suspender tu cuenta en cualquier momento por violaciones de
                estos términos u otra conducta que determinemos que es perjudicial para nuestra plataforma o usuarios.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contenido Generado por el Usuario</CardTitle>
            <CardDescription>
              Reglas para contribuir y usar contenido en nuestra plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Propiedad del Contenido</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Retienes la propiedad del contenido que creas y envías a nuestra plataforma. Al enviar contenido,
                nos otorgas una licencia mundial, no exclusiva y sin regalías para usar, mostrar y distribuir
                tu contenido en conexión con nuestros servicios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Estándares de Contenido</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">Todo el contenido generado por el usuario debe:</p>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 ml-6">
                <li className="list-disc">Ser preciso y factualmente correcto</li>
                <li className="list-disc">Ser original o apropiadamente atribuido</li>
                <li className="list-disc">No violar ninguna ley o regulación</li>
                <li className="list-disc">No infringir derechos de propiedad intelectual</li>
                <li className="list-disc">No contener material dañino, ofensivo o inapropiado</li>
                <li className="list-disc">Ser relevante para la educación económica</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Moderación de Contenido</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Nos reservamos el derecho de revisar, editar o eliminar cualquier contenido que viole estos términos.
                El contenido puede ser revisado por nuestro equipo de moderación o miembros de la comunidad antes de la publicación.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Usos Prohibidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Aceptas no usar nuestra plataforma para ningún propósito ilegal o prohibido. Las actividades prohibidas incluyen:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Violar derechos de propiedad intelectual</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Publicar información falsa o engañosa</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Acosar o abusar de otros usuarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Intentar obtener acceso no autorizado</span>
                </li>
              </ul>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Distribuir malware o virus</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Spam o uso automatizado excesivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Suplantación de otros o tergiversación de afiliación</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Usar la plataforma con fines comerciales sin permiso</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Propiedad Intelectual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Nuestro Contenido</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                La plataforma, incluyendo su diseño, código y contenido original, está protegida por derechos de autor,
                marcas registradas y otras leyes de propiedad intelectual. No puedes copiar, modificar o distribuir
                nuestro contenido propietario sin permiso.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Licencia de Contenido del Usuario</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Al enviar contenido, nos otorgas una licencia para usar, mostrar y distribuir tu contenido
                en nuestra plataforma y en materiales relacionados. Esta licencia es no exclusiva y sin regalías.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">DMCA y Derechos de Autor</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Respetamos los derechos de propiedad intelectual. Si crees que tus derechos de autor han sido infringidos,
                por favor contáctanos con un aviso de eliminación DMCA que incluya la información requerida.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Exenciones de Responsabilidad y Limitaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Solo Propósitos Educativos</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Nuestro contenido se proporciona solo con fines educativos. No pretende ser financiero,
                inversión o asesoramiento profesional. Siempre consulta profesionales calificados para decisiones importantes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Sin Garantías</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                La plataforma se proporciona "tal como está" sin garantías de ningún tipo. No garantizamos
                la precisión, completitud u oportunidad de ningún contenido.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Limitación de Responsabilidad</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                No seremos responsables de ningún daño indirecto, incidental, especial o consecuente
                derivado de tu uso de la plataforma o confianza en su contenido.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Terminación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Podemos terminar o suspender tu cuenta y acceso a nuestros servicios inmediatamente,
              sin previo aviso, por cualquier motivo, incluyendo violación de estos términos. Al terminar,
              tu derecho de usar la plataforma cesará inmediatamente.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cambios a los Términos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios de cambios significativos
              a través de la plataforma o por correo electrónico. El uso continuo de la plataforma después de los cambios
              constituye la aceptación de los nuevos términos.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ley Aplicable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              Estos términos se rigen por las leyes de Guatemala. Cualquier disputa derivada de estos términos
              o tu uso de la plataforma se resolverá mediante arbitraje vinculante en la Ciudad de Guatemala.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>
              ¿Preguntas sobre estos términos?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Si tienes preguntas sobre estos Términos de Servicio, por favor contáctanos:
            </p>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <p><strong>Correo Electrónico:</strong> legal@econodictionary.com</p>
              <p><strong>Dirección:</strong> Ciudad de Guatemala, Guatemala</p>
              <p><strong>Tiempo de Respuesta:</strong> Dentro de 7 días hábiles</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

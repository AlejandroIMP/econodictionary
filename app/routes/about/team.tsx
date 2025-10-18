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
    role: "Full-Stack Developer & Team Lead",
    bio: "Passionate about creating educational technology that makes complex subjects accessible. Leads the technical vision and ensures our platform delivers an exceptional user experience.",
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
    role: "IOs mobile developer",
    bio: "Focused on developing seamless mobile experiences for iOS users. Committed to bringing economic education to users' fingertips through intuitive and engaging app design.",
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
    role: "Mobile Developer & UI/UX Designer",
    bio: "Combines a keen eye for design with mobile development expertise to create intuitive and engaging user interfaces. Focuses on delivering a seamless experience across all devices.",
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
    role: "Mobile Android Developer",
    bio: "Dedicated to develop mobile solutions that bring economic education to users on the go. Focuses on performance and usability in mobile environments.",
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
            Meet Our Team
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            We're a passionate team of developers, designers, and economists working together
            to make economic education accessible to everyone.
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
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-3">Connect</h4>
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
            <CardTitle className="text-2xl">Our Story</CardTitle>
            <CardDescription>
              How four friends turned their shared passion into a mission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  From Classroom to Code
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  What started as late-night study sessions and passionate debates about economic theory
                  evolved into a shared vision: creating a platform that makes economics accessible to everyone.
                  We recognized that while economics shapes our world, the language of economics often feels
                  intimidating and exclusive.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Combining our diverse backgrounds in technology, design, and economics, we set out to
                  build something different – a platform that doesn't just explain terms, but helps people
                  understand the "why" behind economic concepts.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Our Approach
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We believe in learning through doing. Every feature we build starts with real user needs
                  and real economic questions. Our content is reviewed by experts, but written for humans.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We're not just building a dictionary – we're building a community where curiosity meets
                  understanding, and where complex economic ideas become clear, actionable knowledge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Economic knowledge should be available to everyone, regardless of background or education level.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We maintain the highest standards of accuracy, clarity, and user experience in everything we build.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  We believe in the power of collaboration and learning together as a community.
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
                Join Our Mission
              </h3>
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                Passionate about economics and education? We'd love to hear from you.
                Whether you're a developer, economist, educator, or just enthusiastic about learning,
                there are many ways to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/about/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  Explore Content
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

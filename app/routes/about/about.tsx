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
            About Econodictionary
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive guide to understanding economic concepts, terms, and principles.
            Built by economics enthusiasts for students, professionals, and curious minds.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl text-blue-900 dark:text-blue-100">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-blue-800 dark:text-blue-200 max-w-4xl mx-auto leading-relaxed">
                To democratize economic knowledge by providing clear, accessible explanations of complex
                economic concepts. We believe that understanding economics shouldn't be limited to
                academics and professionals – it should be available to everyone who wants to make
                informed decisions about their financial future.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Comprehensive Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                From basic concepts like supply and demand to advanced topics like monetary policy
                and international trade, we cover it all.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Our community of economists, students, and professionals contribute definitions,
                examples, and insights to keep content current and relevant.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Practical Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Every term includes real-world examples and practical applications to help you
                understand how economic concepts affect daily life.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Quality Assured</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                All content undergoes review by subject matter experts to ensure accuracy,
                clarity, and educational value.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
            What We Offer
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Students</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Clear explanations of economic principles for introductory and intermediate economics courses.
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 ml-4">
                  <li>Simplified definitions with examples</li>
                  <li>Visual aids and diagrams</li>
                  <li>Study guides and key concepts</li>
                  <li>Practice questions and quizzes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Professionals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Quick reference for business decisions, policy analysis, and financial planning.
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400 ml-4">
                  <li>Advanced economic concepts</li>
                  <li>Industry-specific terminology</li>
                  <li>Real-world case studies</li>
                  <li>Policy implications and analysis</li>
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
                Ready to Explore Economics?
              </h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
                Start your journey into the fascinating world of economics. Browse our collection
                of terms, contribute your knowledge, or join our community of learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Terms
                </a>
                <a
                  href="/auth/sign-up"
                  className="inline-flex items-center justify-center px-6 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Join Community
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

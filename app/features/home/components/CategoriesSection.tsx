import {
  TrendingUp,
  ArrowRight,
  Globe,
  BarChart3,
  DollarSign,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/features/shared/components/ui/card";

type Category = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  count: number;
  color: string;
  bgColor: string;
  textColor: string;
};

const categories: Category[] = [
  {
    icon: TrendingUp,
    title: "Macroeconomía",
    description: "PIB, inflación, política monetaria y fiscal",
    count: 150,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Microeconomía",
    description: "Oferta, demanda, estructuras de mercado",
    count: 120,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: DollarSign,
    title: "Finanzas",
    description: "Inversión, banca, mercados financieros",
    count: 100,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: Globe,
    title: "Comercio Internacional",
    description: "Mercados globales, tipos de cambio",
    count: 80,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-600 dark:text-orange-400",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Categorías Principales
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Explora conceptos económicos organizados por áreas de estudio
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="category-card group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 dark:hover:border-blue-800"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className={`w-8 h-8 ${category.textColor}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-base">
                    {category.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                      {category.count} términos
                    </span>
                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

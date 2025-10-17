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
    question: "What is Econodictionary?",
    answer: "Econodictionary is a comprehensive online platform dedicated to making economic concepts accessible to everyone. We provide clear, practical explanations of economic terms, principles, and theories with real-world examples and applications.",
    category: "general"
  },
  {
    id: "who-can-use",
    question: "Who can use Econodictionary?",
    answer: "Anyone interested in economics! Our platform serves students, professionals, business owners, policymakers, and curious individuals. Whether you're taking your first economics course or analyzing complex financial markets, you'll find valuable content here.",
    category: "general"
  },
  {
    id: "content-free",
    question: "Is the content free to access?",
    answer: "Yes! All basic content is completely free to access. We believe economic knowledge should be accessible to everyone. Some premium features like advanced analytics or personalized study plans may be available in the future.",
    category: "general"
  },
  {
    id: "contribute-content",
    question: "How can I contribute content?",
    answer: "We welcome contributions from economics experts, educators, and enthusiasts! Create an account and submit new terms, improve existing definitions, or add examples. All submissions go through our review process to ensure quality and accuracy.",
    category: "contributing"
  },
  {
    id: "content-reviewed",
    question: "How is content reviewed and approved?",
    answer: "All submissions are reviewed by our team of economics experts and moderators. We check for accuracy, clarity, neutrality, and educational value. Approved content is published immediately, while suggestions for improvement are sent back to contributors.",
    category: "contributing"
  },
  {
    id: "edit-existing",
    question: "Can I edit existing terms?",
    answer: "Yes, but only if you're the original author of the term. We believe in author ownership and accountability. If you spot an error in someone else's content, you can suggest improvements through our feedback system.",
    category: "contributing"
  },
  {
    id: "account-required",
    question: "Do I need an account to use the platform?",
    answer: "You can browse and read all content without an account. However, creating an account allows you to contribute content, save favorite terms, track your learning progress, and participate in discussions.",
    category: "account"
  },
  {
    id: "account-safe",
    question: "Is my account information safe?",
    answer: "Absolutely. We use industry-standard security practices including encrypted passwords, secure authentication, and regular security audits. We never share your personal information with third parties without your consent.",
    category: "account"
  },
  {
    id: "forgot-password",
    question: "What if I forget my password?",
    answer: "Use the 'Forgot Password' link on the sign-in page. We'll send you a secure link to reset your password. Make sure to check your spam folder if you don't see the email.",
    category: "account"
  },
  {
    id: "report-content",
    question: "How do I report inappropriate content?",
    answer: "We take content quality seriously. Use the 'Report' button on any term page or contact us directly. Our moderation team reviews all reports within 24 hours and takes appropriate action.",
    category: "support"
  },
  {
    id: "technical-issues",
    question: "What should I do if I encounter technical issues?",
    answer: "First, try refreshing the page or clearing your browser cache. If the issue persists, contact our support team with details about your browser, device, and the specific problem you're experiencing.",
    category: "support"
  },
  {
    id: "feedback-suggestions",
    question: "How can I provide feedback or suggestions?",
    answer: "We love hearing from our users! Use the contact form to share your thoughts, or join our community discussions. Your feedback helps us improve the platform for everyone.",
    category: "support"
  }
];

const categories = [
  { id: "general", label: "General", icon: BookOpen },
  { id: "contributing", label: "Contributing", icon: Users },
  { id: "account", label: "Account", icon: Shield },
  { id: "support", label: "Support", icon: HelpCircle }
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Find answers to common questions about Econodictionary. Can't find what you're looking for?
            <a href="/about/contact" className="text-blue-600 hover:text-blue-700 ml-1">
              Contact us
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
                Still Need Help?
              </h3>
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help.
                Reach out to us and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/about/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/terms"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                >
                  Browse Terms
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

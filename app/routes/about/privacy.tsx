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
            Privacy Policy
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Last updated: October 10, 2025
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Econodictionary is committed to protecting your privacy. We collect only the minimum information
              necessary to provide our services and are transparent about our practices. This privacy policy
              explains what information we collect and how we use it.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Information We Collect
            </CardTitle>
            <CardDescription>
              We collect information in the following ways:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Account Information</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                When you create an account, we collect your email address, username, and password.
                Passwords are encrypted using industry-standard hashing algorithms.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Usage Data</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We automatically collect information about how you use our platform, including pages visited,
                search terms, and interaction patterns. This helps us improve our services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Content You Create</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                When you contribute content (terms, definitions, examples), we store that information
                along with your username and contribution history.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Technical Information</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We collect standard web analytics data including IP addresses, browser type, device information,
                and referral sources. This data is anonymized where possible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Provide and maintain our platform services</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Authenticate your account and secure your data</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Process and display content contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Improve platform functionality and user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Communicate with you about your account and our services</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ensure platform security and prevent abuse</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing and Disclosure</CardTitle>
            <CardDescription>
              We do not sell, trade, or rent your personal information to third parties.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">We May Share Information:</h4>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 ml-4">
                <li>• With your explicit consent</li>
                <li>• To comply with legal obligations</li>
                <li>• To protect our rights and prevent harm</li>
                <li>• In connection with a business transfer</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Public Content:</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Content you contribute to the platform (terms, definitions, examples) is publicly visible
                and may be viewed, shared, and used by others in accordance with our Terms of Service.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
            <CardDescription>
              We implement appropriate technical and organizational measures to protect your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Encryption</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Data is encrypted in transit and at rest using industry-standard protocols.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Access Controls</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Strict access controls limit who can view or modify your data.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Regular Audits</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  We conduct regular security audits and vulnerability assessments.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Incident Response</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  We have procedures in place to respond to security incidents.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Rights and Choices</CardTitle>
            <CardDescription>
              You have control over your data and how it's used.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Access and Portability</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You can request a copy of your personal data and have it transferred to another service.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Correction</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You can update your account information and correct inaccurate data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Deletion</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You can request deletion of your account and associated data.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Consent Withdrawal</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  You can withdraw consent for data processing where applicable.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookies and Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              We use cookies and similar technologies to enhance your experience and analyze usage patterns.
            </p>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Essential Cookies</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Required for basic platform functionality, including authentication and security.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Analytics Cookies</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Help us understand how users interact with our platform to improve services.
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You can control cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us About Privacy
            </CardTitle>
            <CardDescription>
              Questions about this privacy policy or your data?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              If you have questions about this privacy policy or how we handle your data,
              please contact us:
            </p>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <p><strong>Email:</strong> privacy@econodictionary.com</p>
              <p><strong>Response Time:</strong> Within 30 days</p>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card>
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We may update this privacy policy from time to time. When we make significant changes,
              we'll notify you through the platform or via email.
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              This policy was last updated on October 10, 2025. We encourage you to review it periodically.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

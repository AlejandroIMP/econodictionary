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
            Terms of Service
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            Please read these terms carefully before using Econodictionary.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Last updated: October 10, 2025
          </p>
        </div>

        {/* Agreement Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Agreement to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              By accessing and using Econodictionary, you agree to be bound by these Terms of Service.
              If you do not agree to all the terms and conditions of this agreement, you may not access
              the service. These terms apply to all users of the platform, including contributors,
              moderators, and administrators.
            </p>
          </CardContent>
        </Card>

        {/* Description of Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Description of Service</CardTitle>
            <CardDescription>
              What Econodictionary provides and how it works
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              Econodictionary is an online platform that provides educational content about economic
              concepts, terms, and principles. Our services include:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 ml-6">
              <li className="list-disc">Access to economic term definitions and explanations</li>
              <li className="list-disc">User-generated content and community contributions</li>
              <li className="list-disc">Search and browsing functionality</li>
              <li className="list-disc">Account management and personalization features</li>
              <li className="list-disc">Educational resources and learning tools</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400">
              We reserve the right to modify or discontinue any service at any time without notice.
            </p>
          </CardContent>
        </Card>

        {/* User Accounts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Accounts and Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Account Creation</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                To contribute content or access certain features, you must create an account. You agree
                to provide accurate, current, and complete information during registration and to update
                such information to keep it accurate, current, and complete.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Account Security</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                You are responsible for maintaining the confidentiality of your account credentials and
                for all activities that occur under your account. You agree to immediately notify us of
                any unauthorized use of your account.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Account Termination</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We reserve the right to terminate or suspend your account at any time for violations of
                these terms or for other conduct that we determine to be harmful to our platform or users.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User-Generated Content</CardTitle>
            <CardDescription>
              Rules for contributing and using content on our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Content Ownership</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                You retain ownership of content you create and submit to our platform. By submitting content,
                you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute
                your content in connection with our services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Content Standards</h4>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">All user-generated content must:</p>
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 ml-6">
                <li className="list-disc">Be accurate and factually correct</li>
                <li className="list-disc">Be original or properly attributed</li>
                <li className="list-disc">Not violate any laws or regulations</li>
                <li className="list-disc">Not infringe on intellectual property rights</li>
                <li className="list-disc">Not contain harmful, offensive, or inappropriate material</li>
                <li className="list-disc">Be relevant to economic education</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Content Moderation</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We reserve the right to review, edit, or remove any content that violates these terms.
                Content may be reviewed by our moderation team or community members before publication.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Prohibited Uses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You agree not to use our platform for any unlawful or prohibited purpose. Prohibited activities include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Violating intellectual property rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Posting false or misleading information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Harassing or abusing other users</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Attempting to gain unauthorized access</span>
                </li>
              </ul>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Distributing malware or viruses</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Spamming or excessive automated use</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Impersonating others or misrepresenting affiliation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Using the platform for commercial purposes without permission</span>
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
              Intellectual Property
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Our Content</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                The platform, including its design, code, and original content, is protected by copyright,
                trademark, and other intellectual property laws. You may not copy, modify, or distribute
                our proprietary content without permission.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">User Content License</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                By submitting content, you grant us a license to use, display, and distribute your content
                on our platform and in related materials. This license is non-exclusive and royalty-free.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">DMCA and Copyright</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We respect intellectual property rights. If you believe your copyright has been infringed,
                please contact us with a DMCA takedown notice including the required information.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Disclaimers and Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Educational Purpose Only</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Our content is provided for educational purposes only. It is not intended as financial,
                investment, or professional advice. Always consult qualified professionals for important decisions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">No Warranties</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                The platform is provided "as is" without warranties of any kind. We do not guarantee
                the accuracy, completeness, or timeliness of any content.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">Limitation of Liability</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                We shall not be liable for any indirect, incidental, special, or consequential damages
                arising from your use of the platform or reliance on its content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              We may terminate or suspend your account and access to our services immediately,
              without prior notice, for any reason, including breach of these terms. Upon termination,
              your right to use the platform will cease immediately.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              We reserve the right to modify these terms at any time. We will notify users of significant
              changes through the platform or via email. Continued use of the platform after changes
              constitutes acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400">
              These terms are governed by the laws of Guatemala. Any disputes arising from these terms
              or your use of the platform will be resolved through binding arbitration in Guatemala City.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Questions about these terms?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <p><strong>Email:</strong> legal@econodictionary.com</p>
              <p><strong>Address:</strong> Guatemala City, Guatemala</p>
              <p><strong>Response Time:</strong> Within 7 business days</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

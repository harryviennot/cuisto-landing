import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Cuisto",
  description: "Terms and Conditions for Cuisto - Read our terms of service and usage policies.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-forest-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Terms and Conditions
          </h1>
          <p className="text-forest-300">Last Updated: December 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-stone prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-text-body leading-relaxed">
            Welcome to Cuisto. These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the Cuisto mobile application (&quot;App&quot;), operated by Harry Viennot (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By downloading, installing, or using Cuisto, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the App.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">1. Eligibility</h2>
          <p className="text-text-body">
            You must be at least 13 years old to use Cuisto. If you are between 13 and 18 years old (or the age of majority in your jurisdiction), you may only use Cuisto with the consent of a parent or legal guardian who agrees to be bound by these Terms on your behalf. By using the App, you represent and warrant that you meet these eligibility requirements.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">2. Account Registration</h2>
          <p className="text-text-body">
            To access certain features of Cuisto, you must create an account using passwordless authentication via email or phone number. You agree to provide accurate and complete information during registration and to keep your contact information up to date. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized access or use of your account.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">3. Description of Services</h2>
          <p className="text-text-body">
            Cuisto is a recipe management application that provides the following features:
          </p>
          <ul className="mt-4 space-y-2 text-text-body">
            <li><strong>Recipe Extraction:</strong> AI-powered extraction of recipes from photos, URLs, videos, and text.</li>
            <li><strong>Recipe Management:</strong> Organization, editing, and storage of recipes in personal collections.</li>
            <li><strong>Cooking Mode:</strong> Step-by-step cooking instructions with timers and ingredient scaling.</li>
            <li><strong>AI Chef Chat:</strong> AI-powered assistance for cooking-related questions.</li>
            <li><strong>Social Features:</strong> Sharing recipes publicly, forking recipes from other users, and community ratings.</li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">4. Subscription and Payments</h2>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">4.1 Free and Premium Tiers</h3>
          <p className="text-text-body">
            Cuisto offers both free and premium subscription tiers. The free tier provides limited access to certain features, while premium subscriptions unlock additional functionality including unlimited recipe extraction, full cooking mode access, and future features such as shopping lists and calendar integration.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">4.2 Billing</h3>
          <p className="text-text-body">
            Premium subscriptions are billed through the Apple App Store or Google Play Store, depending on your device. All payments are processed by the respective platform and are subject to their terms and conditions. Subscription fees are non-refundable except as required by applicable law or the policies of the respective app store.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">4.3 Cancellation</h3>
          <p className="text-text-body">
            You may cancel your subscription at any time through your device&apos;s app store settings. Cancellation will take effect at the end of your current billing period, and you will retain access to premium features until that time.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">5. User Content</h2>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">5.1 Your Content</h3>
          <p className="text-text-body">
            You retain ownership of any content you create, upload, or submit through Cuisto, including recipes, images, notes, and ratings (&quot;User Content&quot;). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, display, and distribute your User Content in connection with operating and promoting the App.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">5.2 Marketing Rights</h3>
          <p className="text-text-body">
            By sharing recipes publicly on Cuisto, you grant us the right to feature your recipes and associated content in our marketing materials, social media, and promotional campaigns. We will provide attribution where reasonably practicable.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">5.3 Content Standards</h3>
          <p className="text-text-body">
            You agree not to submit User Content that: (a) infringes any third-party intellectual property rights; (b) is unlawful, harmful, threatening, abusive, defamatory, or otherwise objectionable; (c) contains viruses or malicious code; or (d) violates any applicable laws or regulations. We reserve the right to remove any User Content that violates these Terms.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">6. Intellectual Property</h2>
          <p className="text-text-body">
            The App, including its design, features, functionality, and all related intellectual property, is owned by Harry Viennot and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the App without our prior written consent.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">7. AI Features Disclaimer</h2>
          <p className="text-text-body">
            Cuisto uses artificial intelligence to extract recipes, provide cooking assistance, and power various features. While we strive for accuracy, AI-generated content may contain errors, inaccuracies, or omissions. You acknowledge and agree that:
          </p>
          <ul className="mt-4 space-y-2 text-text-body">
            <li>(a) AI-extracted recipes may not perfectly reflect the original source material and should be reviewed before use.</li>
            <li>(b) AI Chef Chat provides general cooking guidance and should not be relied upon as professional culinary, nutritional, or medical advice.</li>
            <li>(c) You are solely responsible for verifying the accuracy of any AI-generated content, including ingredients, quantities, cooking times, and instructions.</li>
            <li>(d) We are not liable for any errors, omissions, or inaccuracies in AI-generated content.</li>
          </ul>

          {/* Section 8 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">8. Food Safety Disclaimer</h2>
          <p className="text-text-body">
            Cuisto is a recipe management tool and does not provide professional culinary, nutritional, or medical advice. You are solely responsible for:
          </p>
          <ul className="mt-4 space-y-2 text-text-body">
            <li>(a) Ensuring that recipes are prepared safely and in accordance with food safety guidelines.</li>
            <li>(b) Identifying and avoiding allergens or ingredients that may cause adverse reactions.</li>
            <li>(c) Verifying cooking temperatures, times, and techniques to prevent foodborne illness.</li>
            <li>(d) Consulting appropriate professionals for dietary, nutritional, or medical concerns.</li>
          </ul>
          <p className="mt-4 text-text-body">
            We expressly disclaim any liability for illness, injury, or adverse reactions resulting from the preparation or consumption of recipes accessed through the App.
          </p>

          {/* Section 9 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">9. Third-Party Content and Services</h2>
          <p className="text-text-body">
            Cuisto may extract recipes from third-party websites, videos, and other sources. We do not claim ownership of third-party content and are not responsible for its accuracy, legality, or appropriateness. The inclusion of any third-party content does not imply endorsement or affiliation. You are responsible for complying with any terms of use associated with third-party content.
          </p>

          {/* Section 10 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">10. Social Features and User Interactions</h2>
          <p className="text-text-body">
            Cuisto allows users to share recipes publicly, fork recipes from other users, and participate in community ratings. When you fork a recipe, the original creator is attributed in the recipe&apos;s history. You agree to use social features respectfully and not to harass, abuse, or harm other users. We reserve the right to remove content or suspend accounts that violate community standards.
          </p>

          {/* Section 11 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">11. Privacy</h2>
          <p className="text-text-body">
            Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using Cuisto, you consent to the collection and use of your information as described in the Privacy Policy.
          </p>

          {/* Section 12 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">12. Prohibited Uses</h2>
          <p className="text-text-body">
            You agree not to: (a) use the App for any unlawful purpose; (b) attempt to gain unauthorized access to the App or its systems; (c) interfere with or disrupt the App or servers; (d) use automated means to access the App without our permission; (e) reverse engineer, decompile, or disassemble the App; (f) use the App to infringe on the intellectual property rights of others; or (g) impersonate any person or entity.
          </p>

          {/* Section 13 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">13. Termination</h2>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">13.1 Termination by You</h3>
          <p className="text-text-body">
            You may stop using Cuisto at any time and request deletion of your account by contacting us. Upon account deletion, your personal data will be handled in accordance with our Privacy Policy.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">13.2 Termination by Us</h3>
          <p className="text-text-body">
            We may suspend or terminate your access to Cuisto at any time, with or without cause, and with or without notice. Reasons for termination may include, but are not limited to, violation of these Terms, fraudulent or illegal activity, or extended periods of inactivity.
          </p>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">13.3 Effect of Termination</h3>
          <p className="text-text-body">
            Upon termination, your right to use the App ceases immediately. We may retain certain data as required by law or for legitimate business purposes. Provisions of these Terms that by their nature should survive termination will remain in effect.
          </p>

          {/* Section 14 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">14. Disclaimers</h2>
          <p className="text-text-body uppercase text-sm">
            THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. YOUR USE OF THE APP IS AT YOUR OWN RISK.
          </p>

          {/* Section 15 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">15. Limitation of Liability</h2>
          <p className="text-text-body uppercase text-sm">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL HARRY VIENNOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE APP, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF THE APP SHALL NOT EXCEED THE AMOUNT YOU PAID US, IF ANY, IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
          </p>

          {/* Section 16 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">16. Indemnification</h2>
          <p className="text-text-body">
            You agree to indemnify, defend, and hold harmless Harry Viennot from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in connection with: (a) your use of the App; (b) your User Content; (c) your violation of these Terms; or (d) your violation of any rights of a third party.
          </p>

          {/* Section 17 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">17. Governing Law and Dispute Resolution</h2>
          <p className="text-text-body">
            These Terms shall be governed by and construed in accordance with the laws of France, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the App shall be subject to the exclusive jurisdiction of the courts of France. For users in the European Union, this does not affect your rights under mandatory consumer protection laws in your country of residence.
          </p>

          {/* Section 18 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">18. Changes to These Terms</h2>
          <p className="text-text-body">
            We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms in the App and updating the &quot;Last Updated&quot; date. Your continued use of the App after any changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
          </p>

          {/* Section 19 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">19. Severability</h2>
          <p className="text-text-body">
            If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
          </p>

          {/* Section 20 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">20. Entire Agreement</h2>
          <p className="text-text-body">
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and Harry Viennot regarding your use of Cuisto and supersede any prior agreements or understandings.
          </p>

          {/* Section 21 */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">21. Contact Information</h2>
          <p className="text-text-body">
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="mt-4 text-text-body not-italic">
            Harry Viennot<br />
            Email: <a href="mailto:harry@cuisto.app" className="text-primary hover:text-forest-600">harry@cuisto.app</a><br />
            France
          </address>

          {/* Closing */}
          <div className="mt-12 p-6 bg-stone-100 rounded-2xl">
            <p className="text-text-body font-medium">
              By using Cuisto, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Back to home */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-forest-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </a>
      </div>
    </main>
  );
}

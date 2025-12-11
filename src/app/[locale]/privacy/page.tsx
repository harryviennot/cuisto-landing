import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cuistudio",
  description: "Privacy Policy for Cuistudio - Learn how we collect, use, and protect your personal information.",
};

// Pre-generate for all locales at build time
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-forest-950 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-forest-300">Last updated December 04, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-stone prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-text-body leading-relaxed">
            This Privacy Notice for Harry Viennot (doing business as Cuisto) (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;), describes how and why we might access, collect, store, use, and/or share (&apos;process&apos;) your personal information when you use our services (&apos;Services&apos;), including when you:
          </p>

          <ul className="mt-6 space-y-3 text-text-body">
            <li>Download and use our mobile application (Cuisto), or any other application of ours that links to this Privacy Notice</li>
            <li>Use Cuisto. Cuisto is a recipe management platform that enables users to extract recipes from multiple sources—including photos, websites, social media videos, and pasted text—using AI-powered processing. The service provides tools for organizing recipes into collections, cooking with guided step-by-step instructions and timers, scaling ingredients, and personalizing recipes with notes and ratings.</li>
            <li>Engage with us in other related ways, including any marketing or events</li>
          </ul>

          <p className="mt-6 text-text-body">
            <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{" "}
            <a href="mailto:harry@cuisto.app" className="text-primary hover:text-forest-600">
              harry@cuisto.app
            </a>.
          </p>

          {/* Summary */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">Summary of Key Points</h2>

          <p className="text-text-body italic">
            This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by reading the full policy below.
          </p>

          <div className="mt-6 space-y-4 text-text-body">
            <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>

            <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>

            <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>

            <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>

            <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</p>

            <p><strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>

            <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
          </div>

          {/* Table of Contents */}
          <h2 className="text-2xl font-bold text-text-heading mt-12 mb-6">Table of Contents</h2>

          <ol className="list-decimal list-inside space-y-2 text-primary">
            <li><a href="#infocollect" className="hover:text-forest-600">What Information Do We Collect?</a></li>
            <li><a href="#infouse" className="hover:text-forest-600">How Do We Process Your Information?</a></li>
            <li><a href="#legalbases" className="hover:text-forest-600">What Legal Bases Do We Rely On?</a></li>
            <li><a href="#whoshare" className="hover:text-forest-600">When and With Whom Do We Share Your Information?</a></li>
            <li><a href="#ai" className="hover:text-forest-600">Do We Offer Artificial Intelligence-Based Products?</a></li>
            <li><a href="#sociallogins" className="hover:text-forest-600">How Do We Handle Your Social Logins?</a></li>
            <li><a href="#inforetain" className="hover:text-forest-600">How Long Do We Keep Your Information?</a></li>
            <li><a href="#infosafe" className="hover:text-forest-600">How Do We Keep Your Information Safe?</a></li>
            <li><a href="#privacyrights" className="hover:text-forest-600">What Are Your Privacy Rights?</a></li>
            <li><a href="#DNT" className="hover:text-forest-600">Controls for Do-Not-Track Features</a></li>
            <li><a href="#uslaws" className="hover:text-forest-600">Do United States Residents Have Specific Privacy Rights?</a></li>
            <li><a href="#policyupdates" className="hover:text-forest-600">Do We Make Updates to This Notice?</a></li>
            <li><a href="#contact" className="hover:text-forest-600">How Can You Contact Us About This Notice?</a></li>
            <li><a href="#request" className="hover:text-forest-600">How Can You Review, Update, or Delete Your Data?</a></li>
          </ol>

          {/* Section 1 */}
          <h2 id="infocollect" className="text-2xl font-bold text-text-heading mt-12 mb-6">1. What Information Do We Collect?</h2>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">Personal information you disclose to us</h3>

          <p className="text-text-body"><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>

          <p className="mt-4 text-text-body">
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
          </p>

          <p className="mt-4 text-text-body"><strong>Personal Information Provided by You.</strong> The personal information we collect may include:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Contact or authentication data</li>
          </ul>

          <p className="mt-4 text-text-body"><strong>Sensitive Information.</strong> We do not process sensitive information.</p>

          <p className="mt-4 text-text-body">
            <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Apple (In-App Purchases) and RevenueCat. You may find their privacy notices here:{" "}
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-forest-600">https://www.apple.com/legal/privacy/</a> and{" "}
            <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-forest-600">https://www.revenuecat.com/privacy</a>.
          </p>

          <p className="mt-4 text-text-body">
            <strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider.
          </p>

          <p className="mt-4 text-text-body"><strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li><em>Mobile Device Access.</em> We may request access or permission to certain features from your mobile device, including your mobile device&apos;s camera, microphone, and other features.</li>
            <li><em>Mobile Device Data.</em> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information.</li>
            <li><em>Push Notifications.</em> We may request to send you push notifications regarding your account or certain features of the application(s).</li>
          </ul>

          <h3 className="text-xl font-semibold text-text-heading mt-8 mb-4">Information automatically collected</h3>

          <p className="text-text-body"><em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>

          <p className="mt-4 text-text-body">
            We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information.
          </p>

          <p className="mt-4 text-text-body">The information we collect includes:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li><em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services.</li>
            <li><em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services.</li>
            <li><em>Location Data.</em> We collect location data such as information about your device&apos;s location, which can be either precise or imprecise.</li>
          </ul>

          {/* Section 2 */}
          <h2 id="infouse" className="text-2xl font-bold text-text-heading mt-12 mb-6">2. How Do We Process Your Information?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</em></p>

          <p className="mt-4 text-text-body">We process your personal information for a variety of reasons, including:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li>To facilitate account creation and authentication</li>
            <li>To deliver and facilitate delivery of services to the user</li>
            <li>To respond to user inquiries/offer support to users</li>
            <li>To send administrative information to you</li>
            <li>To request feedback</li>
            <li>To send you marketing and promotional communications</li>
            <li>To protect our Services</li>
            <li>To identify usage trends</li>
            <li>To save or protect an individual&apos;s vital interest</li>
          </ul>

          {/* Section 3 */}
          <h2 id="legalbases" className="text-2xl font-bold text-text-heading mt-12 mb-6">3. What Legal Bases Do We Rely On to Process Your Information?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law.</em></p>

          <p className="mt-4 text-text-body">
            If you are located in the EU or UK, we process your information based on: consent, performance of a contract, legal obligations, and legitimate interests.
          </p>

          <p className="mt-4 text-text-body">
            If you are located in Canada, we may process your information if you have given us specific permission (express consent) or in some exceptional cases where permitted by law.
          </p>

          {/* Section 4 */}
          <h2 id="whoshare" className="text-2xl font-bold text-text-heading mt-12 mb-6">4. When and With Whom Do We Share Your Personal Information?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We may share information in specific situations and with specific third parties.</em></p>

          <p className="mt-4 text-text-body">We may need to share your personal information in the following situations:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>

          {/* Section 5 */}
          <h2 id="ai" className="text-2xl font-bold text-text-heading mt-12 mb-6">5. Do We Offer Artificial Intelligence-Based Products?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.</em></p>

          <p className="mt-4 text-text-body">
            As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, &apos;AI Products&apos;). These tools are designed to enhance your experience and provide you with innovative solutions.
          </p>

          <p className="mt-4 text-text-body"><strong>Use of AI Technologies</strong></p>

          <p className="mt-2 text-text-body">
            We provide AI Products through third-party service providers (&apos;AI Service Providers&apos;), including OpenAI. As outlined in this Privacy Notice, your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products.
          </p>

          <p className="mt-4 text-text-body"><strong>Our AI Products</strong></p>

          <p className="mt-2 text-text-body">Our AI Products are designed for the following functions:</p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li>AI recipe extraction and normalization</li>
            <li>Voice transcription</li>
            <li>Image recognition and processing</li>
          </ul>

          <p className="mt-4 text-text-body"><strong>How We Process Your Data Using AI</strong></p>

          <p className="mt-2 text-text-body">
            All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties. This ensures high security and safeguards your personal information throughout the process, giving you peace of mind about your data&apos;s safety.
          </p>

          {/* Section 6 */}
          <h2 id="sociallogins" className="text-2xl font-bold text-text-heading mt-12 mb-6">6. How Do We Handle Your Social Logins?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em></p>

          <p className="mt-4 text-text-body">
            Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
          </p>

          <p className="mt-4 text-text-body">
            We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider.
          </p>

          {/* Section 7 */}
          <h2 id="inforetain" className="text-2xl font-bold text-text-heading mt-12 mb-6">7. How Long Do We Keep Your Information?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Notice unless otherwise required by law.</em></p>

          <p className="mt-4 text-text-body">
            We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information.
          </p>

          {/* Section 8 */}
          <h2 id="infosafe" className="text-2xl font-bold text-text-heading mt-12 mb-6">8. How Do We Keep Your Information Safe?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> We aim to protect your personal information through a system of organisational and technical security measures.</em></p>

          <p className="mt-4 text-text-body">
            We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          {/* Section 9 */}
          <h2 id="privacyrights" className="text-2xl font-bold text-text-heading mt-12 mb-6">9. What Are Your Privacy Rights?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> Depending on your location, you may have rights that allow you greater access to and control over your personal information.</em></p>

          <p className="mt-4 text-text-body">
            In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.
          </p>

          <p className="mt-4 text-text-body">
            <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us at{" "}
            <a href="mailto:harry@cuisto.app" className="text-primary hover:text-forest-600">harry@cuisto.app</a>.
          </p>

          <p className="mt-4 text-text-body">
            <strong>Account Information:</strong> If you would at any time like to review or change the information in your account or terminate your account, you can log in to your account settings and update your user account, or contact us using the contact information provided.
          </p>

          {/* Section 10 */}
          <h2 id="DNT" className="text-2xl font-bold text-text-heading mt-12 mb-6">10. Controls for Do-Not-Track Features</h2>

          <p className="text-text-body">
            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&apos;DNT&apos;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals.
          </p>

          {/* Section 11 */}
          <h2 id="uslaws" className="text-2xl font-bold text-text-heading mt-12 mb-6">11. Do United States Residents Have Specific Privacy Rights?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> If you are a resident of certain US states, you may have the right to request access to and receive details about the personal information we maintain about you.</em></p>

          <p className="mt-4 text-text-body">
            Certain US state privacy laws grant residents specific rights regarding their personal information. This section describes those rights and explains how to exercise them.
          </p>

          <p className="mt-4 text-text-body"><strong>Categories of Personal Information We Collect:</strong></p>

          <ul className="mt-4 space-y-2 text-text-body">
            <li>Identifiers (name, email address, account name)</li>
            <li>Internet or other similar network activity</li>
            <li>Geolocation data</li>
            <li>Audio, electronic, sensory, or similar information</li>
            <li>Inferences drawn from collected personal information</li>
          </ul>

          <p className="mt-4 text-text-body">
            We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of receiving help through our customer support channels.
          </p>

          {/* Section 12 */}
          <h2 id="policyupdates" className="text-2xl font-bold text-text-heading mt-12 mb-6">12. Do We Make Updates to This Notice?</h2>

          <p className="text-text-body"><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>

          <p className="mt-4 text-text-body">
            We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &apos;Revised&apos; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification.
          </p>

          {/* Section 13 */}
          <h2 id="contact" className="text-2xl font-bold text-text-heading mt-12 mb-6">13. How Can You Contact Us About This Notice?</h2>

          <p className="text-text-body">
            If you have questions or comments about this notice, you may email us at{" "}
            <a href="mailto:harry@cuisto.app" className="text-primary hover:text-forest-600">harry@cuisto.app</a>{" "}
            or contact us by post at:
          </p>

          <address className="mt-4 text-text-body not-italic">
            Harry Viennot<br />
            __________<br />
            __________<br />
            France
          </address>

          {/* Section 14 */}
          <h2 id="request" className="text-2xl font-bold text-text-heading mt-12 mb-6">14. How Can You Review, Update, or Delete the Data We Collect From You?</h2>

          <p className="text-text-body">
            Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information.
          </p>

          <p className="mt-4 text-text-body">
            To request to review, update, or delete your personal information, please fill out and submit a{" "}
            <a href="https://app.termly.io/notify/2e98ac6b-6db3-48d1-8270-b4e24bb0009c" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-forest-600">
              data subject access request
            </a>.
          </p>
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

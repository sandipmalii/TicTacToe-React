import React from 'react';

function TermsOfService() {
  return (
    <div className="bg-[#0F0E17] text-white p-5">
      
      <h1 className="text-center text-white relative mt-12 mb-8 text-3xl">
        Terms of Service for Tic Tac Toe
        <span className="absolute left-1/2 bottom-[-5px] w-96 h-1 bg-[#ff7f50] transform -translate-x-1/2"></span>
      </h1>
      <div className="max-w-2xl mx-auto border border-gray-400 rounded p-5">
        <Section title="2. Use of the Service">
          <p>
            a. Eligibility: You must be at least 13 years old to access or use the Service. If you are under 13 years old, you may not access or use the Service unless authorized by a parent or legal guardian.
          </p>
          <p>
            b. Registration: To access certain features of the Service, you may be required to register for an account. When registering for an account, you agree to provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <p>c. Prohibited Conduct: You agree not to engage in any conduct that:</p>
          <ul className="list-disc list-inside">
            <li>- Violates these Terms or any applicable laws or regulations.</li>
            <li>- Infringes upon the rights of others.</li>
            <li>- Harasses, abuses, or discriminates against others.</li>
            <li>- Interferes with or disrupts the Service or servers or networks connected to the Service.</li>
            <li>- Attempts to gain unauthorized access to the Service or any other user's account.</li>
            <li>- Contains any viruses, malware, or other harmful code.</li>
          </ul>
          <p>d. Termination: We reserve the right to suspend or terminate your access to the Service at any time for any reason without notice.</p>
        </Section>
        <Section title="3. Intellectual Property">
          <p>a. Ownership: The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
          <p>b. License: We grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for your personal, non-commercial use.</p>
        </Section>
        <Section title="4. Third-Party Links">
          <p>The Service may contain links to third-party websites or resources. We are not responsible for the content, products, or services offered by third parties, and we do not endorse or warrant the accuracy of any information provided by third parties.</p>
        </Section>
        <Section title="5. Disclaimer">
          <p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
        </Section>
        <Section title="6. Limitation of Liability">
          <p>IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
        </Section>
        <Section title="7. Changes to These Terms">
          <p>We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you by email or by posting a notice on the Service prior to the effective date of the changes. Your continued use of the Service after the effective date of the changes constitutes your acceptance of the modified Terms.</p>
        </Section>
        <Section title="8. Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
        </Section>
        <Section title="9. Contact Us">
          <p>If you have any questions about these Terms, please contact us at [contact email].</p>
        </Section>
        <Section title="10. Privacy Policy">
          <p>For information about how we collect, use, and disclose your personal information, please read our <a href="../HTMLS/privacy.html" className="text-[#ff7f50]">Privacy Policy</a>.</p>
        </Section>

        <p className="mt-5">By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
      </div>

      
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h2 className="text-xl font-bold mt-5">{title}</h2>
    {children}
  </div>
);

export default TermsOfService;

import React from 'react';

const PrivacyPolicy = () => {  // Use '=>' to define the arrow function
  return (
    <div className="bg-[#0F0E17] text-white pt-0 pb-55 px-5">
      <h1 className="text-center text-white relative mt-12 mb-8 text-3xl">
        Privacy Policy for Tic Tac Toe
        <span className="absolute left-1/2 bottom-[-5px] w-96 h-1 bg-[#ff7f50] transform -translate-x-1/2"></span>
      </h1>
      <div className="max-w-2xl mx-auto border border-gray-400 rounded p-5">
        <p><strong>Effective Date:</strong> 26-02-2024</p>
        <p>Thank you for using our Tic Tac Toe website. This Privacy Policy outlines how we collect, use, disclose, and protect your information when you access or use our website.</p>
        
        <h2 className="text-xl mt-5">Information We Collect:</h2>
        <ol className="list-decimal list-inside">
          <li><strong>Personal Information:</strong> We do not collect any personal information such as your name, address, email address, or phone number when you use our Tic Tac Toe website.</li>
          <li><strong>Usage Data:</strong> We may collect certain non-personal information automatically when you access or use our website. This may include your IP address, browser type, operating system, referring URLs, page views, and other similar usage data.</li>
        </ol>
        
        <h2 className="text-xl mt-5">How We Use Your Information:</h2>
        <ol className="list-decimal list-inside">
          <li><strong>Improving User Experience:</strong> We may use the collected usage data to analyze trends, administer the website, track user movements, and gather demographic information to improve the user experience.</li>
          <li><strong>Security:</strong> We may use your information to maintain the security and integrity of our website, detect and prevent fraud, abuse, or security incidents.</li>
        </ol>
        
        <h2 className="text-xl mt-5">Disclosure of Information:</h2>
        <p>We do not sell, trade, or otherwise transfer your information to outside parties. We may share non-personal information with trusted third parties to assist us in operating our website or conducting our business, as long as those parties agree to keep this information confidential.</p>
        
        <h2 className="text-xl mt-5">Data Security:</h2>
        <p>We are committed to ensuring the security of your information. We implement a variety of security measures to maintain the safety of your personal information when you access our website.</p>
        
        <h2 className="text-xl mt-5">Children’s Privacy:</h2>
        <p>Our Tic Tac Toe website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately, and we will take steps to remove such information from our systems.</p>
        
        <h2 className="text-xl mt-5">Changes to this Privacy Policy:</h2>
        <p>We reserve the right to update or change our Privacy Policy at any time. Any changes to this Privacy Policy will be posted on this page with an updated effective date.</p>
        
        <h2 className="text-xl mt-5">Contact Us:</h2>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at [insert contact email].</p>
        
        <p>By using our Tic Tac Toe website, you consent to the terms of this Privacy Policy.</p>
        <p><strong>Last updated:</strong> 26-02-2024</p>
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

export default PrivacyPolicy;

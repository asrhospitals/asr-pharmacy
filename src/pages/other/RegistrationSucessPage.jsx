import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ThankyouPage from '../commonPages/ThankyouPage';
import { User, Mail, RefreshCw, ArrowRight, Home, FileText } from 'lucide-react';

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const { userInfo, registrationId, verificationEmailSent } = location.state || {};
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/signup', { replace: true });
    }
  }, [userInfo, navigate]);

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    } finally {
      setResendLoading(false);
    }
  };

  if (!userInfo) {
    return null; // or loading spinner
  }

  const nextSteps = [
    { 
      text: "Check your email inbox and spam folder", 
      eta: "Within 5 minutes" 
    },
    { 
      text: "Click the verification link in the email", 
      eta: "Required for account activation" 
    },
    { 
      text: "Complete your profile setup", 
      eta: "After email verification" 
    },
    { 
      text: "Start managing your pharmacy business", 
      eta: "Once profile is complete" 
    }
  ];

  const contactInfo = {
    email: "support@asrpharma.com",
    phone: "+1-800-ASR-HELP",
    hours: "Mon-Fri 9AM-6PM EST"
  };

  return (
    <ThankyouPage
      title="Welcome to ASR Pharma!"
      subtitle={`Hello ${userInfo.firstName}, your account has been created successfully`}
      message="We're excited to have you on board! To complete your registration and secure your account, please verify your email address."
      
      autoRedirect

      redirectTo='/login'
      icon={User}
      iconColor="text-blue-500"
      bgGradient="from-blue-50 to-purple-50"
      
      showNextSteps={true}
      nextSteps={nextSteps}
      
      showContactInfo={true}
      contactInfo={contactInfo}
      
      additionalActions={[
        { 
          text: "Go to Login", 
          href: "/login", 
          icon: ArrowRight 
        },
        { 
          text: "Back to Home", 
          href: "/", 
          icon: Home 
        }
      ]}
      
      footerText="Need help with verification? Our support team is here to assist you."
      footerLinks={[
        { text: "FAQ", href: "/faq" },
        { text: "Contact Support", href: "/contact" },
        { text: "Resend Instructions", onClick: handleResendVerification }
      ]}
    >
      {/* Custom registration details section */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="mr-2 text-blue-500" size={20} />
          Registration Details
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{userInfo.firstName} {userInfo.lastName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{userInfo.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{userInfo.phone}</span>
          </div>
          {registrationId && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Registration ID:</span>
              <span className="font-medium font-mono text-sm">{registrationId}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending Email Verification
            </span>
          </div>
        </div>
      </div>

      {/* Email verification status */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Mail className="flex-shrink-0 h-5 w-5 text-amber-400 mt-0.5" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-amber-800">
              Verification Email Sent
            </h4>
            <p className="mt-1 text-sm text-amber-700">
              We've sent a verification email to <strong>{userInfo.email}</strong>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
            {resendSuccess && (
              <p className="mt-2 text-sm text-green-700 font-medium">
                ✓ Verification email resent successfully!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            The verification link will expire in 24 hours
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            Check your spam/junk folder if you don't see the email
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            You can resend the verification email if needed
          </li>
          <li className="flex items-start">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
            Your account will be fully activated after email verification
          </li>
        </ul>
      </div>
    </ThankyouPage>
  );
};

export default RegistrationSuccessPage;
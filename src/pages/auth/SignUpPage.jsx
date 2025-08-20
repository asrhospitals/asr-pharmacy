import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../componets/common/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useSendPhoneOTPMutation,
  useVerifyPhoneOTPMutation,
  useRegisterMutation,
} from "../../services/authApi";
import RenderStep1 from "./components/SignupStep1";
import RenderStep2 from "./components/SignupStep2";
import { showToast } from "../../componets/common/Toast";
import { validatePassword, validatePhone } from "../../utils/inputValidation";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [sendPhoneOTP, { isLoading: sendingOTP }] = useSendPhoneOTPMutation();
  const [verifyPhoneOTP, { isLoading: verifyingOTP }] = useVerifyPhoneOTPMutation();
  const [register, { isLoading: registering }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    firstName: "",
    lastName: "",
    email: "",
    pin: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1: {
        const { isValid, message } = validatePhone(formData.phone);
        if (!isValid) {
          showToast(message, "error");
          return false;
        }
        if (otpSent && !formData.otp) {
          showToast("Please enter OTP", "error");
          return false;
        }
        return true;
      }
      case 2: {
        if (!formData.firstName)
          return showToast("First name is required", "error");
        if (!formData.lastName)
          return showToast("Last name is required", "error");
        if (!formData.email) return showToast("Email is required", "error");
        if (!formData.pin) return showToast("PIN code is required", "error");

        const { isValid, message } = validatePassword(formData.password);
        if (!isValid) return showToast(message, "error");

        if (formData.password !== formData.confirmPassword) {
          return showToast("Passwords do not match", "error");
        }
        return true;
      }
      default:
        return true;
    }
  };

  const handleSendOTP = async () => {
    if (!validateStep(1)) return;
    try {
      await sendPhoneOTP({ phone: formData.phone }).unwrap();
      setOtpSent(true);
      setCountdown(60);
      showToast("OTP sent successfully!", "success");

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      showToast(error?.data?.message || "Failed to send OTP", "error");
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) return showToast("Please enter OTP", "error");
    try {
      await verifyPhoneOTP({ phone: formData.phone, otp: formData.otp }).unwrap();
      setPhoneVerified(true);
      setOtpSent(false);
      setCountdown(0);
      showToast("Phone number verified successfully!", "success");
      setTimeout(() => setCurrentStep(2), 1000);
    } catch (error) {
      showToast(error?.data?.message || "Invalid OTP", "error");
    }
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!formData.phone) return showToast("Phone number is required", "error");
      if (!phoneVerified)
        return showToast("Please verify your phone number", "warning");
    }

    if (currentStep === 2) {
      if (!validateStep(2)) return;
      try {
        const userData = {
          phone: formData.phone,
          email: formData.email,
          pin: formData.pin,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

        const response = await register(userData).unwrap();
        showToast("Account created successfully!", "success");
        
        navigate("/signup-success", {
          state: {
            userInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone
            },
            registrationId: response?.data?.registrationId || null,
            verificationEmailSent: response?.data?.verificationEmailSent || true
          }
        });
        
      } catch (error) {
        showToast(error?.data?.message || "Failed to create account", "error");
        return;
      }
    }

    if (validateStep(currentStep)) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const RenderStepContent = () => {
    switch (currentStep) {
      case 1:
        return RenderStep1({
          formData,
          handleChange,
          errors,
          sendingOTP,
          countdown,
          otpSent,
          handleSendOTP,
          verifyingOTP,
          handleVerifyOTP,
          phoneVerified,
        });
      case 2:
        return RenderStep2({ formData, handleChange, errors });
      default:
        return null;
    }
  };

  const RenderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step < currentStep
                ? "bg-green-500 text-white"
                : step === currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step < currentStep ? "✓" : step}
          </div>
          {step < 2 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step < currentStep ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderNavigation = () => (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="secondary"
          onClick={handlePrevious}
          disabled={sendingOTP || verifyingOTP || registering}
          startIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Previous
        </Button>
      )}

      <div className="flex-1" />

      {currentStep < 2 ? (
        <Button
          type="button"
          onClick={handleNext}
          disabled={sendingOTP || verifyingOTP || registering || (currentStep === 1 && !phoneVerified)}
          endIcon={<ArrowRight className="w-4 h-4" />}
        >
          Next
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={handleNext} 
          className="px-8"
          disabled={registering}
        >
          {registering ? "Creating Account..." : "Create Account"}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ASR</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="text-gray-600 mt-2">
            Join ASR Pharma and manage your business efficiently
          </p>
        </div>

        {RenderStepIndicator()}
        {RenderStepContent()}
        {renderNavigation()}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import {
  Phone,
  Mail,
  Building,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  useSendPhoneOTPMutation,
  useVerifyPhoneOTPMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
} from "../../services/authApi";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  
  const [sendPhoneOTP, { isLoading: sendingOTP }] = useSendPhoneOTPMutation();
  const [verifyPhoneOTP, { isLoading: verifyingOTP }] =
    useVerifyPhoneOTPMutation();
  const [register, { isLoading: registering }] = useRegisterMutation();
  const [verifyEmail, { isLoading: verifyingEmail }] = useVerifyEmailMutation();
  const [formData, setFormData] = useState({
    
    phone: "",
    otp: "",

    
    firstName: "",
    lastName: "",
    email: "",
    pin: "",
    password: "",
    confirmPassword: "",

    
    companyName: "",
    address: "",
    country: "India",
    state: "",
    pinCode: "",
    branchCode: "",
    businessType: "Chemist [Pharmacy]",
    calendarType: "English",
    financialYearFrom: "",
    financialYearTo: "",
    taxType: "GST",
    website: "",
    companyEmail: "",
    companyRegType: "",
    panNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const businessTypes = [
    "Billing [General]",
    "Chemist [Pharmacy]",
    "Pharma Distribution [Batch]",
    "Automobile",
    "Garment",
    "Mobile Trade",
    "Supermarket/Grocery",
    "Computer Hardware",
  ];

  const calendarTypes = ["English", "Hindi", "Gujarati"];
  const taxTypes = ["GST", "VAT", "IGST", "Other"];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        } else if (!/^[\+]?[1-9][\d]{9,14}$/.test(formData.phone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
        if (otpSent && !formData.otp) {
          newErrors.otp = "OTP is required";
        }
        break;

      case 2:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.pin) {
          newErrors.pin = "PIN code is required";
        } else if (!/^[1-9][0-9]{5}$/.test(formData.pin)) {
          newErrors.pin = "Please enter a valid 6-digit PIN code";
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            formData.password
          )
        ) {
          newErrors.password =
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;

      case 3:
        if (!formData.companyName)
          newErrors.companyName = "Company name is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.pinCode) {
          newErrors.pinCode = "PIN code is required";
        } else if (!/^[1-9][0-9]{5}$/.test(formData.pinCode)) {
          newErrors.pinCode = "Please enter a valid 6-digit PIN code";
        }
        if (!formData.branchCode)
          newErrors.branchCode = "Branch code is required";
        if (!formData.businessType)
          newErrors.businessType = "Business type is required";
        if (!formData.financialYearFrom)
          newErrors.financialYearFrom = "Financial year start date is required";
        if (!formData.financialYearTo)
          newErrors.financialYearTo = "Financial year end date is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateStep(1)) return;

    try {
      await sendPhoneOTP({ phone: formData.phone }).unwrap();
      console.log("OTP sent successfully to:", formData.phone);
      setOtpSent(true);
      setCountdown(60);

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
      console.error("Error sending OTP:", error);
      setErrors({ phone: error?.data?.message || "Failed to send OTP" });
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    try {
      await verifyPhoneOTP({
        phone: formData.phone,
        otp: formData.otp,
      }).unwrap();

      console.log("OTP verified successfully");
      setPhoneVerified(true);
      setOtpSent(false);
      setCountdown(0);

      setTimeout(() => setCurrentStep(2), 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrors({ otp: error?.data?.message || "Invalid OTP" });
    }
  };

  const handleNext = async() => {
    if (currentStep == 2) {
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        alert("Passwords do not match");
        return;
      } else {
        const userData = {
          phone: formData.phone,
          email: formData.email,
          pin: formData.pin,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        };

        const response = await register(userData).unwrap();  
        console.log("User registered successfully:", response);
        
      }
    } else if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        pin: formData.pin,
        password: formData.password,
        company: {
          companyName: formData.companyName,
          address: formData.address,
          country: formData.country,
          state: formData.state,
          pinCode: formData.pinCode,
          branchCode: formData.branchCode,
          businessType: formData.businessType,
          calendarType: formData.calendarType,
          financialYearFrom: formData.financialYearFrom,
          financialYearTo: formData.financialYearTo,
          taxType: formData.taxType,
          phone: formData.phone,
          website: formData.website,
          email: formData.companyEmail,
          companyRegType: formData.companyRegType,
          panNumber: formData.panNumber,
        },
      };

      await register(userData).unwrap();
      console.log("Registration successful");

      navigate("/signup-success");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors({ submit: error?.data?.message || "Registration failed" });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Verify Your Phone Number
        </h3>
        <p className="text-gray-600">
          We'll send you a verification code via SMS
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            error={errors.phone}
            fullWidth
          />
          <Button
            type="button"
            onClick={handleSendOTP}
            disabled={sendingOTP || countdown > 0}
            className="px-6 w-full max-w-fit min-w-[50px]"
          >
            {countdown > 0
              ? `${countdown}s`
              : sendingOTP
              ? "Sending..."
              : "Send OTP"}
          </Button>
        </div>
      </div>

      {otpSent && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter 6-digit code"
              className="flex-1"
              error={errors.otp}
              maxLength={6}
            />
            <Button
              type="button"
              onClick={handleVerifyOTP}
              disabled={verifyingOTP || !formData.otp}
              className="px-6"
            >
              {verifyingOTP ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </div>
      )}

      {phoneVerified && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">
            Phone number verified successfully!
          </span>
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Complete Your Profile
        </h3>
        <p className="text-gray-600">Fill in your personal details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            error={errors.firstName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            error={errors.lastName}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          error={errors.email}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PIN Code (City) <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          placeholder="Enter 6-digit PIN code"
          error={errors.pin}
          maxLength={6}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password <span className="text-red-500">*</span>
        </label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a strong password"
          error={errors.password}
        />
        <p className="text-xs text-gray-500 mt-1">
          Must contain at least 8 characters, one uppercase, one lowercase, one
          number, and one special character
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Create Your Company
        </h3>
        <p className="text-gray-600">Set up your business profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            error={errors.companyName}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Branch Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="branchCode"
            value={formData.branchCode}
            onChange={handleChange}
            placeholder="Enter branch code"
            error={errors.branchCode}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete address"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State <span className="text-red-500">*</span>
          </label>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={states.map((state) => ({ value: state, label: state }))}
            placeholder="Select state"
            error={errors.state}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Enter PIN code"
            error={errors.pinCode}
            maxLength={6}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            options={businessTypes.map((type) => ({
              value: type,
              label: type,
            }))}
            error={errors.businessType}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="calendarType"
            value={formData.calendarType}
            onChange={handleChange}
            options={calendarTypes.map((type) => ({
              value: type,
              label: type,
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Year From <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="financialYearFrom"
            value={formData.financialYearFrom}
            onChange={handleChange}
            error={errors.financialYearFrom}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Financial Year To <span className="text-red-500">*</span>
          </label>
          <Input
            type="date"
            name="financialYearTo"
            value={formData.financialYearTo}
            onChange={handleChange}
            error={errors.financialYearTo}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Type <span className="text-red-500">*</span>
          </label>
          <Select
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            options={taxTypes.map((type) => ({ value: type, label: type }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Phone
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter company phone"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Website
          </label>
          <Input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Email
          </label>
          <Input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            placeholder="Enter company email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Registration Type
          </label>
          <Input
            type="text"
            name="companyRegType"
            value={formData.companyRegType}
            onChange={handleChange}
            placeholder="e.g., Private Limited, Partnership"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PAN Number
        </label>
        <Input
          type="text"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="Enter PAN number"
          maxLength={10}
        />
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
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
          {step < 3 && (
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

      {currentStep < 3 ? (
        <Button
          type="button"
          onClick={handleNext}
          loading={registering}
          disabled={
            sendingOTP ||
            verifyingOTP ||
            registering ||
            (currentStep === 1 && !phoneVerified)
          }
          endIcon={<ArrowRight className="w-4 h-4" />}
        >
          Next
        </Button>
      ) : (
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={registering}
          className="px-8"
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
          <h2 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h2>
          <p className="text-gray-600 mt-2">
            Join ASR Pharma and manage your business efficiently
          </p>
        </div>

        {renderStepIndicator()}
        {renderStepContent()}
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

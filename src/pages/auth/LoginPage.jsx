import { useEffect, useState } from "react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import Input from "../../componets/common/Input";
import Select from "../../componets/common/Select";
import Button from "../../componets/common/Button";
import { validateEmail, validatePhone } from "../../utils/inputValidation";
import { showToast } from "../../componets/common/Toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [loginType, setLoginType] = useState("username");
  console.log(loginType);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const [error, setError] = useState("");

  const { user } = useSelector((state) => state.user);
  const { currentCompany } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && user.id) {
      if (currentCompany) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/company-list", { replace: true });
      }
    }
  }, [user, currentCompany, navigate]);

  const loginTypeOptions = [
    { value: "username", label: "Username", icon: User },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
  ];

  const validateInput = () => {
    if (loginType === "email" && email.trim() !== "") {
      const { isValid, message } = validateEmail(email);
      console.log(isValid, message);

      if (!isValid) {
        showToast(message);
        return false;
      }
    }

    if (loginType === "phone" && phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone.replace(/\s+/g, ""))) {
        setError("Please enter a valid phone number");
        return false;
      }
    }

    return true;
  };

  const getCurrentInputValue = () => {
    switch (loginType) {
      case "email":
        return email;
      case "phone":
        return phone;
      default:
        return username;
    }
  };

  const getInputPlaceholder = () => {
    switch (loginType) {
      case "email":
        return "Email address (or use role@example.com for demo)";
      case "phone":
        return "Phone number (or use +1234567890 for demo)";
      default:
        return "Username (or use role for demo)";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (loginType === "email") {
        const { isValid, message } = validateEmail(email);
        if (!isValid) {
          showToast(message, "error");
          return;
        }
      }

      if (loginType === "phone") {
        const { isValid, message } = validatePhone(phone);
        if (!isValid) {
          showToast(message, "error");
          return;
        }
      }

      if (loginType === "username" && username.trim() === "") {
        showToast("Please enter your username", "error");
        return;
      }

      if (password.trim() === "") {
        showToast("Please enter your password", "error");
        return;
      }

      const credentials = {
        [loginType === "username" ? "uname" : loginType]:
          getCurrentInputValue(),
        pwd: password,
        loginType: loginType,
      };

      const response = await login(credentials).unwrap();

      const userData = response.data.user;

      const user = {
        id: userData.id,
        role: userData.role,
        module: userData.module,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        userCompanies: userData.companies || [],
        currentCompany: userData.currentCompany || null,
      };

      dispatch(setUser({ user, token: response.data.accessToken }));
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      const primaryCompany = user.userCompanies.find(
        (company) => company.isPrimary === true
      );
      if (user.userCompanies.length === 0) {
        showToast("Please add a company", "info");
        navigate("/create-company", { replace: true });
      } else if (!primaryCompany && user.userCompanies.length > 0) {
        showToast("Select company", "warning");
        navigate("/company-list", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      showToast(err?.data?.message || "Login failed", "error");
    }
  };

  const renderLoginInput = () => {
    const IconComponent =
      loginTypeOptions.find((opt) => opt.value === loginType)?.icon || User;

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <IconComponent size={20} />
        </div>
        <Input
          type={"text"}
          value={
            loginType === "email"
              ? email
              : loginType === "phone"
              ? phone
              : username
          }
          onChange={(e) => {
            const value = e.target.value;
            if (loginType === "email") setEmail(value);
            else if (loginType === "phone") setPhone(value);
            else setUsername(value);
          }}
          placeholder={getInputPlaceholder()}
          className="pl-10"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ASR</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">ASR Pharmacy</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login Method
            </label>
            <div className="flex space-x-2">
              {loginTypeOptions.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  type="button"
                  variant="custom"
                  onClick={() => {
                    setLoginType(value);
                    setError("");
                  }}
                  className={`flex-1 cursor-pointer flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border transition-all duration-200 ${
                    loginType === value
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {loginTypeOptions.find((opt) => opt.value === loginType)?.label}
            </label>
            {renderLoginInput()}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (default: password)"
              />
              <Button
                type="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-1 text-blue-600 bg-blue-50 rounded focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-60"
            loading={isLoading}
          >
            Login
          </Button>
        </form>
        {/* 
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo Application:</strong> You can login with username, email, or phone number.
            Different roles display different menu items and permissions.
          </p>
          <div className="mt-2 text-xs text-blue-600">
            <p><strong>Demo Credentials:</strong></p>
            <p>• Username: admin, user, manager</p>
            <p>• Email: admin@example.com, user@example.com</p>
            <p>• Phone: +1234567890</p>
            <p>• Password: password</p>
          </div>
        </div> */}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

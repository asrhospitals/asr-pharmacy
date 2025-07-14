import { useState } from "react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const credentials = {
        uname: username || `${selectedRole}`,
        pwd: password || "password",
      };
      const response = await login(credentials).unwrap();
      
      const user = {
        id: response.id,
        role: response.role,
        module: response.module,
        username: response.username,
      };
      dispatch(setUser({ user, token: response.token }));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.data?.message || "Login failed");
    }
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
              Select Role (Demo)
            </label>
            <Select 
              className="w-full"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: "admin", label: "Admin - Full Access" },
                { value: "manager", label: "Manager - Limited Access" },
                { value: "user", label: "User - Basic Access" },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (or use role for demo)"
            />
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
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 focus:outline-none"
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
          >
            {isLoading
              ? "Signing In..."
              : `Sign In as ${
                  selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
                }`}
          </Button>
        </form>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo Application:</strong> Different roles display different
            menu items and permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

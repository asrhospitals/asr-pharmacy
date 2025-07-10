import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('admin');

  const handleLogin = () => {
    login({
      name: selectedRole === 'admin' ? 'Admin User' : selectedRole === 'manager' ? 'Manager User' : 'Regular User',
      email: `${selectedRole}@asrpharmacy.com`,
      role: selectedRole,
      avatar: selectedRole === 'admin' ? 'AU' : selectedRole === 'manager' ? 'MU' : 'RU'
    });
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
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role (Demo)
            </label>
            <select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="admin">Admin - Full Access</option>
              <option value="manager">Manager - Limited Access</option>
              <option value="user">User - Basic Access</option>
            </select>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo Application:</strong> Different roles display different menu items and permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
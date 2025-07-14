import { useState } from 'react';
import { useSignUpMutation } from '../../services/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/userSlice';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [signUp, { isLoading }] = useSignUpMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    try {
      const response = await signUp(form).unwrap();
      setSuccess('Account created! You can now log in.');
      setForm({ name: '', email: '', password: '', role: 'user' });
    } catch (err) {
      setError(err?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">ASR</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <Select
              name="role"
              value={form.role}
              onChange={handleChange}
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'manager', label: 'Manager' },
                { value: 'user', label: 'User' },
              ]}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <Button
            type="submit"
            disabled={isLoading}
            text={isLoading ? 'Signing Up...' : 'Sign Up'}
          />
        </form>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            Already have an account? <a href="/login" className="underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 
import AppLayout from './componets/layout/AppLayout';
import LoginPage from './componets/auth/LoginPage';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="h-screen">
      {!isAuthenticated ? <LoginPage /> : <AppLayout />}
    </div>
  );
}

const AppWithProviders = () => {
  return (
    <App />
  );
};

export default AppWithProviders;
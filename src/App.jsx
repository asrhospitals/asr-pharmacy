import NavigationProvider from './contexts/NavigationProvider';
import AppLayout from './componets/layout/AppLayout';
import LoginPage from './componets/auth/LoginPage';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const role = useSelector((state) => state.user.user?.role); // For RBAC

  return (
    <div className="h-screen">
      {!isAuthenticated ? <LoginPage /> : <AppLayout />}
    </div>
  );
};

// Root App with Providers
const AppWithProviders = () => {
  return (
    <NavigationProvider>
      <App />
    </NavigationProvider>
  );
};

export default AppWithProviders;
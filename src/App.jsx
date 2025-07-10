import  AuthProvider  from './contexts/AuthProvider';
import  NavigationProvider  from './contexts/NavigationProvider';
import AppLayout from './componets/layout/AppLayout';
import LoginPage from './componets/auth/LoginPage';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="h-screen">
      {!isAuthenticated ? <LoginPage /> : <AppLayout />}
    </div>
  );
};

// Root App with Providers
const AppWithProviders = () => {
  return (
    <AuthProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </AuthProvider>
  );
};

export default AppWithProviders;
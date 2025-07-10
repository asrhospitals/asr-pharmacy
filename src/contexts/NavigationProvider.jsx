import { useState } from 'react';
import { NavigationContext } from './NavigationContext';

const NavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [pageTitle, setPageTitle] = useState('Dashboard');

  const navigateTo = (path, title) => {
    setCurrentPath(path);
    setPageTitle(title);
  };

  return (
    <NavigationContext.Provider value={{ currentPath, pageTitle, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
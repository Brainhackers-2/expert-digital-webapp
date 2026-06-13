import { AppRoutes } from './routes/AppRoutes';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
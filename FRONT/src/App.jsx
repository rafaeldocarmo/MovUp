import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import BottomNavigation from './components/BottomNavigation.jsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.css';
import { Header } from './components/Header.jsx';

function App() {

  const hideLayout = location.pathname === '/login' || location.pathname === '/register';


  return (
    <BrowserRouter>
      <AuthProvider>
        {!hideLayout && <Header />}
        <AppRoutes />
        {!hideLayout && <BottomNavigation />}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

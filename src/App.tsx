import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { OAuthProvider, useAuth } from './context/OAuthProvider';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './pages/Chatbot';
const queryClient = new QueryClient();

function Layout({ children }) {
  const location = useLocation();
  const { user, logout } = useAuth(); // Get enriched user object from AuthProvider

  // --- SIMPLIFIED USER NAME DERIVATION ---
  // Now, user.displayName is consistently set in OAuthProvider
  const userName = user?.displayName || 'Guest';

  const hideNavAndFooter =
    location.pathname === '/signup' ||
    location.pathname === '/login' ||
    location.pathname === '/chatbot';

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!hideNavAndFooter && (
        <Header />
        // <Navbar
        //   userName={userName}
        //   logout={logout}
        // />
      )}
      <main className="flex-grow">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

const App = () => (
  <OAuthProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<Index />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <Chatbot />{' '}
                    {/* userName will be available in Chatbot via useAuth */}
                  </ProtectedRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </OAuthProvider>
);

export default App;

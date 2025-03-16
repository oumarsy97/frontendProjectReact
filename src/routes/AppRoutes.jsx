import { Routes, Route, Navigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import BookManagement from '../components/books/BookManagement';
// import BookDetailsPage from '../pages/BookDetailsPage';
// import LoginPage from '../pages/LoginPage';
// import RegisterPage from '../pages/RegisterPage';
// import ProfilePage from '../pages/ProfilePage';
// import MyLibraryPage from '../pages/MyLibraryPage';
// import NotFoundPage from '../pages/NotFoundPage';


// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { token } = useToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/book/:id" element={<BookDetailsPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/books" element={<BookManagement />} />
          
      
      {/* Routes protégées */}
      {/* <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute> */}
      {/* } /> */}
      {/* <Route path="/my-library" element={
        <ProtectedRoute>
          <MyLibraryPage />
        </ProtectedRoute>
      } /> */}
      
      {/* Route par défaut -> Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 